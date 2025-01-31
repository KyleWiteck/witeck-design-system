import { PropsWithChildren, memo, useRef, useState } from 'react';

import { TabContext } from './context';

export type TabProviderProps = PropsWithChildren<{
  defaultSelectedTabId?: string;
  controlledTabId?: string;
  setControlledTabId?(tabId: string): void;
}>;

/**
 * Tab Provider
 *
 * Tabs are a set of layered sections of content, known as tab panels,
 * that display one panel of content at a time.
 * Each tab panel has an associated tab element, that when activated, displays the panel.
 *
 * Adheres to the Tabs WAI-ARIA design pattern,
 * tabs are automatically activated according to the "Tabs with Automatic Activation" guide.
 *
 * @a11y https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export function TabProvider(props: TabProviderProps) {
  const { children, controlledTabId, setControlledTabId, defaultSelectedTabId = null } = props;
  const [activeTabId, setActiveTab] = useState<string | null>(defaultSelectedTabId);
  const tabListRef = useRef<HTMLUListElement | null>(null);

  const isControlled = typeof controlledTabId !== 'undefined' && typeof setControlledTabId !== 'undefined';

  return (
    <TabContext.Provider
      value={{
        activeTabId: isControlled ? controlledTabId : activeTabId,
        setActiveTab: isControlled ? setControlledTabId : setActiveTab,
        tabListRef
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
