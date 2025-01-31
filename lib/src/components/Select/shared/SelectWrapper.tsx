import { ForwardedRef, KeyboardEvent, forwardRef, memo } from 'react';
import { createPortal } from 'react-dom';

import { CheckMarkIcon, SearchPageIcon } from '../../../icons';
import { DefaultComponentProps } from '../../../types';
import { useRefValue } from '../../../utils/context';
import { ellipsisTextProps } from '../../../utils/select';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Center } from '../../Center';
import { Chip } from '../../Chip';
import { Flex } from '../../Flex';
import { Skeleton } from '../../Skeleton';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { OverridableSelectOptionProp, SharedSelectProps } from './types';
import { useSelectDropdown } from './useSelectDropdown';

interface Props
  extends Pick<
      SharedSelectProps,
      | 'options'
      | 'isMultiSelectable'
      | 'isLoading'
      | 'width'
      | 'maxWidth'
      | 'minWidth'
      | 'noOptionsFallbackMessage'
      | 'containerProps'
      | 'renderOptionLabel'
      | 'onSelect'
      | 'onRemove'
      | 'optionIdKey'
      | 'portalElementOverride'
      | 'hasMultiSelectScrollBox'
    >,
    Pick<
      ReturnType<typeof useSelectDropdown>,
      | 'selectedOptions'
      | 'isOpen'
      | 'inputElement'
      | 'styles'
      | 'attributes'
      | 'containerRef'
      | 'listRef'
      | 'activeOptionIndex'
      | 'handleSelect'
      | 'handleItemKeyDown'
      | 'setPopperElement'
    > {}

type SelectWrapperMap = {
  props: Props;
  defaultComponent: 'input';
};

function isValidId(key: unknown): key is number | string {
  return typeof key === 'string' || typeof key === 'number';
}

export type SelectWrapperProps = DefaultComponentProps<SelectWrapperMap>;

// TODO: Does this need forwardRef?
function SelectWrapperImpl(props: SelectWrapperProps, _forwardedRef: ForwardedRef<HTMLInputElement>) {
  const {
    options = [],
    isMultiSelectable,
    isLoading,
    width = 'full',
    maxWidth,
    minWidth,
    noOptionsFallbackMessage = (
      <Text display="flex" element="span" gap="2" alignItems="center">
        <SearchPageIcon boxSize="5" /> No Results Found
      </Text>
    ),
    children,
    containerProps,
    renderOptionLabel,
    selectedOptions,
    isOpen,
    inputElement,
    styles,
    attributes,
    containerRef,
    listRef,
    activeOptionIndex,
    disabled,
    optionIdKey,
    portalElementOverride,
    hasMultiSelectScrollBox,
    handleSelect,
    handleItemKeyDown,
    setPopperElement,
    onRemove
  } = props;
  const parentContainerRef = useRefValue<HTMLDivElement | null>();

  return (
    <Stack {...containerProps} ref={containerRef} width={width} maxWidth={maxWidth} minWidth={minWidth}>
      {children}
      {isMultiSelectable && (
        <Flex
          gap="2"
          width="full"
          flexWrap="wrap"
          maxHeight={hasMultiSelectScrollBox ? '40' : undefined}
          overflowX={hasMultiSelectScrollBox ? 'hidden' : undefined}
          overflowY={hasMultiSelectScrollBox ? 'auto' : undefined}
        >
          {selectedOptions.map(option => {
            const optionId = option[optionIdKey];
            if (!isValidId(optionId)) return null;

            const clickHandler = () => onRemove?.(option);

            return (
              <Chip
                key={optionId}
                element="button"
                tabIndex={0}
                variant="slim"
                removable
                height="10"
                maxWidth="full"
                minWidth="fitContent"
                textTransform="none"
                alignItems="center"
                disabled={disabled}
                cursor={disabled ? 'not-allowed' : 'pointer'}
                pointerEvents={disabled ? 'none' : undefined}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    clickHandler();
                  }
                }}
                onClick={clickHandler}
              >
                {option && (
                  <Flex element="span" alignItems="center" height="full" maxWidth="10/12" flex="1" whiteSpace="nowrap">
                    {renderOptionLabel(option, ellipsisTextProps)}
                  </Flex>
                )}
              </Chip>
            );
          })}
        </Flex>
      )}
      {isOpen &&
        inputElement &&
        createPortal(
          <Box
            ref={setPopperElement}
            zIndex="topmost"
            maxHeight="64"
            overflowY="auto"
            border="1px"
            boxShadow="base"
            borderColor="border"
            borderRadius="base"
            marginTop="2"
            marginLeft="px"
            style={{ ...styles.popper }}
            {...attributes.popper}
            backgroundColor="white"
          >
            <Stack
              padding="0"
              height="full"
              spacing="0.5"
              element="ul"
              margin="0"
              ref={listRef}
              id="options-list"
              role="listbox"
              width="full"
              listStyleType="none"
              backgroundColor="white"
              boxShadow={isOpen ? 'base' : undefined}
              style={{
                minWidth: `${inputElement?.offsetWidth}px`
              }}
            >
              {/* Load State */}
              {isLoading && (
                <>
                  <Center height="10" borderRadius="none" width="24" paddingX="4">
                    <Skeleton variant="text" shade="dark" borderRadius="none" />
                  </Center>
                  <Center height="10" borderRadius="none" width="28" paddingX="4">
                    <Skeleton variant="text" shade="dark" borderRadius="none" />
                  </Center>
                  <Center height="10" borderRadius="none" width="16" paddingX="4">
                    <Skeleton variant="text" shade="dark" borderRadius="none" />
                  </Center>
                </>
              )}

              {/* No items found */}
              {options?.length === 0 && !isLoading && (
                <Box element="span" width="full" height="fitContent" padding="3">
                  {noOptionsFallbackMessage}
                </Box>
              )}

              {/* Results */}
              {!isLoading &&
                options?.length > 0 &&
                options?.map((option, index) => {
                  const optionId = option[optionIdKey];
                  if (!isValidId(optionId)) return null;
                  const isHighlighted = selectedOptions.some(opt => optionId === opt[optionIdKey]);
                  return (
                    <Button
                      variant="nav"
                      element="li"
                      key={optionId}
                      role="option"
                      aria-selected={index === activeOptionIndex}
                      onClick={() => handleSelect(option)}
                      onKeyDown={(event: KeyboardEvent<HTMLLIElement>) => handleItemKeyDown(event, index)}
                      tabIndex={0}
                      display="flex"
                      gap="2"
                      alignItems="center"
                      cursor="pointer"
                      width="full"
                      justifyContent="flex-start"
                      paddingY="2"
                      paddingX="2"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      isHighlighted={isHighlighted}
                    >
                      {renderOptionLabel(option, ellipsisTextProps)}
                      {isHighlighted && (
                        <Center element="span">
                          <CheckMarkIcon boxSize="5" color="primary" />
                        </Center>
                      )}
                    </Button>
                  );
                })}
            </Stack>
          </Box>,
          portalElementOverride ?? parentContainerRef?.current ?? document.body
        )}
    </Stack>
  );
}

export const SelectWrapper = memo(forwardRef(SelectWrapperImpl)) as OverridableSelectOptionProp<SelectWrapperProps>;
