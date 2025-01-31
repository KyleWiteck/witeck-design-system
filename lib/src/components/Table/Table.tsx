import { ForwardedRef, ReactNode, forwardRef } from 'react';

import { DefaultComponentProps } from '../../types';
import { classJoin } from '../../utils';
import { Box, BoxProps, SprinklesProps } from '../Box';
import * as styles from './styles.css';

type Props = SprinklesProps & {
  children?: never;
  head?: ReactNode;
  body?: ReactNode;
  isZebra?: boolean;
  containerBoxProps?: BoxProps;
  headBoxProps?: Omit<BoxProps, 'element' | 'ref'>;
  bodyBoxProps?: Omit<BoxProps, 'element' | 'ref'>;
};

type TableTypeMap = {
  props: Props;
  defaultComponent: 'table';
};

export type TableProps = DefaultComponentProps<TableTypeMap>;

function TableImplt(props: TableProps, forwardedRef: ForwardedRef<HTMLTableElement>) {
  const {
    className,
    head,
    body,
    containerBoxProps = {},
    headBoxProps = {},
    bodyBoxProps = {},
    isZebra = false,
    width = 'full',
    ...tableProps
  } = props;
  const classNames = classJoin(styles.table, isZebra ? styles.zebraTable : '', className);

  return (
    <Box {...containerBoxProps}>
      <Box width={width} {...tableProps} element="table" ref={forwardedRef} className={classNames}>
        {head && (
          <Box {...headBoxProps} element="thead">
            {head}
          </Box>
        )}
        {body && (
          <Box {...bodyBoxProps} element="tbody">
            {body}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export const Table = forwardRef(TableImplt);
