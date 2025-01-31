import { ElementType, ForwardedRef, forwardRef, memo } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types';
import { classJoin } from '../../utils';
import { Box, SprinklesProps } from '../Box';
import { ContainerVariants, container } from './container.css';

type Props = SprinklesProps & ContainerVariants;

type ContainerTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type ContainerProps<Root extends ElementType = ContainerTypeMap['defaultComponent']> = PolymorphicProps<
  ContainerTypeMap,
  Root
>;

function ContainerImpl(props: ContainerProps, forwardedRef: ForwardedRef<Element>) {
  const { element, size, paddingX = { mobile: '6', tablet: '7', desktop: '10' }, className, ...otherProps } = props;

  const styles = container({ size });
  const Element = element ?? 'div';

  return (
    <Box
      element={Element}
      ref={forwardedRef}
      className={classJoin(styles, className)}
      paddingX={paddingX}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      {...otherProps}
    />
  );
}

export const Container = memo(forwardRef(ContainerImpl)) as OverridableComponent<ContainerTypeMap>;
