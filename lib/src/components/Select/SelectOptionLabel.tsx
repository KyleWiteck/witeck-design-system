import React from 'react';

import { Text, TextProps } from '../Text';

export interface SelectOptionLabelProps extends TextProps {}

export const SelectOptionLabel = (props: SelectOptionLabelProps) => {
  const { ...textProps } = props;

  return (
    <Text
      element="span"
      cursor="pointer"
      width="full"
      maxWidth="full"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      variant="inherit"
      lineHeight="normal"
      display="inline-block"
      verticalAlign="middle"
      gap="2"
      height="auto"
      flex="1"
      {...textProps}
    />
  );
};
