import { ElementType, ForwardedRef, forwardRef, memo } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types';
import { Box, SprinklesProps } from '../Box';

type Props = Omit<SprinklesProps, 'display' | 'alignItems' | 'justifyContent'>;

type CenterTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type CenterProps<Root extends ElementType = CenterTypeMap['defaultComponent']> = PolymorphicProps<
  CenterTypeMap,
  Root
>;

function CenterImpl(props: CenterProps, forwardedRef: ForwardedRef<Element>) {
  const { element, ...otherProps } = props;
  const Element = element ?? 'div';
  return (
    <Box
      element={Element}
      flexDirection="row"
      {...otherProps}
      ref={forwardedRef}
      display="flex"
      alignItems="center"
      justifyContent="center"
    />
  );
}

export const Center = memo(forwardRef(CenterImpl)) as OverridableComponent<CenterTypeMap>;
