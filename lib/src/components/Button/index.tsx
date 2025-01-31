import { ElementType, ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { OverridableComponent, Overwrite, PolymorphicProps, Simplify } from '../../types/components';
import { classJoin } from '../../utils';
import { Box, SprinklesProps } from '../Box';
import { Center } from '../Center';
import { ReactNodeStringHandler, ReactNodeStringHandlerProps } from '../ReactNodeStringHandler';
import { Spinner } from '../Spinner';
import { ButtonVariants, buttonInvariant, buttonRecipe } from './button.css';

type ButtonVariantsWithSprinkles = Simplify<Overwrite<SprinklesProps, ButtonVariants>>;

type Props = Omit<ButtonVariantsWithSprinkles, 'padding' | 'active'> & {
  disabled?: boolean;
  isLoading?: boolean;
  textProps?: Omit<ReactNodeStringHandlerProps, 'element'>;
  icon?: ReactNode;
  isHighlighted?: boolean;
  loadingText?: string;
};

type ButtonTypeMap = {
  props: Props;
  defaultComponent: 'button';
};

export type ButtonProps<Root extends ElementType = ButtonTypeMap['defaultComponent']> = PolymorphicProps<
  ButtonTypeMap,
  Root
>;

function ButtonImpl(props: ButtonProps, forwardedRef: ForwardedRef<Element>) {
  const {
    element,
    size = 'md',
    variant,
    whiteSpace = 'nowrap',
    disabled = false,
    isLoading = false,
    children,
    display = 'inline-flex',
    textProps = {},
    fontSize = 'base',
    icon,
    isHighlighted,
    className,
    gap = '1',
    style = {},
    type = 'button',
    loadingText,
    ...otherProps
  } = props;

  const Element = element ?? 'button';
  const isAnchor = typeof Element === 'string' && Element === 'a' && 'href' in otherProps;

  // Use `variant='custom'` to bypass recipe. This allows for full customization
  // via style props. Note that the `custom` variant is not part of the recipe and
  // is only used here as a flag to bypass the recipe.
  const noVariant = variant === 'custom';
  // TODO: since `padding` is not being exposed as a variant, consider including padding styles within `size`
  const paddingOptions: Record<NonNullable<ButtonProps['size']>, NonNullable<ButtonVariants>['padding']> = {
    sm: icon ? 'smIcon' : 'sm',
    md: icon ? 'mdIcon' : 'md',
    lg: icon ? 'mdIcon' : 'md',
    square: 'square',
    custom: 'custom',
    round: 'round',
    link: 'custom'
  };

  const cursor = disabled ? 'not-allowed' : 'pointer';
  const pointerEvents = isAnchor ? (disabled ? 'not-allowed' : 'pointer') : undefined;

  const internalClassName = noVariant
    ? buttonInvariant
    : buttonRecipe({
        size,
        padding: paddingOptions[size],
        variant,
        highlighted: isHighlighted ? variant : undefined
      });

  return (
    <Box
      className={classJoin(internalClassName, className)}
      element={Element}
      display={display}
      gap={gap}
      position="relative"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      opacity={disabled ? '0.5' : '1'}
      fontSize={fontSize}
      whiteSpace={whiteSpace}
      borderRadius="base"
      type={type}
      {...(!isAnchor ? { disabled } : {})}
      {...otherProps}
      style={{ cursor, pointerEvents, ...style }}
      ref={forwardedRef}
    >
      {isLoading && (
        <Center width="fitContent">
          <Center
            position="absolute"
            width={loadingText ? 'fitContent' : 'full'}
            height="full"
            top="0px"
            left="0px"
            padding={variant === 'link' ? undefined : '2.5'}
          >
            <Spinner size="custom" border="2px" height="full" width="auto" aspectRatio="1:1" color="inherit" />
          </Center>
          <ReactNodeStringHandler
            paddingLeft={loadingText ? '8' : '0'}
            visibility={loadingText ? 'visible' : 'hidden'}
            preTextNode={loadingText ? null : <Box visibility="hidden">icon</Box>}
            {...textProps}
          >
            {loadingText ?? children}
          </ReactNodeStringHandler>
        </Center>
      )}
      {!isLoading && (
        <ReactNodeStringHandler preTextNode={icon} {...textProps}>
          {children}
        </ReactNodeStringHandler>
      )}
    </Box>
  );
}

export const Button = memo(forwardRef(ButtonImpl)) as OverridableComponent<ButtonTypeMap>;
