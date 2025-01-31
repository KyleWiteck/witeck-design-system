import { ForwardedRef, forwardRef } from 'react';

import { Overwrite } from '../../types';
import { classJoin, composeEventHandlers } from '../../utils';
import { Box } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Text } from '../Text';
import { useTabContext } from './context';
import { badgeStyle, tabButtonStyle } from './styles.css';

function selectTab(element: HTMLButtonElement) {
  element.tabIndex = 0;
  element.setAttribute('aria-selected', 'true');
  element.focus();
  element.click();
}

function deselectTab(element: HTMLButtonElement) {
  element.tabIndex = -1;
  element.setAttribute('aria-selected', 'false');
  element.blur();
}
/**
 * Selects next tab in the list, while avoiding disabled tabs
 * */
function selectNext(collection: HTMLButtonElement[], element: HTMLButtonElement) {
  const idx = collection.indexOf(element);
  const next = collection.at(idx >= collection.length - 1 ? 0 : idx + 1);
  if (!next) return;
  if (!next.disabled) {
    deselectTab(element);
    selectTab(next);
    return;
  }
  selectNext(collection, next);
}
/**
 * Selects previours tab in the list, while avoiding disabled tabs
 * */
function selectPrevious(collection: HTMLButtonElement[], element: HTMLButtonElement) {
  const idx = collection.indexOf(element);
  const previous = collection.at(idx - 1);
  if (!previous) return;
  if (!previous.disabled) {
    deselectTab(element);
    selectTab(previous);
    return;
  }
  selectPrevious(collection, previous);
}

export type TabArgs = {
  id: string;
  panelId: string;
  label?: string;
  badge?: string | number | null | false;
};

export type TabProps = Overwrite<ButtonProps, TabArgs>;

function TabImpl(props: TabProps, forwardedRef: ForwardedRef<HTMLButtonElement>) {
  const { id, label, children, panelId, badge, ...buttonProps } = props;

  const context = useTabContext();
  const isActive = id === context.activeTabId;

  const onClickHandler = composeEventHandlers(buttonProps.onClick, () => {
    context.setActiveTab(id);
  });

  const onKeyDownHandler = composeEventHandlers(buttonProps.onKeyDown, e => {
    if (!context.tabListRef.current) return;

    const collection = Array.from(
      context.tabListRef.current.querySelectorAll('button[role="tab"]')
    ) as HTMLButtonElement[];

    const cases: Record<string, () => void> = {
      ArrowUp: () => selectPrevious(collection, e.currentTarget),
      ArrowLeft: () => selectPrevious(collection, e.currentTarget),
      ArrowDown: () => selectNext(collection, e.currentTarget),
      ArrowRight: () => selectNext(collection, e.currentTarget),
      ' ': () => selectTab(e.currentTarget),
      Enter: () => selectTab(e.currentTarget)
    };

    const action = cases[e.key];
    if (action) action();
  });

  return (
    <Box element="li" role="presentation">
      <Button
        borderRadius="none"
        gap="2"
        {...buttonProps}
        ref={forwardedRef}
        role="tab"
        id={id}
        variant="custom"
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        className={classJoin(buttonProps.className, tabButtonStyle, isActive && 'active')}
        textProps={
          badge
            ? {
                postTextNode: (
                  <Text
                    color="white"
                    paddingX="1.5"
                    lineHeight="6xl"
                    fontSize="xs"
                    element="small"
                    className={badgeStyle}
                  >
                    {badge}
                  </Text>
                )
              }
            : undefined
        }
        // a11y
        aria-selected={isActive ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
      >
        {label ?? children}
      </Button>
    </Box>
  );
}

export const Tab = forwardRef(TabImpl);
