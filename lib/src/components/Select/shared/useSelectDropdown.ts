import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { useClickOutside } from '../../../hooks';
import { rotate180Recipe } from '../../../theme';
import { SharedSelectProps } from './types';

/**
 * Props for the useSelectDropdown hook.
 */
export interface UseSelectDropdownProps
  extends Pick<SharedSelectProps, 'options' | 'value' | 'isMultiSelectable' | 'onSelect' | 'onRemove' | 'optionIdKey'> {
  /**
   * Callback function triggered to reset the keyboard state.
   * @param {boolean} [isOpen] - Optional flag indicating if the dropdown is open.
   */
  onResetKeyBoard?: (isOpen?: boolean) => void;
  /**
   * Callback function triggered to clear all selections.
   */
  onClearInputButton?: () => void;
  name: 'ComboBox' | 'Select';
}

export const useSelectDropdown = ({
  options = [],
  value,
  isMultiSelectable,
  optionIdKey,
  name,
  onSelect,
  onRemove,
  onResetKeyBoard,
  onClearInputButton
}: UseSelectDropdownProps) => {
  type Opt = (typeof options)[0];

  validateComponentProps({
    isMultiSelectable,
    onRemove,
    value,
    optionIdKey,
    name
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidOption(option: any): boolean {
    const optionIdValue = option?.[optionIdKey];
    return typeof optionIdValue === 'string' || typeof optionIdValue === 'number';
  }

  const validOptions =
    options?.filter((option, index) => {
      if (!isValidOption(option)) {
        console.error(
          `Invalid option at index ${index}: The "${optionIdKey}" of the options type must be a string or a number. The provided value is ${option?.[optionIdKey]}. This option will be ignored.`
        );
        return false;
      }
      return true;
    }) || [];

  if (validOptions.length !== options?.length) {
    console.warn(`Some options were filtered out due to invalid "${optionIdKey}" values.`);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedOptions = useMemo(() => (Array.isArray(value) ? value : value ? [value] : []), [value]);
  const allOptions = [...selectedOptions, ...validOptions].filter(
    (option, index, self) => index === self.findIndex(t => t?.[optionIdKey] === option?.[optionIdKey])
  );
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(-1);

  const [inputElement, setInputElement] = useState<HTMLInputElement | HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  // Ensure inputElement and popperElement are not null before invoking usePopper
  const { styles, attributes } = usePopper(inputElement, popperElement, {
    placement: 'bottom-start'
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const rotateChevronClass = rotate180Recipe({ isOpen: isOpen });

  const resetKeyBoard = (isOpen: boolean) => {
    onResetKeyBoard?.(isOpen);
    setActiveOptionIndex(-1);
    setTimeout(() => setIsOpen(isOpen), 0);
  };

  const returnFocusToInput = () => setTimeout(() => inputElement?.focus(), 0);

  useClickOutside([containerRef, listRef], isOpen, () => {
    resetKeyBoard(false);
  });

  useEffect(() => {
    if (isOpen && listRef.current && activeOptionIndex !== -1) {
      const activeElement = listRef.current.childNodes[activeOptionIndex] as HTMLElement;
      activeElement?.focus();
    }
  }, [isOpen, activeOptionIndex]);

  const handleSelect = (option: Opt) => {
    if (
      isMultiSelectable &&
      !!selectedOptions?.find(selectedOpt => selectedOpt?.[optionIdKey] === option?.[optionIdKey])
    ) {
      onRemove?.(option);
      resetKeyBoard(false);
      returnFocusToInput();
      return;
    }

    onSelect(option);
    resetKeyBoard(false);
    returnFocusToInput();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setIsOpen(true);
        setActiveOptionIndex(0);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setIsOpen(true);
        setActiveOptionIndex(allOptions.length - 1);
        break;
      case 'Backspace':
        if (!isMultiSelectable && selectedOptions.length > 0) {
          onClearInputButton?.();
        }
        break;
      case 'Enter':
        if (isOpen && activeOptionIndex !== -1) {
          handleSelect(allOptions[activeOptionIndex]);
        }
        break;
      case 'Escape':
        resetKeyBoard(false);
        break;
      case 'Tab':
        resetKeyBoard(false);
        break;
    }
  };

  const handleItemKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        resetKeyBoard(false);
        returnFocusToInput();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setActiveOptionIndex(prev => (prev < allOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveOptionIndex(prev => (prev > 0 ? prev - 1 : allOptions.length - 1));
        break;
      case 'Enter':
        event.preventDefault();
        handleSelect(allOptions[index]);
        break;
      case 'Escape':
        resetKeyBoard(false);
        returnFocusToInput();
        break;
    }
  };

  return {
    isOpen,
    selectedOptions,
    activeOptionIndex,
    listRef,
    containerRef,
    styles,
    attributes,
    rotateChevronClass,
    inputElement,
    allOptions,
    resetKeyBoard,
    setIsOpen,
    setActiveOptionIndex,
    setInputElement,
    setPopperElement,
    handleSelect,
    handleInputKeyDown,
    handleItemKeyDown
  };
};

function validateComponentProps(
  props: Pick<UseSelectDropdownProps, 'isMultiSelectable' | 'onRemove' | 'value' | 'optionIdKey' | 'name'>
) {
  const { isMultiSelectable, onRemove, value, optionIdKey, name } = props;
  const locationString = `The component using this is a ${name} component with the optionIdKey of ${optionIdKey}`;

  if (isMultiSelectable && !onRemove) {
    throw new Error(`When using "isMultiSelectable", the "onRemove" prop must be used. ${locationString}`);
  }

  if (typeof value !== 'undefined') {
    const valueIsArray = Array.isArray(value);

    if (valueIsArray && !isMultiSelectable) {
      throw new Error(
        `If your value is SelectOption[], you must enable the "isMultiSelectable" prop. ${locationString}`
      );
    }

    if (!valueIsArray && isMultiSelectable) {
      throw new Error(`When using "isMultiSelectable", your value must be SelectOption[]. ${locationString}`);
    }
  }
}
