import { ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useId, useRef } from 'react';

import { useDisclosure } from '../../hooks';
import { ChevronDownIcon } from '../../icons';
import { rotate180Recipe } from '../../theme';
import { DefaultComponentProps, Overwrite } from '../../types';
import { collapse, composeEventHandlers, expand } from '../../utils';
import { Box } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Card, CardProps } from '../Card';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';

type Props = Overwrite<
  CardProps,
  PropsWithChildren<{
    size?: 'base' | 'small';
    title: ReactNode;
    titleElement?: 'h2' | 'h3' | 'h4' | 'h5';
    defaultOpen?: boolean;
    buttonProps?: ButtonProps;
  }>
>;

type AccordionTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type AccordionProps = DefaultComponentProps<AccordionTypeMap>;

/**
 * @a11y https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
 */
function AccordionImpl(props: AccordionProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const {
    title,
    children,
    size = 'base',
    titleElement = 'h3',
    defaultOpen = false,
    buttonProps = {},
    ...cardProps
  } = props;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const innerWrapperRef = useRef<HTMLDivElement | null>(null);

  const id = useId();
  const buttonId = `${id}button`;
  const contentId = `${id}content`;

  const { isOpen, onToggle } = useDisclosure(defaultOpen);
  const accordionRotate180Class = rotate180Recipe({ isOpen });

  async function onClick() {
    if (!innerWrapperRef.current) return;
    if (!contentRef.current) return;

    onToggle();

    const height = innerWrapperRef.current.offsetHeight;
    const generator = !isOpen ? expand(height) : collapse(height);
    for await (const pixels of generator) {
      contentRef.current.style.height = `${pixels}px`;
    }
  }

  return (
    <Card width="full" paddingX="0" paddingY="0" {...cardProps} ref={forwardedRef}>
      <Box element={titleElement}>
        <Button
          width="full"
          variant="text"
          display="flex"
          size="custom"
          paddingX={size === 'base' ? '8' : '4'}
          paddingY={size === 'base' ? '4' : '2'}
          borderBottomLeftRadius={isOpen ? 'none' : 'base'}
          borderBottomRightRadius={isOpen ? 'none' : 'base'}
          justifyContent="space-between"
          alignItems="center"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          {...buttonProps}
          onClick={composeEventHandlers(onClick, buttonProps.onClick)}
        >
          <ReactNodeStringHandler
            element="span"
            variant={size === 'base' ? 'h6' : 'subtitle1'}
            fontWeight={size === 'base' ? 'semibold' : 'medium'}
            color="neutral800"
          >
            {title}
          </ReactNodeStringHandler>
          <ChevronDownIcon className={accordionRotate180Class} boxSize={size === 'base' ? '8' : '6'} />
        </Button>
      </Box>

      <Box
        ref={contentRef}
        overflow="hidden"
        height={!defaultOpen ? '0' : undefined}
        id={contentId}
        aria-labelledby={buttonId}
      >
        <Box ref={innerWrapperRef} paddingX={size === 'base' ? '8' : '4'} paddingY={size === 'base' ? '6' : '4'}>
          {children}
        </Box>
      </Box>
    </Card>
  );
}

export const Accordion = forwardRef(AccordionImpl);
