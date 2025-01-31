import { ElementType, ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { CheckMarkIcon, CloseIcon } from '../../icons';
import { OverridableComponent, PolymorphicProps, Simplify } from '../../types';
import { PaddingCSSPropertiesUnion } from '../../types/globalTypes';
import { classJoin, colors } from '../../utils/theme';
import { Box } from '../Box';
import { Center } from '../Center';
import { FlexProps } from '../Flex';
import { NumberTag } from '../NumberTag';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { ChipColorVariants, chipRecipe } from './chip.css';

type ChipVariantsWithSprinkles = Simplify<FlexProps>;

type Props = Omit<
  ChipVariantsWithSprinkles,
  | 'backgroundColor'
  | 'color'
  | 'borderRadius'
  | 'variant'
  | 'borderColor'
  | 'border'
  | 'element'
  | 'ref'
  | PaddingCSSPropertiesUnion
> & {
  variant?: 'slim' | 'default';
  colorVariant?: Exclude<ChipColorVariants, 'error' | 'active' | 'disabled'>;
  checked?: boolean;
  removable?: boolean;
  count?: number | string;
  hasError?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  isButton?: boolean;
  postCountIcon?: ReactNode;
};
type ChipTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type ChipProps<Root extends ElementType = ChipTypeMap['defaultComponent']> = Omit<
  PolymorphicProps<ChipTypeMap, Root>,
  'color'
>;

function ChipImpl(props: ChipProps, forwardedRef: ForwardedRef<Element>) {
  const {
    element,
    children,
    variant = 'default',
    checked = false,
    removable = false,
    colorVariant = 'default',
    hasError = false,
    isActive = false,
    className,
    disabled,
    count,
    role,
    postCountIcon,
    isButton: isButtonBool,
    onClick,
    ...remainingProps
  } = props;

  if (removable && !onClick) throw new Error('when using the `removable` prop, the `onClick` prop is also required.');

  const isButton = !!onClick || isButtonBool;

  let Element = element;
  Element ||= isButton ? 'button' : 'div';
  const active: Extract<ChipColorVariants, 'active'> | undefined = isActive ? 'active' : undefined;
  const hasErrors: Extract<ChipColorVariants, 'error'> | undefined = hasError ? 'error' : undefined;
  const isDisabled: Extract<ChipColorVariants, 'disabled'> | undefined = disabled ? 'disabled' : undefined;
  const colorHandler = hasErrors ?? active ?? isDisabled ?? colorVariant;
  const chipClassName = chipRecipe({ color: colorHandler, isButton });
  let countBackgroundColor: keyof typeof colors | undefined = undefined;

  if (count) {
    if (hasError) countBackgroundColor = 'error';
    else if (disabled) countBackgroundColor = 'neutral400';
    else if (isActive) countBackgroundColor = 'primary';
    else countBackgroundColor = 'neutral500';
  }

  return (
    <Center
      element={Element}
      className={classJoin(chipClassName, className)}
      disabled={disabled}
      paddingX={variant === 'slim' ? '2.5' : '3'}
      paddingY={variant === 'slim' ? '0.5' : '2'}
      fontSize={variant === 'slim' ? 'xs' : 'sm'}
      cursor={isButton ? 'pointer' : 'default'}
      width="fitContent"
      height={variant === 'slim' ? '7' : '10.5'}
      fontWeight="medium"
      border="1px"
      borderRadius="base"
      alignItems="center"
      overflow="hidden"
      justifyContent="space-between"
      gap="1"
      onClick={onClick}
      role={role ?? (isButton ? 'button' : undefined)}
      {...remainingProps}
      ref={forwardedRef}
    >
      {checked && (
        <Box boxSize="4">
          <CheckMarkIcon boxSize="4" color="inherit" />
        </Box>
      )}
      <ReactNodeStringHandler
        textTransform="capitalize"
        display="flex"
        alignItems="center"
        minHeight="3"
        minWidth="1.5"
        maxHeight="fitContent"
      >
        {children}
      </ReactNodeStringHandler>
      {count && (
        <NumberTag variant="slim" fontSize="inherit" backgroundColor={countBackgroundColor}>
          {count}
        </NumberTag>
      )}
      {postCountIcon}
      {removable && (
        <Center boxSize="5">
          <CloseIcon marginLeft="0.5" boxSize="5" minWidth="5" />
        </Center>
      )}
    </Center>
  );
}

export const Chip = memo(forwardRef(ChipImpl)) as OverridableComponent<ChipTypeMap>;
