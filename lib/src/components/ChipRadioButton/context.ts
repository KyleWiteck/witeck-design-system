import { MutableRefObject, createContext, useContext } from 'react';

import { RadioButtonVariants } from './styles.css';

export type ChipRadioButtonContextValue = RadioButtonVariants & {
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  chipSelectGroupRef: MutableRefObject<HTMLDivElement | null>;
  isMultiSelectable?: boolean;
};

/*
 * Shares `name` and `onChange` across RadioButton components within a ChipSelectGroup.
 * */
export const ChipRadioGroupContext = createContext<ChipRadioButtonContextValue>({
  chipSelectGroupRef: { current: null },
  size: 'md',
  isMultiSelectable: false
});

/*
 * Hook to access the shared (name and onChange) values from the ChipRadioGroupContext.
 * */
export const useChipRadioGroupContext = () => {
  const context = useContext(ChipRadioGroupContext);

  if (!context) {
    throw new Error('ChipRadioButton must be used within a ChipRadioGroup');
  }

  return context;
};
