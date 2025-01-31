import { useHistory, useLocation } from '@docusaurus/router';
import { Card, DataGrid } from '@KyleWiteck/witeck-design/components';
import { useEffect, useState } from 'react';

const defaultPageSize = 8;

export function DataGridDemo() {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const setSearchParams = (p: URLSearchParams) => history.push(location.pathname + '?' + p);

  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const pageSize = params.get('pageSize');
    const search = params.get('search');
    const sortBy = params.get('sortBy');
    const direction = params.get('direction');

    const args = {} as any;
    if (page) args._page = page;
    if (search) args.id = search;
    args._limit = pageSize ?? String(defaultPageSize);
    if (sortBy && direction) {
      args._sort = `${direction === 'asc' ? '+' : '-'}${sortBy}`;
    }

    fetch('https://jsonplaceholder.typicode.com/users?' + new URLSearchParams(args), { signal: controller.signal })
      .then(res => res.json())
      .then(d => d.map(user => ({ ...user, company: user.company.name })))
      .then(setData)
      .catch(() => setData(null));

    return () => controller.abort();
  }, [location]);

  return (
    <Card width="full" paddingX="4" paddingY="4">
      <DataGrid
        data={data}
        headers={['id', 'name', 'username', 'email', 'phone', 'company', 'website']}
        sortableHeaders={['id', 'name', 'email', 'phone']}
        totalRecords={10}
        defaultPageSize={defaultPageSize}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        searchInputPlaceholder="Enter an User ID"
        isLoading={data == null}
      />
    </Card>
  );
}
