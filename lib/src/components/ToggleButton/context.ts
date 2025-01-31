import { MutableRefObject, createContext, useContext } from 'react';

import { ToggleButtonVariants } from './styles.css';

export type ToggleButtonContextValue = ToggleButtonVariants & {
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  radioGroupRef: MutableRefObject<HTMLDivElement | null>;
  disabled?: boolean;
};

/*
 * Shares `name` and `onChange` across ToggleButton components within a ToggleButtonGroup.
 * */
export const ToggleButtonGroupContext = createContext<ToggleButtonContextValue>({
  radioGroupRef: { current: null },
  size: 'md',
});

/*
 * Hook to access the shared (name and onChange) values from the ToggleButtonGroupContext.
 * */
export const useToggleButtonGroupContext = () => {
  const context = useContext(ToggleButtonGroupContext);

  if (!context) {
    throw new Error('ToggleButton must be used within a ToggleButtonGroup');
  }

  return context;
};
