import { MouseEvent, useRef } from 'react';

import { CloseIcon, SearchIcon } from '../../icons';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Input, InputProps } from '../Input';
import { Spinner } from '../Spinner';
import { DataGridItem, DataGridProps } from './utils';

type SearchInputProps = Omit<InputProps, 'rightIcon' | 'leftIcon'> & {
  isLoading?: boolean;
  onSearchButtonClick?(e: MouseEvent<HTMLButtonElement>): void;
  onClearSearch?(e: MouseEvent<HTMLButtonElement>): void;
  errorMessage?: string;
};

/**
 * Reusable and Stateless search input
 * Supports Controlled and Uncontrolled forms
 * */
export function SearchInput(props: SearchInputProps) {
  const {
    isLoading,
    value,
    defaultValue,
    onSearchButtonClick,
    onClearSearch,
    width = 'minContent',
    minWidth,
    maxWidth,
    ...inputProps
  } = props;

  const input = value ?? defaultValue;

  return (
    <Flex gap="2" minWidth={minWidth} maxWidth={maxWidth} width={width}>
      <Input
        name="search"
        flex="1"
        size="sm"
        placeholder="Search..."
        defaultValue={defaultValue}
        value={value}
        leftIcon={isLoading ? <Spinner size="sm" /> : <SearchIcon color="neutral300" />}
        rightIcon={
          <Button variant="text" size="sm" disabled={isLoading} type="submit" onClick={onSearchButtonClick}>
            Search
          </Button>
        }
        {...inputProps}
      />
      <Button
        visibility={input ? 'visible' : 'hidden'}
        type="button"
        size="sm"
        variant="text"
        icon={<CloseIcon />}
        onClick={onClearSearch}
      >
        Clear Search
      </Button>
    </Flex>
  );
}

export function DataGridSearchForm<T extends DataGridItem>(props: DataGridProps<T>) {
  const { searchInputPlaceholder, isLoading, searchParams = new URLSearchParams(), setSearchParams = () => {} } = props;

  const activeRef = useRef(false);
  const input = searchParams.get('search') ?? '';
  const loading = isLoading && activeRef.current;

  const activate = () => {
    activeRef.current = true;
  };

  const deactivate = () => {
    activeRef.current = false;
  };

  return (
    <form
      method="GET"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onSubmit={e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const value = String(data.get('search'));
        if (value) {
          searchParams.set('search', value);
          setSearchParams(searchParams);
        }
      }}
    >
      <SearchInput
        key={input}
        defaultValue={input}
        placeholder={searchInputPlaceholder}
        maxWidth="150"
        width="full"
        isLoading={loading}
        onFocus={activate}
        onBlur={deactivate}
        onClearSearch={e => {
          searchParams.delete('search');
          setSearchParams(searchParams);
          e.currentTarget.form?.reset();
        }}
      />
    </form>
  );
}
