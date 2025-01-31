import { forwardRef, useMemo } from 'react';

import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, FirstPageIcon, LastPageIcon } from '../../icons';
import { Button } from '../Button';
import { Flex, FlexProps } from '../Flex';
import { Select, SelectProps } from '../Select';
import { SelectOptionLabel } from '../Select/SelectOptionLabel';
import { Text } from '../Text';

export interface PaginationSpecificProps extends FlexProps<'div'> {
  /**
   * The display variant of the Pagination component.
   * - 'simple': Displays a simplified pagination UI without items per page selector.
   * - 'standard': Displays a standard pagination UI with items per page selector.
   */
  variant?: 'simple' | 'standard';
  /**
   * The total number of items available for pagination.
   */
  totalItems: number | string;
  /**
   * An array of available options for items per page selector.
   */
  itemsPerPageOptions?: number[];
  /**
   * The number of items to display per page.
   */
  itemsPerPage: number | string;
  /**
   * Callback function triggered when the items per page value is changed.
   * @param itemsPerPage - The new items per page value.
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /**
   * Overrides the calculated number of pages with a custom value.
   */
  numberOfPagesOverride?: number | string;
  /**
   * The current page number.
   */
  currentPage: number;
  /**
   * The size of the select element.
   */
  selectSize?: SelectProps['size'];
  /**
   * Callback function triggered when the current page is changed.
   * @param newPage - The new page number.
   */
  onPageChange: (newPage: number) => void;
}

export const Pagination = forwardRef<HTMLDivElement | null, PaginationSpecificProps>((props, forwardRef) => {
  const {
    variant = 'standard',
    numberOfPagesOverride,
    currentPage = 1,
    onPageChange,
    itemsPerPage = 10,
    selectSize,
    onItemsPerPageChange,
    totalItems,
    itemsPerPageOptions = ['10', '20', '30', '50', '100'],
    ...containerProps
  } = props;

  switch (variant) {
    case 'simple':
      if (onItemsPerPageChange) {
        throw new Error('"onItemsPerPageChange" props only works with the "strand" variant');
      }
      break;

    default:
      if (!onItemsPerPageChange) {
        throw new Error('"onItemsPerPageChange" props is required with the "strand" variant');
      }
      break;
  }

  const calculatedValues = useMemo(() => {
    const parsedTotalItems = typeof totalItems === 'string' ? parseInt(totalItems, 10) : totalItems;
    const parsedItemsPerPage = typeof itemsPerPage === 'string' ? parseInt(itemsPerPage, 10) : itemsPerPage;

    const calculatedTotalItems = parsedTotalItems || 0;
    const calculatedItemsPerPage = parsedItemsPerPage || 0;

    const calculatedNumberOfPages =
      numberOfPagesOverride ||
      (calculatedTotalItems && calculatedItemsPerPage && Math.ceil(calculatedTotalItems / calculatedItemsPerPage));

    return {
      calculatedTotalItems,
      calculatedItemsPerPage,
      calculatedNumberOfPages
    };
  }, [totalItems, itemsPerPage, numberOfPagesOverride]);

  const pageNumberArray = useMemo(
    () => Array.from({ length: Number(calculatedValues.calculatedNumberOfPages) }, (_, index) => index + 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, calculatedValues.calculatedNumberOfPages]
  );

  const isFirstPage = useMemo(() => Number(currentPage) === 1, [currentPage]);
  const isLastPage = useMemo(
    () => Number(currentPage) === Number(calculatedValues.calculatedNumberOfPages),
    [currentPage, calculatedValues.calculatedNumberOfPages]
  );

  const numberOptions = useMemo(
    () =>
      Array.from({ length: Number(calculatedValues.calculatedNumberOfPages) || 0 }, (_, index) => ({
        id: (index + 1).toString() + '-pagination-oage',
        value: (index + 1).toString(),
        label: (index + 1).toString()
      })),
    [calculatedValues.calculatedNumberOfPages]
  );

  const containerStyles: FlexProps<'div'> = useMemo(
    () => ({
      ref: forwardRef,
      gap: '2',
      flex: '1',
      justify: 'space-between',
      width: 'full',
      ...containerProps
    }),
    [containerProps, forwardRef]
  );

  const onArrowClick = (direction: 'back' | 'forward' | 'first' | 'last') => {
    if (onPageChange) {
      let newPage: number | null = null;

      switch (direction) {
        case 'back':
          newPage = (Number(currentPage) || 1) - 1;
          break;
        case 'forward':
          newPage = (Number(currentPage) || 1) + 1;
          break;
        case 'first':
          newPage = 1;
          break;
        case 'last':
          newPage = Number(calculatedValues.calculatedNumberOfPages) || 1;
          break;
        default:
          break;
      }

      if (newPage && newPage >= 1 && newPage <= (Number(calculatedValues.calculatedNumberOfPages) || 1)) {
        onPageChange(newPage);
      }
    }
    return;
  };

  if (variant === 'simple') {
    return (
      <Flex {...containerStyles} alignItems="center" gap="6" width="full">
        <Button
          variant="custom"
          cursor="pointer"
          boxSize="11"
          disabled={isFirstPage}
          onClick={() => onArrowClick('back')}
        >
          <ArrowRightIcon style={{ transform: 'rotate(180deg)' }} />
        </Button>

        {pageNumberArray && (
          <Flex gap="2" direction="row" alignItems="center">
            <Text>Page</Text>

            <Select
              optionIdKey="id"
              placeholder=""
              containerProps={{ id: 'select' }}
              maxWidth="24"
              renderOptionLabel={opt => (opt?.label ? <SelectOptionLabel>{opt?.label}</SelectOptionLabel> : null)}
              value={numberOptions?.find(({ label }) => label === String(currentPage))}
              options={numberOptions}
              size={selectSize}
              onSelect={opt => {
                onPageChange(Number(opt.value));
              }}
            />

            <Text whiteSpace="nowrap">of {Number(calculatedValues.calculatedNumberOfPages)}</Text>
          </Flex>
        )}
        <Button
          variant="custom"
          disabled={isLastPage}
          boxSize="11"
          onClick={() => onArrowClick('forward')}
          cursor="pointer"
        >
          <ArrowRightIcon />
        </Button>
      </Flex>
    );
  }

  return (
    <Flex {...containerStyles} alignItems="center" justifyContent="flex-end" gap="7">
      {pageNumberArray && (
        <>
          <Text color="neutral600">Items per page</Text>

          <Select
            optionIdKey="id"
            placeholder=""
            containerProps={{ id: 'select' }}
            maxWidth="24"
            renderOptionLabel={opt => opt?.label && <SelectOptionLabel>{opt?.label}</SelectOptionLabel>}
            value={{ id: String(itemsPerPage), label: String(itemsPerPage), value: String(itemsPerPage) }}
            options={itemsPerPageOptions?.map(num => ({ id: String(num), label: String(num), value: String(num) }))}
            onSelect={opt => {
              onItemsPerPageChange?.(Number(opt.value));
            }}
          />

          <Text color="neutral600">{`Page ${currentPage} of ${calculatedValues.calculatedNumberOfPages}`}</Text>
        </>
      )}
      <Flex gap="0.5">
        <Button
          variant="custom"
          boxSize="11"
          paddingX="0"
          disabled={isFirstPage}
          onClick={() => onArrowClick('first')}
          cursor="pointer"
        >
          <FirstPageIcon />
        </Button>
        <Button
          variant="custom"
          boxSize="11"
          paddingX="0"
          disabled={isFirstPage}
          onClick={() => onArrowClick('back')}
          cursor="pointer"
          style={{ transform: 'rotate(90deg)' }}
        >
          <ChevronDownIcon />
        </Button>
        <Button
          variant="custom"
          boxSize="11"
          paddingX="0"
          disabled={isLastPage}
          onClick={() => onArrowClick('forward')}
          cursor="pointer"
          style={{ transform: 'rotate(90deg)' }}
        >
          <ChevronUpIcon />
        </Button>
        <Button
          variant="custom"
          boxSize="11"
          paddingX="0"
          disabled={isLastPage}
          onClick={() => onArrowClick('last')}
          cursor="pointer"
        >
          <LastPageIcon />
        </Button>
      </Flex>
    </Flex>
  );
});
