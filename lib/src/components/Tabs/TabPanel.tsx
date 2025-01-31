import { ElementType, ForwardedRef, forwardRef } from 'react';

import { OverridableComponent, PolymorphicProps } from '../../types';
import { Box, SprinklesProps } from '../Box';
import { useTabContext } from './context';

interface Props extends SprinklesProps {
  tabId: string;
  id: string;
}

interface TabPanelTypeMap {
  props: Props;
  defaultComponent: 'div';
}

export type TabPanelProps<Root extends ElementType = TabPanelTypeMap['defaultComponent']> = PolymorphicProps<
  TabPanelTypeMap,
  Root
>;

function TabPanelImpl(props: TabPanelProps, forwardedRef: ForwardedRef<Element>) {
  const { element, children, tabId, id, ...otherProps } = props;

  const Element = element ?? 'div';
  const context = useTabContext();
  const isActive = context.activeTabId === tabId;

  return (
    <Box
      element={Element}
      {...otherProps}
      ref={forwardedRef}
      id={id}
      style={isActive ? otherProps.style : { display: 'none', visibility: 'hidden' }}
      // a11y
      aria-hidden={isActive ? 'false' : 'true'}
      aria-labelledby={tabId}
      role="tabpanel"
    >
      {isActive && children}
    </Box>
  );
}

/**
 * Element that contains the content associated with a tab.
 * */
export const TabPanel = forwardRef(TabPanelImpl) as OverridableComponent<TabPanelTypeMap>;
