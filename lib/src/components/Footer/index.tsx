import React, { forwardRef } from 'react';

import { Box } from '../Box';
import { FlexProps } from '../Flex';

export interface FooterProps extends Omit<FlexProps<'div'>, 'width' | 'height' | 'element'> {}

export const Footer = forwardRef<HTMLDivElement | null, FooterProps>(({ children, ...props }, ref) => {
  return (
    <Box
      element="footer"
      width="full"
      bottom="0px"
      borderTop="1px"
      borderColor="border"
      paddingY="2"
      gap="2"
      paddingX={{ mobile: '3', tablet: '6', desktop: '8' }}
      backgroundColor="white"
      alignItems="center"
      minHeight="13"
      {...props}
      ref={ref}
    >
      {children}
    </Box>
  );
});
