import { ForwardedRef, forwardRef, useEffect } from 'react';

import { useComposedRefs } from '../../hooks';
import { DefaultComponentProps } from '../../types';
import { SprinklesProps } from '../Box';
import { Flex } from '../Flex';
import { useTabContext } from './context';

type Props = SprinklesProps;

type TabListTypeMap = {
  props: Props;
  defaultComponent: 'ul';
};

export type TabListProps = DefaultComponentProps<TabListTypeMap>;

function TabListImpl(props: TabListProps, forwardedRef: ForwardedRef<HTMLUListElement>) {
  const { children, ...flexProps } = props;
  const context = useTabContext();
  const composedRefs = useComposedRefs(forwardedRef, context.tabListRef);

  /**
   * Enable tab focus on the first (non-disabled) tab if no default selected is specified
   * */
  useEffect(() => {
    if (!context.activeTabId && context.tabListRef.current) {
      const collection = Array.from(
        context.tabListRef.current.querySelectorAll('button[role="tab"]')
      ) as HTMLButtonElement[];

      const firstTab = collection.find(tab => !tab.disabled);
      if (firstTab) firstTab.tabIndex = 0;
    }
  }, [context.activeTabId, context.tabListRef]);

  return (
    <Flex gap="4" listStyle="none" {...flexProps} element="ul" role="tablist" ref={composedRefs}>
      {children}
    </Flex>
  );
}

/**
 * Element that serves as a container for a set of tabs.
 * */
export const TabList = forwardRef(TabListImpl);
