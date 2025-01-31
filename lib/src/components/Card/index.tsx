import { ElementType, ForwardedRef, forwardRef, memo } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types';
import { Box, SprinklesProps } from '../Box';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Omit<SprinklesProps, 'borderRadius'> & {};

type CardTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type CardProps<Root extends ElementType = CardTypeMap['defaultComponent']> = PolymorphicProps<CardTypeMap, Root>;

function CardImpl(props: CardProps, forwardedRef: ForwardedRef<Element>) {
  const { element, ...otherProps } = props;
  const Element = element ?? 'div';
  return (
    <Box
      element={Element}
      backgroundColor="white"
      borderRadius="base"
      border="1px"
      borderColor="border"
      paddingY="6"
      paddingX="8"
      boxSize="fitContent"
      marginX="auto"
      {...otherProps}
      ref={forwardedRef}
    />
  );
}

export const Card = memo(forwardRef(CardImpl)) as OverridableComponent<CardTypeMap>;
