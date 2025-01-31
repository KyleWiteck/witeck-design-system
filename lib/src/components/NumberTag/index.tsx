import { forwardRef } from 'react';

import { PaddingCSSPropertiesUnion } from '../../types/globalTypes';
import { colors } from '../../utils';
import { Box, BoxProps } from '../Box';
import { Text } from '../Text';

export interface NumberTagProps
  extends Omit<BoxProps<'div'>, 'backgroundColor' | 'color' | 'borderRadius' | PaddingCSSPropertiesUnion> {
  backgroundColor?: Exclude<keyof typeof colors, 'white'>;
  variant?: 'slim' | 'fat';
}

export const NumberTag = forwardRef<HTMLDivElement | null, NumberTagProps>(
  ({ children, backgroundColor = 'primary', variant = 'fat', ...boxProps }, ref) => {
    return (
      <Box
        paddingX={variant === 'slim' ? '1.5' : '2'}
        paddingY={variant === 'slim' ? 'px' : '1'}
        width="fitContent"
        fontSize="xs"
        borderRadius="full"
        backgroundColor={backgroundColor}
        fontWeight="medium"
        color="white"
        textAlign="center"
        {...boxProps}
        style={{ ...boxProps?.style, borderRadius: '100px' }}
        ref={ref}
      >
        <Text element="span" variant="inherit" width="fitContent" minHeight="3" minWidth="1.5">
          {children}
        </Text>
      </Box>
    );
  }
);
