import { THead, THeadProps, TRow } from '../Table';
import { DataGridItem, DataGridProps, isSortDirection } from './utils';

/** Converts camelCase or snake_case strings into a string with spaces. */
function toHeading(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
}

export function DataGridHead<T extends DataGridItem>(props: DataGridProps<T>) {
  const {
    headers,
    sortableHeaders = [],
    hasActions,
    size,
    isLoading,
    searchParams = new URLSearchParams(),
    setSearchParams = () => {}
  } = props;

  function makeHeaderClickHandler(key: string) {
    return () => {
      const sortBy = searchParams.get('sortBy');
      const direction = searchParams.get('direction');

      searchParams.set('sortBy', key);

      if (sortBy !== key) {
        searchParams.set('direction', 'asc');
      } else if (direction === 'asc') {
        searchParams.set('direction', 'desc');
      } else if (direction === 'desc') {
        searchParams.delete('sortBy');
        searchParams.delete('direction');
      }

      setSearchParams(searchParams);
    };
  }

  function toDataGridHeader(heading: (typeof headers)[number]) {
    let key = '';
    const headProps: THeadProps = { size, sort: 'none' };

    const sortBy = searchParams.get('sortBy');
    const direction = searchParams.get('direction');

    if (typeof heading === 'string') {
      key = heading;
      headProps.children = toHeading(heading);
    }

    if (typeof heading === 'object') {
      key = String(heading.field);
      headProps.children = heading.value;
    }

    const isSortable = sortableHeaders.includes(key);

    if (isSortable) {
      headProps.onClick = makeHeaderClickHandler(key);
    } else {
      headProps.sort = undefined;
    }

    if (isSortable && sortBy === key) {
      headProps.sort = isSortDirection(direction) ? direction : 'none';
      headProps.isLoading = isLoading;
    }

    return <THead key={key} {...headProps} />;
  }

  return (
    <TRow position="sticky" top="0px">
      {headers.map(toDataGridHeader)}
      {hasActions && <THead data-id="table-actions" />}
    </TRow>
  );
}
