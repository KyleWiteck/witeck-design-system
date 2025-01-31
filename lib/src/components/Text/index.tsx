import React, { ElementType, ForwardedRef, forwardRef, memo } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types/components';
import { classJoin } from '../../utils';
import { Box, SprinklesProps } from '../Box';
import { TextVariants, textRecipe, textVariants } from './text.css';

type Props = SprinklesProps &
  TextVariants & {
    align?: SprinklesProps['textAlign'];
    weight?: SprinklesProps['fontWeight'];
    size?: SprinklesProps['fontSize'];
  };

type TextTypeMap = {
  props: Props;
  defaultComponent: 'p';
};

export type TextProps<Root extends ElementType = 'p'> = PolymorphicProps<TextTypeMap, Root>;

function TextImpl(props: TextProps, forwardedRef: ForwardedRef<Element>) {
  const {
    align = 'left',
    weight = 'normal',
    fontFamily = 'body',
    lineHeight = 'normal',
    color = 'black',
    textAlign,
    fontSize,
    size,
    fontWeight,
    variant,
    className,
    children,
    element,
    ...restProps
  } = props;

  // Use `variant='custom'` so bypass recipe. This allows for full customization
  // via style props. Note that the `custom` variant is not part of the recipe and
  // is only used here as a flag to bypass the recipe.
  const noVariant = variant === 'custom' || !variant;

  // Mappings of string values of `element` prop to their corresponding `variant` values.
  const asTooVariantMappings: { [key: string]: keyof typeof textVariants } = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    label: 'label',
    p: 'body1'
  };
  // Determine the `variant` based on the `element` prop.
  // If `element` is a string, look up the corresponding `variant` value from the mappings.
  // Otherwise, `asMapped` is undefined.
  const asMappedVariant = typeof element === 'string' ? asTooVariantMappings[element] : undefined;
  const styles = noVariant ? '' : textRecipe({ variant: variant ?? asMappedVariant ?? undefined });
  const Element = element ?? 'p';

  return (
    <Box
      ref={forwardedRef}
      className={classJoin(styles, className)}
      element={Element}
      color={color}
      fontSize={size ?? fontSize}
      fontFamily={fontFamily}
      lineHeight={lineHeight}
      fontWeight={fontWeight ?? weight}
      textAlign={textAlign ?? align}
      {...restProps}
    >
      {children}
    </Box>
  );
}

export const Text = memo(forwardRef(TextImpl)) as OverridableComponent<TextTypeMap>;
