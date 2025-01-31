import { MouseEvent, PropsWithChildren, Ref, createContext, useContext, useId, useRef } from 'react';

import { isKeyOf } from '../../utils';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { DataGridItem, DataGridProps, FormFilterValues } from './utils';

const NonFilterParams = ['search', 'page', 'direction', 'sortBy', 'pageSize'];

type DataGridFilterContextType = {
  formId: string;
  formRef: Ref<HTMLFormElement | null>;
};

const DataGridFilterContext = createContext({});

export function useDataGridFiltersContext() {
  const ctx = useContext(DataGridFilterContext) as DataGridFilterContextType;
  if (!ctx) throw new Error('No DataGridFilterContext found.');
  return ctx;
}

export function DataGridFilterForm<T extends DataGridItem>(props: PropsWithChildren<DataGridProps<T>>) {
  const {
    children,
    getFilterValues = e => Object.fromEntries(new FormData(e.currentTarget)) as FormFilterValues,
    onResetFilters = () => {},
    searchParams = new URLSearchParams(),
    setSearchParams = () => {},
    totalRecords
  } = props;

  const formId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);

  // Don't count Search and Pagination
  const filters = new URLSearchParams(searchParams);
  NonFilterParams.forEach(key => filters.delete(key));

  const showClearAllButton = filters.size > 0;

  function submit(fields: FormFilterValues) {
    const results = new URLSearchParams(searchParams);

    // Map all values while ignoring the "undefined" ones
    for (const key in fields) {
      if (!isKeyOf(fields, key) || !fields[key]) continue;

      const value = fields[key];

      if (results.has(key)) results.delete(key);

      if (Array.isArray(value)) value.forEach(v => results.append(key, v));
      else results.append(key, value);
    }

    setSearchParams(results);
  }

  return (
    <Stack
      element="form"
      ref={formRef}
      gap="4"
      width="full"
      id={formId}
      method="GET"
      onSubmit={event => {
        event.preventDefault();
        submit(getFilterValues(event));
      }}
    >
      <DataGridFilterContext.Provider value={{ formId, formRef }}>
        <Flex gap="2" alignItems="center" flexWrap="wrap">
          {children}
        </Flex>
      </DataGridFilterContext.Provider>

      {showClearAllButton && (
        <Flex backgroundColor="primary100" gap="2" paddingY="1" paddingX="4" alignItems="center" width="full">
          <Text variant="label" fontWeight="medium">
            {totalRecords && totalRecords > 0 ? totalRecords : 'No'} Records found.
          </Text>
          <Button
            type="button"
            variant="text"
            size="sm"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              const newSearchParams = new URLSearchParams(searchParams);

              for (const key of newSearchParams.keys()) {
                if (!NonFilterParams.includes(key)) searchParams.delete(key);
              }

              setSearchParams(searchParams);
              onResetFilters(event);
            }}
          >
            Clear Filters
          </Button>
        </Flex>
      )}
    </Stack>
  );
}
