import { ForwardedRef, forwardRef, memo } from 'react';

import { DefaultComponentProps } from '../../types';
import { classJoin } from '../../utils';
import { Box, SprinklesProps } from '../Box';
import { RowVariants, rowRecipe } from './styles.css';

type Props = SprinklesProps &
  RowVariants & {
    isHighlighted?: boolean;
  };

type TRowTypeMap = {
  props: Props;
  defaultComponent: 'tr';
};

export type TRowProps = DefaultComponentProps<TRowTypeMap>;

function TRowImpl(props: TRowProps, forwardedRef: ForwardedRef<HTMLTableRowElement>) {
  const { className, clickable = false, isHighlighted, ...otherProps } = props;

  if (clickable) {
    otherProps.role = otherProps.role ?? 'button';
    otherProps.tabIndex = otherProps.tabIndex ?? 0;
  }

  if (isHighlighted) {
    otherProps.backgroundColor = 'primary100';
  }

  const styles = rowRecipe({ clickable });
  const classNames = classJoin(styles, className);

  return <Box element="tr" ref={forwardedRef} {...otherProps} className={classNames} />;
}

export const TRow = memo(forwardRef(TRowImpl));
