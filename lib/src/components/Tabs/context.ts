import { MutableRefObject, createContext, useContext } from 'react';

export type TabContextState = {
  activeTabId: string | null;
  setActiveTab(tabId: string): void;
  tabListRef: MutableRefObject<HTMLUListElement | null>;
};

const initialTabContextState: TabContextState = {
  activeTabId: null,
  setActiveTab() {},
  tabListRef: { current: null },
};

/*
 * Shares tab state across different Tab components within a TabProvider.
 * */
export const TabContext = createContext<TabContextState>(initialTabContextState);
/*
 * Hook to access shared values from the Tab Context.
 * */
export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('Tab components must be used within a TabProvider');
  }

  return context;
};
