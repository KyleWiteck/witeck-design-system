import { useContext } from 'react';

import { Flex } from '../Flex';
import { TData, TRow } from '../Table';
import { DataGridContext, DataGridItem, DataGridProps, RenderRowProps, isValidReactNode } from './utils';

/**
 * Table Row
 * */
export function DataGridRow<T extends DataGridItem>(props: RenderRowProps<T>) {
  const { headers, size, hasActions, isLoading } = useContext(DataGridContext) as DataGridProps<T>;

  if (!hasActions && props.actions) console.warn('DataGridRow actions were provided, but `hasActions` prop is false');

  return (
    <TRow opacity={isLoading ? '0.5' : '1'} cursor={isLoading ? 'wait' : 'default'}>
      {headers.map((heading, headingIndex) => {
        let node: unknown;
        let key: string = '';

        if (typeof heading === 'string') {
          node = props[heading];
          key = heading;
        } else if (typeof heading === 'object') {
          node = props[heading.field];
          key = String(heading.field);
        }

        if (isValidReactNode(node))
          return (
            <TData size={size} key={key}>
              {node}
            </TData>
          );

        console.error('Invalid ReactNode, rendering empty table cell index: ', headingIndex);
        return <TData size={size} key={key} />;
      })}

      {hasActions && props.actions && (
        <TData size={size}>
          <Flex
            role="presentation"
            gap="1"
            alignItems="center"
            justifyContent="center"
            maxHeight="4"
            overflowY="visible"
          >
            {props.actions}
          </Flex>
        </TData>
      )}
    </TRow>
  );
}
