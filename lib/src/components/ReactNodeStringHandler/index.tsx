import { ReactNode } from 'react';

import { Text, TextProps } from '../Text';

export interface ReactNodeStringHandlerProps extends Omit<TextProps, 'ref'> {
  preTextNode?: ReactNode;
  postTextNode?: ReactNode;
}

export function ReactNodeStringHandler(props: ReactNodeStringHandlerProps) {
  const { children, element = 'span', preTextNode, postTextNode, ...otherProps } = props;

  return (
    <>
      {typeof children === 'string' ? (
        <>
          {preTextNode}
          <Text element={element} variant="inherit" width="fitContent" {...otherProps}>
            {children}
          </Text>
          {postTextNode}
        </>
      ) : (
        <>
          {preTextNode}
          {children}
          {postTextNode}
        </>
      )}
    </>
  );
}
