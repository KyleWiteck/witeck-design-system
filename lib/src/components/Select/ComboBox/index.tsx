import React, { ForwardedRef, MouseEvent, forwardRef, memo, useState } from 'react';

import { ArrowDropDownIcon, CloseIcon, SearchIcon } from '../../../icons';
import { DefaultComponentProps } from '../../../types';
import { ellipsisTextProps } from '../../../utils/select';
import { Button } from '../../Button';
import { Center } from '../../Center';
import { Flex } from '../../Flex';
import { Input } from '../../Input';
import { OverridableSelectOptionProp, SelectTriggerProps, SharedSelectProps } from '.././shared/types';
import { UseSelectDropdownProps, useSelectDropdown } from '.././shared/useSelectDropdown';
import { SelectWrapper } from '../shared/SelectWrapper';

interface Props extends SharedSelectProps {
  inputProps?: SelectTriggerProps<'input'>;
  onFilterChange: (inputValue: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClearInputButton?: NonNullable<UseSelectDropdownProps['onClearInputButton']>;
}

type ComboBoxMap = {
  props: Props;
  defaultComponent: 'input';
};

export type ComboBoxProps = Omit<
  DefaultComponentProps<ComboBoxMap>,
  | 'defaultValue'
  | 'aria-autocomplete'
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-label'
  | 'role'
  | 'onChange'
  | 'autoComplete'
  | 'type'
>;

function ComboBoxImpl(props: ComboBoxProps, forwardedRef: ForwardedRef<HTMLInputElement>) {
  const {
    options = [],
    placeholder,
    isMultiSelectable,
    isLoading,
    hasError,
    width = 'full',
    maxWidth,
    minWidth,
    variant,
    size,
    disabled,
    value,
    noOptionsFallbackMessage,
    optionIdKey,
    inputProps,
    containerProps,
    portalElementOverride,
    hasMultiSelectScrollBox,
    onSelect,
    onRemove,
    onBlur,
    renderOptionLabel,
    onFilterChange,
    onClearInputButton
  } = props;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hideSelectedValue, setHideSelectedValue] = useState<boolean>(false);

  const {
    isOpen,
    selectedOptions,
    activeOptionIndex,
    containerRef,
    listRef,
    styles,
    attributes,
    rotateChevronClass,
    inputElement,
    allOptions,
    setIsOpen,
    setInputElement,
    setPopperElement,
    handleSelect,
    handleInputKeyDown,
    handleItemKeyDown,
    resetKeyBoard
  } = useSelectDropdown({
    name: 'ComboBox',
    options,
    value,
    isMultiSelectable,
    optionIdKey,
    onRemove,
    onClearInputButton,
    onSelect: opt => {
      onSelect(opt);
      setSearchTerm('');
    },
    onResetKeyBoard: () => {
      setHideSelectedValue(false);
    }
  });

  if (forwardedRef) {
    if (typeof forwardedRef === 'function') {
      forwardedRef(inputElement as HTMLInputElement | null);
    } else if (forwardedRef.current) {
      forwardedRef.current = inputElement as HTMLInputElement | null;
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setSearchTerm(val);
    if (!isMultiSelectable) setHideSelectedValue(true);
    if (!isOpen) setIsOpen(true);

    onFilterChange(val);
  };

  return (
    <SelectWrapper
      optionIdKey={optionIdKey}
      containerProps={containerProps}
      isMultiSelectable={isMultiSelectable}
      isLoading={isLoading}
      width={width}
      maxWidth={maxWidth}
      minWidth={minWidth}
      renderOptionLabel={renderOptionLabel}
      options={allOptions}
      isOpen={isOpen}
      selectedOptions={selectedOptions}
      activeOptionIndex={activeOptionIndex}
      containerRef={containerRef}
      listRef={listRef}
      styles={styles}
      attributes={attributes}
      inputElement={inputElement}
      portalElementOverride={portalElementOverride}
      setPopperElement={setPopperElement}
      handleSelect={handleSelect}
      handleItemKeyDown={handleItemKeyDown}
      onSelect={onSelect}
      onRemove={onRemove}
      noOptionsFallbackMessage={noOptionsFallbackMessage}
      hasMultiSelectScrollBox={hasMultiSelectScrollBox}
    >
      <Input
        {...inputProps}
        disabled={disabled}
        hasError={hasError}
        variant={variant}
        size={size}
        type="text"
        ref={setInputElement}
        width="full"
        overflow="hidden"
        textOverflow="ellipsis"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClick={() => {
          resetKeyBoard(!isOpen);
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          setHideSelectedValue(false);
          onBlur?.(e);
        }}
        placeholder={
          !isMultiSelectable && selectedOptions.length > 0 && !hideSelectedValue
            ? ''
            : !isMultiSelectable
              ? !selectedOptions
                ? (placeholder ?? 'Choose an option...')
                : (placeholder ?? 'Search for a new item...')
              : Array.isArray(selectedOptions) && selectedOptions && selectedOptions.length > 0
                ? `Chosen Options: ${selectedOptions.length}`
                : (placeholder ?? 'Choose one or multiple options...')
        }
        autoComplete="off"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="options-list"
        leftIconContainerProps={{
          whiteSpace: 'nowrap',
          color: 'black',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingY: '2',
          justifyContent: 'flex-start'
        }}
        leftIcon={
          !isMultiSelectable && selectedOptions.length > 0 && !hideSelectedValue ? (
            <Flex element="span" display="flex" alignItems="center" width="full" height="full" marginLeft="2">
              {renderOptionLabel(selectedOptions[0], ellipsisTextProps)}
            </Flex>
          ) : (
            <Center
              element="span"
              paddingX="0.5"
              marginLeft="2"
              pointerEvents="none"
              onClick={() => {
                resetKeyBoard(!isOpen);
              }}
            >
              <SearchIcon boxSize="5" pointerEvents="none" color="border2" />
            </Center>
          )
        }
        rightIcon={
          <Center height="full" width="fitContent">
            {(searchTerm?.length > 0 || (onClearInputButton && (Array.isArray(value) ? value.length > 0 : value))) && (
              <Button
                height="full"
                width="10"
                size="custom"
                variant="text"
                aria-label="clear"
                type="button"
                disabled={disabled}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSearchTerm('');
                  onClearInputButton?.();
                }}
              >
                <CloseIcon boxSize="5" />
              </Button>
            )}
            <Center
              role="button"
              element="button"
              type="button"
              disabled={disabled}
              cursor={disabled ? 'not-allowed' : 'pointer'}
              height="full"
              width="10"
              onKeyDown={handleInputKeyDown}
              onClick={() => {
                resetKeyBoard(!isOpen);
              }}
            >
              <ArrowDropDownIcon boxSize="5" className={rotateChevronClass} />
            </Center>
          </Center>
        }
      />
    </SelectWrapper>
  );
}

export const ComboBox = memo(forwardRef(ComboBoxImpl)) as OverridableSelectOptionProp<ComboBoxProps>;
