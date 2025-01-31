import { ElementType, ForwardedRef, forwardRef, memo } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types/components';
import { Box, SprinklesProps } from '../Box';

type Props = SprinklesProps & {
  spacing?: SprinklesProps['gap'];
  direction?: SprinklesProps['flexDirection'];
  align?: SprinklesProps['alignItems'];
  justify?: SprinklesProps['justifyContent'];
};

type StackTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type StackProps<Root extends ElementType = StackTypeMap['defaultComponent']> = PolymorphicProps<
  StackTypeMap,
  Root
>;

function StackImpl(props: StackProps, forwardedRef: ForwardedRef<Element>) {
  const {
    spacing = '2',
    align = 'stretch',
    justify = 'flex-start',
    direction = 'column',
    element,
    ...restProps
  } = props;

  const Element = element ?? 'div';

  return (
    <Box
      ref={forwardedRef}
      element={Element}
      display="flex"
      flexDirection={direction}
      gap={spacing}
      alignItems={align}
      justifyContent={justify}
      {...restProps}
    />
  );
}

/**
 * The Stack component is a layout component that allows you to stack multiple elements vertically or horizontally.
 *
 * @description It is commonly used for creating layouts and arranging content in a consistent and organized manner.
 * The Stack component is built on top of the `Box` component
 * and leverages the power of the flex display property to achieve the stacking behavior.
 *
 * */
export const Stack = memo(forwardRef(StackImpl)) as OverridableComponent<StackTypeMap>;
