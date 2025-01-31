import { ReactNode } from 'react';

import { BorderCSSProperties } from '../../types';
import { themeValues } from '../../utils';
import { Box, BoxProps } from '../Box';
import { Flex } from '../Flex';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { Stack } from '../Stack';
import { Tooltip, TooltipProps } from '../Tooltip';

export interface TileProps extends Omit<BoxProps, 'backgroundColor' | 'title' | 'content' | BorderCSSProperties> {
  variant?: keyof typeof bgColors;
  title?: ReactNode;
  subTitle?: ReactNode;
  toolTipProps?: TooltipProps;
}

const bgColors = {
  yellow: 'warningTint',
  red: 'errorTint',
  blue: 'infoTint',
  neutral: 'neutral200',
  white: 'white',
  green: 'successTint'
} satisfies Record<string, keyof typeof themeValues.color>;

export function Tile(props: TileProps) {
  const { variant, title, subTitle, toolTipProps, children, ...boxProps } = props;
  const activeColor = variant ? bgColors[variant] : 'neutral200';

  return (
    <Box height="fitContent" {...boxProps} border="1px" borderColor="border">
      <Flex
        width="full"
        backgroundColor={activeColor}
        borderRadius="none"
        minHeight="fitContent"
        paddingY="4"
        paddingX="3"
        alignItems="center"
      >
        <Stack flex="1" borderRadius="none">
          <ReactNodeStringHandler variant="caption" fontWeight="semibold" textTransform="capitalize">
            {title}
          </ReactNodeStringHandler>
          <ReactNodeStringHandler variant="caption" color="neutral500" fontWeight="semibold" textTransform="capitalize">
            {subTitle}
          </ReactNodeStringHandler>
        </Stack>
        {toolTipProps && (
          <Box margin="auto" height="6">
            <Tooltip {...toolTipProps} />
          </Box>
        )}
      </Flex>
      <Box width="full" backgroundColor="white" borderRadius="none" minHeight="fitContent" paddingY="6" paddingX="3">
        <ReactNodeStringHandler variant="h4" element="p" weight="bold">
          {children}
        </ReactNodeStringHandler>
      </Box>
    </Box>
  );
}
