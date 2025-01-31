import { ForwardedRef, forwardRef, memo } from 'react';

import { ArrowDropDownIcon } from '../../../icons';
import { DefaultComponentProps } from '../../../types';
import { ellipsisTextProps } from '../../../utils/select';
import { Center } from '../../Center';
import { Input } from '../../Input';
import { Text } from '../../Text';
import { SelectWrapper } from '../shared/SelectWrapper';
import { OverridableSelectOptionProp, SelectTriggerProps, SharedSelectProps } from '../shared/types';
import { useSelectDropdown } from '../shared/useSelectDropdown';

interface Props extends SharedSelectProps {
  selectButtonProps?: SelectTriggerProps<'button'>;
}

type SelectMap = {
  props: Props;
  defaultComponent: 'button';
};

export type SelectProps = DefaultComponentProps<SelectMap>;

function SelectImpl(props: SelectProps, forwardedRef: ForwardedRef<HTMLButtonElement>) {
  const {
    options = [],
    placeholder,
    isMultiSelectable,
    isLoading,
    width = 'full',
    maxWidth,
    minWidth,
    variant,
    size,
    hasError,
    disabled,
    value,
    noOptionsFallbackMessage,
    optionIdKey,
    selectButtonProps,
    containerProps,
    portalElementOverride,
    hasMultiSelectScrollBox,
    onRemove,
    onSelect,
    renderOptionLabel
  } = props;

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
    setInputElement,
    setPopperElement,
    handleSelect,
    handleInputKeyDown,
    handleItemKeyDown,
    resetKeyBoard
  } = useSelectDropdown({
    name: 'Select',
    optionIdKey,
    options,
    value,
    isMultiSelectable,
    onSelect,
    onRemove
  });

  if (forwardedRef) {
    if (typeof forwardedRef === 'function') {
      forwardedRef(inputElement as HTMLButtonElement | null);
    } else if (forwardedRef.current) {
      forwardedRef.current = inputElement as HTMLButtonElement | null;
    }
  }

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
        {...selectButtonProps}
        disabled={disabled}
        hasError={hasError}
        ref={setInputElement}
        variant={variant}
        size={size}
        containerElement="div"
        element="button"
        type="button"
        width="full"
        overflow="hidden"
        textOverflow="ellipsis"
        onKeyDown={e => {
          handleInputKeyDown(e);
        }}
        onClick={() => {
          resetKeyBoard(!isOpen);
        }}
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="options-list"
        leftIconContainerProps={{
          maxWidth: '1/2',
          whiteSpace: 'nowrap',
          color: 'black',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '2'
        }}
        rightIcon={
          <Center
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
        }
      >
        {!isMultiSelectable && selectedOptions[0]?.[optionIdKey] ? (
          <Text
            element="span"
            onClick={() => {
              resetKeyBoard(!isOpen);
            }}
          >
            {renderOptionLabel(selectedOptions[0], ellipsisTextProps)}
          </Text>
        ) : (
          <Text element="span" color="neutral300">
            {!isMultiSelectable
              ? (placeholder ?? 'Choose an option...')
              : Array.isArray(selectedOptions) && selectedOptions && selectedOptions.length > 0
                ? `Chosen Options: ${selectedOptions.length}`
                : (placeholder ?? 'Choose one or multiple options...')}
          </Text>
        )}
      </Input>
    </SelectWrapper>
  );
}

export const Select = memo(forwardRef(SelectImpl)) as OverridableSelectOptionProp<SelectProps>;
