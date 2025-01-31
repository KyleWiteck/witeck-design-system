import { FormEvent, MouseEvent, ReactNode, createContext, isValidElement } from 'react';

import { SortDirection, TDataSizeVariant, TableProps } from '../Table';

export type DataGridItem = Record<string, unknown>;

export type RenderRowProps<T extends DataGridItem> = Partial<T & { actions: ReactNode }> & {
  key: React.Key;
};

export type DataGridHeaders<T extends DataGridItem> = ({ field: keyof T; value: ReactNode } | keyof T)[];

export type FormFilterValues = Record<string, undefined | string | string[]>;
/**
 * Props
 * */
export interface DataGridProps<T extends DataGridItem> {
  data?: T[];
  headers: DataGridHeaders<T>;
  isLoading?: boolean;
  sortableHeaders?: (keyof T)[];
  hasActions?: boolean;
  renderRow?(item: T): ReactNode;
  size?: TDataSizeVariant;
  filters?: ReactNode;
  searchInputPlaceholder?: string;
  totalRecords?: number;
  tableProps?: Omit<TableProps, 'head' | 'body'>;
  defaultPageSize?: number;
  // notFound?: ReactNode;
  searchParams?: URLSearchParams;
  setSearchParams?(params: URLSearchParams): void;
  getFilterValues?(event: FormEvent<HTMLFormElement>): FormFilterValues;
  onResetFilters?(event: MouseEvent<HTMLButtonElement>): void;
}
export const DataGridContext = createContext({});

export function isValidReactNode(node: unknown): node is ReactNode {
  return (
    isValidElement(node) ||
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean' ||
    node === null ||
    node === undefined ||
    (Array.isArray(node) && node.every(isValidReactNode))
  );
}

export function isSortDirection(value: unknown): value is SortDirection {
  switch (value) {
    case 'none':
    case 'asc':
    case 'desc':
      return true;

    default:
      return false;
  }
}
