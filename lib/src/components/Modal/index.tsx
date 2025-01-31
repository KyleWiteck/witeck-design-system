import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React, { ReactNode, forwardRef, isValidElement, useRef } from 'react';

import { useDisclosure } from '../../hooks';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { PaddingCSSPropertiesUnion } from '../../types/globalTypes';
import { classJoin, themeValues } from '../../utils';
import { RefProvider, useRefValue } from '../../utils/context';
import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { ModalOverlayRecipe, ModalOverlayRecipeVariants, ModalRecipe, ModalVariants } from './styles.css';

export * from './ModalBody';
export * from './ModalCloseButton';
export * from './ModalFooter';
export * from './ModalHeader';

// eslint-disable-next-line @typescript-eslint/ban-types
type StyleProps = {} & ModalOverlayRecipeVariants & ModalVariants;

export interface ModalProps extends Omit<BoxProps<'div'>, PaddingCSSPropertiesUnion | 'as' | 'children' | 'marginTop'> {
  variant?: StyleProps['variant'];
  topAlign?: boolean;
  children?: ReactNode | ReactNode[];
  ariaTitle: string;
  ariaDescription: string;
  disclosure?: Partial<ReturnType<typeof useDisclosure>>;
  trigger?: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement | null, ModalProps>((props, forwardedRef) => {
  const {
    variant,
    className,
    children,
    topAlign,
    ariaTitle,
    ariaDescription,
    disclosure,
    trigger,
    ...childrenContainerProps
  } = props;

  modalErrors({ children, trigger, disclosure });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen, onClose, onOpen, onToggle } = disclosure ?? useDisclosure();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const parentContainerRef = useRefValue<HTMLDivElement | null>();
  const composedRefs = useComposedRefs(modalRef, forwardedRef);

  const modalOverlayClassName = ModalOverlayRecipe({
    isOpen: isOpen
  });
  const modalClassName = ModalRecipe({
    variant
  });

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      // Only trigger onClose when clicking on the outer container
      onClose?.();
    }
  };

  // Clone the children and add the disclosure prop to select children
  const modifiedChildren = React.Children.map(children, child => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childType = isValidElement(child) && child.type && (child?.type as any);

    const props = childType.includeDisclosures ? { isOpen, onClose, onOpen, onToggle } : {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(child as React.ReactElement<any>, props);
  });

  return (
    <Dialog.Root modal open={isOpen} onOpenChange={open => (open ? onOpen : onClose)}>
      {trigger && (
        <Dialog.Trigger asChild onClick={onOpen}>
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <RefProvider refValue={modalRef}>
          {/* NOTE: Used only for accessability */}
          <VisuallyHidden asChild>
            <Dialog.Title>{ariaTitle}</Dialog.Title>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <Dialog.Description>{ariaDescription}</Dialog.Description>
          </VisuallyHidden>
          <Dialog.Overlay asChild>
            <Box
              borderRadius="none"
              backgroundColor="overlay"
              onClick={handleOverlayClick}
              className={modalOverlayClassName}
              style={{
                zIndex: parentContainerRef?.current
                  ? getComputedStyle(parentContainerRef.current).zIndex + 10
                  : themeValues.zIndex.overlay
              }}
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <Flex
              direction="column"
              backgroundColor="white"
              marginTop={topAlign ? '32' : undefined}
              borderRadius="base"
              {...childrenContainerProps}
              style={{
                ...childrenContainerProps.style,
                zIndex: parentContainerRef?.current
                  ? getComputedStyle(parentContainerRef.current).zIndex + 12
                  : themeValues.zIndex.modal
              }}
              className={classJoin(modalClassName, className)}
              paddingBottom={{ mobile: '3', tablet: '4' }}
              ref={composedRefs}
            >
              {modifiedChildren}
            </Flex>
          </Dialog.Content>
        </RefProvider>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

const modalErrors = (params: Pick<ModalProps, 'children' | 'disclosure' | 'trigger'>) => {
  const { children, disclosure, trigger } = params;
  let hasModalHeader = false;
  let hasModalBody = false;

  if (disclosure && trigger) {
    throw new Error('Modal Error: Both `disclosure` and `trigger` props are set. Please use only one of these props.');
  }

  if (!disclosure && !trigger) {
    throw new Error(
      'Modal Error: Neither `disclosure` nor `trigger` props are set. Please provide one of these props.'
    );
  }

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const componentType = child.type;
      let componentName = '';

      if (typeof componentType === 'string') {
        componentName = componentType;
      } else if (typeof componentType === 'function' || typeof componentType === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        componentName = (componentType as any).displayName || (componentType as any).name;
      }

      if (componentName === 'ModalHeader') {
        hasModalHeader = true;
      }
      if (componentName === 'ModalBody') {
        hasModalBody = true;
      }
    }
  });

  if (!hasModalHeader || !hasModalBody) {
    throw new Error('Modal Error: Modal must contain both ModalHeader and ModalBody components.');
  }
};
