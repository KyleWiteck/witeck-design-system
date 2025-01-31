import React, { ElementType, ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { HeightCSSProperties, OverflowCSSPropertiesUnion, OverridableComponent, PolymorphicProps } from '../../types';
import { Box, SprinklesProps } from '../Box';
import { Flex } from '../Flex';

type Props = Omit<SprinklesProps, HeightCSSProperties | OverflowCSSPropertiesUnion> & {
  /**
   * Used to calculate the container height. The default is 72, since the default header component is 72px in height.
   */
  headerHeight?: number;
  /**
   * Use mainly to provide the correct location that a `inlinePageExpandToggle` variant drawer would live.
   */
  inlineDrawer?: ReactNode;
};

type FullHeightFixedContainerTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type FullHeightFixedContainerProps<
  Root extends ElementType = FullHeightFixedContainerTypeMap['defaultComponent']
> = PolymorphicProps<FullHeightFixedContainerTypeMap, Root>;

function FullHeightFixedContainerImpl(props: FullHeightFixedContainerProps, forwardedRef: ForwardedRef<Element>) {
  const { element, headerHeight = 72, inlineDrawer, children, style, ...remainingProps } = props;

  return (
    <Flex
      element={element}
      ref={forwardedRef}
      width="full"
      overflow="auto"
      height="full"
      {...remainingProps}
      style={{ ...style, height: `calc(100vh - ${headerHeight}px)` }}
    >
      {inlineDrawer}
      <Box height="full" flex="1" overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}

export const FullHeightFixedContainer = memo(
  forwardRef(FullHeightFixedContainerImpl)
) as OverridableComponent<FullHeightFixedContainerTypeMap>;
