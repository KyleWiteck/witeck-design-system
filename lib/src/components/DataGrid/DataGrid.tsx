import { breakPoints } from '../../utils';
import { Button } from '../Button';
import { NotFoundUI } from '../EmptyState';
import { Flex } from '../Flex';
import { Pagination } from '../Pagination';
import { Skeleton } from '../Skeleton';
import { Stack } from '../Stack';
import { Table } from '../Table';
import { Text } from '../Text';
import { DataGridFilterForm } from './DataGridFiltersForm';
import { DataGridHead } from './DataGridHeader';
import { DataGridRow } from './DataGridRow';
import { DataGridSearchForm } from './DataGridSearchForm';
import { DataGridContext, DataGridItem, DataGridProps, RenderRowProps } from './utils';

/**
 * Default row renderer
 * */
function toDefaultRow<T extends DataGridItem>(item: Omit<RenderRowProps<T>, 'key'>) {
  if (!item.id)
    throw new Error(
      "DataGrid Error: Missing 'id' property. Implement a 'renderRow' function and provide a valid React key."
    );

  return <DataGridRow key={String(item.id)} {...item} />;
}

export function DataGrid<T extends DataGridItem>(props: DataGridProps<T>) {
  const {
    data,
    filters,
    renderRow,
    totalRecords,
    searchParams = new URLSearchParams(),
    setSearchParams = () => {},
    isLoading,
    defaultPageSize = 10,
    tableProps
  } = props;

  const isEmpty = (data ?? []).length < 1 || !totalRecords;

  return (
    <DataGridContext.Provider value={props}>
      <Stack gap="4" width="full">
        <DataGridSearchForm {...props} />
        <DataGridFilterForm {...props}>{filters}</DataGridFilterForm>
        <Table
          isZebra
          width="full"
          style={{ minWidth: breakPoints.tablet }}
          containerBoxProps={{
            overflowX: 'auto',
            width: 'full',
            borderTop: '1px',
            borderColor: 'border',
            borderRadius: 'none'
          }}
          head={<DataGridHead {...props} />}
          body={data?.map(renderRow ?? toDefaultRow)}
          {...tableProps}
        />

        {isEmpty && isLoading && (
          <Stack gap="2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <Skeleton key={n} width="full" height="9" />
            ))}
            <Flex paddingTop="4" justifyContent="space-between">
              <Skeleton width="1/4" height="8" />
              <Skeleton width="1/3" height="8" />
            </Flex>
          </Stack>
        )}

        {isEmpty && !isLoading && (
          <NotFoundUI
            headline="No Results Found"
            noActions={searchParams.size < 1}
            message={
              searchParams.size > 0
                ? 'We couldn’t find a match in our records. Press Clear to reset your search, filters and go back to page one.'
                : undefined
            }
            primaryAction={props =>
              searchParams.size > 0 ? (
                <Button onClick={() => setSearchParams(new URLSearchParams())} {...props}>
                  Clear
                </Button>
              ) : undefined
            }
          />
        )}

        {!isEmpty && (
          <Flex gap="4" flexWrap="wrap" alignItems="center" justifyContent="space-between" paddingTop="4">
            <Text color="neutral600">Total Records: {totalRecords}</Text>
            <Pagination
              variant="standard"
              totalItems={totalRecords}
              itemsPerPage={Number(searchParams.get('pageSize')) || defaultPageSize}
              currentPage={Number(searchParams.get('page')) || 1}
              onItemsPerPageChange={value => {
                searchParams.set('pageSize', String(value));
                setSearchParams(searchParams);
              }}
              onPageChange={page => {
                searchParams.set('page', String(page));
                setSearchParams(searchParams);
              }}
            />
          </Flex>
        )}
      </Stack>
    </DataGridContext.Provider>
  );
}
