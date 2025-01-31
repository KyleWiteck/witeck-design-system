import { Pagination } from '@KyleWiteck/witeck-design/components';
import { useState } from 'react';

export default function PaginationTest() {
  const [currentValue, setCurrentValue] = useState<number>(1);
  return (
    <Pagination
      variant="simple"
      totalItems={10}
      itemsPerPage={1}
      currentPage={currentValue}
      data-testid="pagination-center-10-items"
      onPageChange={newPage => {
        console.log(newPage);
        setCurrentValue(newPage);
      }}
    />
  );
}
