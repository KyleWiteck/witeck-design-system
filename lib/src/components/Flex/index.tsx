import React, { ElementType, ForwardedRef, forwardRef, memo } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types';
import { Box, SprinklesProps } from '../Box';

type Props = SprinklesProps & {
  direction?: SprinklesProps['flexDirection'];
  align?: SprinklesProps['alignItems'];
  justify?: SprinklesProps['justifyContent'];
};

type FlexTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type FlexProps<Root extends ElementType = FlexTypeMap['defaultComponent']> = PolymorphicProps<FlexTypeMap, Root>;

function FlexImpl(props: FlexProps, forwardedRef: ForwardedRef<Element>) {
  const { element, direction = 'row', align = 'flex-start', justify = 'flex-start', ...restProps } = props;
  const Element = element ?? 'div';
  return (
    <Box
      ref={forwardedRef}
      element={Element}
      display="flex"
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      {...restProps}
    />
  );
}

export const Flex = memo(forwardRef(FlexImpl)) as OverridableComponent<FlexTypeMap>;
