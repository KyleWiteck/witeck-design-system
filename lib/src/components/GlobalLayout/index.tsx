import React, { forwardRef } from 'react';

import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';

export interface GlobalLayoutProps
  extends Omit<BoxProps<'main'>, 'element' | 'height' | 'flex' | 'overflowY' | 'maxWidth'> {
  header: React.ReactNode;
  drawer?: React.ReactNode;
  headerHeight?: number;
}

export const GlobalLayout = forwardRef<HTMLBodyElement, GlobalLayoutProps>(
  ({ className, drawer, children, header, headerHeight = 72, ...mainProps }, ref) => {
    return (
      <Flex
        direction="column"
        align="stretch"
        backgroundColor="white"
        position="relative"
        overflow="hidden"
        width="fullVW"
        height="fullVH"
        borderRadius="none"
        className={className}
        ref={ref}
        id="global-site-wrapper"
      >
        {header}
        <Flex
          width="full"
          flex="1"
          overflow="hidden"
          borderRadius="none"
          height="fullVH"
          style={{ paddingTop: `${headerHeight}px` }}
          id="global-content-wrapper"
        >
          {drawer && <Box height="full">{drawer}</Box>}
          <Box
            {...mainProps}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRadius="none"
            maxWidth="fullVW"
            flex="1"
            overflow="auto"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
            id="global-main-container"
          >
            <Box
              {...mainProps}
              borderRadius="none"
              display="flex"
              flexDirection="column"
              flex="1"
              element="main"
              height="full"
              maxWidth="fullVW"
            >
              {children}
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  }
);
