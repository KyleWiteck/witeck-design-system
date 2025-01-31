import { ForwardedRef, forwardRef } from 'react';

import { DefaultComponentProps } from '../../types';
import { Box, SprinklesProps } from '../Box';

export type TDataSizeVariant = 'lg' | 'md' | 'sm';

type Props = SprinklesProps & { size?: TDataSizeVariant };

type TDataTypeMap = {
  props: Props;
  defaultComponent: 'td';
};

const SizeVariants: Record<TDataSizeVariant, SprinklesProps> = {
  lg: {
    paddingY: '5',
    paddingX: '2.5',
    fontSize: 'base'
  },
  md: {
    paddingY: '4',
    paddingX: '2.5',
    fontSize: 'sm'
  },
  sm: {
    paddingY: '2.5',
    paddingX: '2',
    fontSize: 'sm'
  }
};

export type TDataProps = DefaultComponentProps<TDataTypeMap>;

function TDataImpl(props: TDataProps, forwardedRef: ForwardedRef<HTMLTableCellElement>) {
  const { size = 'md', ...tableProps } = props;

  return (
    <Box
      element="td"
      ref={forwardedRef}
      textAlign="left"
      whiteSpace="nowrap"
      overflowX="hidden"
      textOverflow="ellipsis"
      maxWidth="60"
      title={typeof props.children === 'string' ? props.children : undefined}
      {...SizeVariants[size]}
      {...tableProps}
    />
  );
}

export const TData = forwardRef(TDataImpl);
