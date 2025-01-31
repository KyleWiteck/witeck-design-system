import { ForwardedRef, ReactNode, forwardRef } from 'react';

import { ArrowDownIcon, ArrowUpIcon, UnfoldIcon } from '../../icons';
import { DefaultComponentProps, Overwrite } from '../../types';
import { classJoin } from '../../utils';
import { SprinklesProps } from '../Box';
import { Text, TextProps } from '../Text';
import { sortableTableHeadStyles } from './styles.css';

type SizeVariant = 'lg' | 'md' | 'sm';
export type SortDirection = 'none' | 'asc' | 'desc';

type Props = Overwrite<TextProps<'th'>, { size?: SizeVariant; sort?: SortDirection; isLoading?: boolean }>;

type THeadTypeMap = {
  props: Props;
  defaultComponent: 'th';
};

const SizeVariants: Record<SizeVariant, SprinklesProps> = {
  lg: {
    paddingY: '4',
    paddingX: '2.5',
    fontSize: 'base'
  },
  md: {
    paddingY: '3',
    paddingX: '2',
    fontSize: 'xs'
  },
  sm: {
    paddingY: '2.5',
    paddingX: '1.5',
    fontSize: 'xs'
  }
};

export type THeadProps = DefaultComponentProps<THeadTypeMap>;

const SortIcon: Record<SortDirection, ReactNode> = {
  none: <UnfoldIcon boxSize="4" />,
  asc: <ArrowUpIcon boxSize="4" />,
  desc: <ArrowDownIcon boxSize="4" />
};

function THeadImpl(props: THeadProps, forwardedRef: ForwardedRef<HTMLTableCellElement>) {
  const { size = 'md', sort, className, children, isLoading, ...textProps } = props;

  if (sort) {
    if (sort === 'asc') textProps['aria-sort'] = 'ascending';
    else if (sort === 'desc') textProps['aria-sort'] = 'descending';
    else textProps['aria-sort'] = 'none';
    textProps.tabIndex = 0;
    textProps.cursor = 'pointer';
  }

  return (
    <Text
      element="th"
      color={sort && sort !== 'none' ? 'neutral900' : 'neutral600'}
      ref={forwardedRef}
      textTransform="uppercase"
      fontWeight="bold"
      textAlign="left"
      borderBottom="1px"
      borderColor="border"
      className={classJoin(sort && sortableTableHeadStyles, isLoading && 'loading', className)}
      {...SizeVariants[size]}
      {...textProps}
    >
      <Text
        element="span"
        display="flex"
        gap="2"
        alignItems="center"
        color="inherit"
        textTransform="uppercase"
        fontWeight="inherit"
        textAlign="left"
      >
        {children}
        {sort && SortIcon[sort]}
      </Text>
    </Text>
  );
}

export const THead = forwardRef(THeadImpl);
