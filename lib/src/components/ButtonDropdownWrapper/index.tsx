import * as Popover from '@radix-ui/react-popover';
import React, { ComponentProps, MouseEvent, ReactElement, ReactNode, forwardRef, useRef } from 'react';

import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useDisclosure } from '../../hooks/useDisclosure';
import { ArrowDropDownIcon } from '../../icons';
import { rotate180Recipe } from '../../theme';
import { PaddingCSSPropertiesUnion } from '../../types/globalTypes';
import { RefProvider, useRefValue } from '../../utils';
import { classJoin, themeValues } from '../../utils/theme';
import { Box, BoxProps } from '../Box';
import { ButtonProps } from '../Button';
import { Card, CardProps } from '../Card';
import { dropdownMenuContent } from './styles.css';

export interface ButtonDropdownWrapperProps
  extends Omit<BoxProps<'div'>, PaddingCSSPropertiesUnion | 'button' | 'padding' | 'gap'> {
  disclosure?: ReturnType<typeof useDisclosure>;
  dropdownContent: ReactNode | ((disclosure: ReturnType<typeof useDisclosure>) => ReactNode);
  button: ReactElement | ((requiredProps: ButtonProps & ReturnType<typeof useDisclosure>) => ReactElement);
  arrowProps?: Omit<ComponentProps<typeof ArrowDropDownIcon>, 'boxSize'>;
  removeArrow?: boolean;
  zIndex?: keyof typeof themeValues.zIndex;
  dropdownProps?: Omit<
    CardProps,
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'boxShadow'
    | 'className'
    | 'ref'
    | 'maxWidth'
    | 'position'
  >;
  onOpenAutoFocus?: ComponentProps<typeof Popover.Content>['onOpenAutoFocus'];
}

export const ButtonDropdownWrapper = forwardRef<HTMLDivElement | null, ButtonDropdownWrapperProps>(
  (
    {
      disclosure,
      dropdownContent,
      button,
      arrowProps,
      removeArrow = false,
      zIndex,
      dropdownProps,
      onOpenAutoFocus,
      ...containerProps
    },
    forwardedRef
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen, onToggle, onOpen, onClose } = disclosure ?? useDisclosure();
    const internalRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, internalRef);
    const parentContainerRef = useRefValue<HTMLDivElement | null>();

    const rotateClass = rotate180Recipe({ isOpen });

    const requiredProps: ButtonProps = {
      ref: buttonRef,
      flexDirection: !removeArrow ? 'row-reverse' : undefined,
      icon: !removeArrow && (
        <ArrowDropDownIcon {...arrowProps} boxSize="5" className={classJoin(arrowProps?.className, rotateClass)} />
      )
    };

    return (
      <Popover.Root
        open={isOpen}
        onOpenChange={() => {
          !isOpen ? onOpen() : onClose();
        }}
        modal={false}
      >
        <Box {...containerProps} position="relative" ref={composedRefs}>
          <Popover.Trigger asChild>
            {typeof button === 'function'
              ? button?.({ ...requiredProps, isOpen, onToggle, onOpen, onClose })
              : React.cloneElement(button, {
                  ...requiredProps,
                  onClick: (e: MouseEvent<HTMLButtonElement>) => {
                    if (typeof button.props.onClick === 'function') {
                      button.props.onClick(e);
                    }
                  },
                  flexDirection: button.props?.flexDirection ?? requiredProps.flexDirection
                })}
          </Popover.Trigger>
          <Popover.Portal>
            <RefProvider refValue={contentRef}>
              <Popover.Content
                asChild
                sideOffset={6}
                onKeyDown={e => {
                  if (e.key === 'Escape' && isOpen) onClose();
                  if (e.key === 'Tab') {
                    e.stopPropagation();
                    if (!contentRef.current) return;
                    const currentTarget = e.target as HTMLElement;
                    const focusableElements = Array.from(
                      contentRef.current.querySelectorAll<HTMLElement>(
                        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
                      )
                    ).filter(el => !el.hasAttribute('disabled') && el.tabIndex >= 0);

                    const currentIndex = focusableElements.indexOf(currentTarget);
                    const nextIndex = currentIndex + 1 < focusableElements.length ? currentIndex + 1 : 0;

                    if (focusableElements[nextIndex]) focusableElements[nextIndex]?.focus();
                  }
                }}
                onOpenAutoFocus={onOpenAutoFocus}
              >
                <Card
                  ref={contentRef}
                  maxWidth="100"
                  maxHeight="100"
                  width="fitContent"
                  height="fitContent"
                  overflowY="auto"
                  zIndex={zIndex || (parentContainerRef ? 'notification' : 'dropdown')}
                  {...dropdownProps}
                  className={dropdownMenuContent}
                  boxShadow="base"
                  backgroundColor="white"
                  paddingY={dropdownProps?.padding ?? dropdownProps?.paddingY ?? '2'}
                  paddingX={dropdownProps?.padding ?? dropdownProps?.paddingX ?? '2'}
                >
                  {typeof dropdownContent === 'function'
                    ? dropdownContent({ isOpen, onToggle, onOpen, onClose })
                    : dropdownContent}
                </Card>
              </Popover.Content>
            </RefProvider>
          </Popover.Portal>
        </Box>
      </Popover.Root>
    );
  }
);
