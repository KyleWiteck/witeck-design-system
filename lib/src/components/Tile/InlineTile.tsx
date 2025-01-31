import { ReactNode } from 'react';

import { BorderCSSProperties } from '../../types';
import { hexToRgbA, themeValues } from '../../utils';
import { Box, BoxProps } from '../Box';
import { Center } from '../Center';
import { Text } from '../Text';

export interface InlineTileProps
  extends Omit<BoxProps, 'backgroundColor' | 'title' | 'content' | 'children' | BorderCSSProperties> {
  variant?: keyof typeof bgColors;
  number?: string;
  label?: ReactNode;
  icon?: ReactNode;
}

type colorKeys = keyof typeof themeValues.color;

interface colors {
  background: colorKeys;
  number: colorKeys;
  label: colorKeys;
  iconBackground: colorKeys;
}

const bgColors = {
  yellow: {
    background: 'warningTint',
    number: 'warningDark',
    label: 'warning',
    iconBackground: 'warningLight'
  },
  red: {
    background: 'errorTint',
    number: 'errorDark',
    label: 'error',
    iconBackground: 'errorLight'
  },
  blue: {
    background: 'infoTint',
    number: 'infoDark',
    label: 'info',
    iconBackground: 'infoLight'
  },
  neutral: {
    background: 'infoTint',
    number: 'infoDark',
    label: 'info',
    iconBackground: 'infoLight'
  },
  green: {
    background: 'successTint',
    number: 'successDark',
    label: 'success',
    iconBackground: 'successLight'
  }
} satisfies Record<string, colors>;

export function InlineTile(props: InlineTileProps) {
  const { variant, number, label, icon, ...boxProps } = props;
  const activeColor = variant ? bgColors[variant] : bgColors.blue;

  return (
    <Box height="fitContent" {...boxProps}>
      <Center
        width="full"
        height="full"
        backgroundColor={activeColor.background}
        borderRadius="none"
        minHeight="fitContent"
        padding="5"
        alignItems="center"
        gap="2"
      >
        {icon && (
          <Center
            borderRadius="full"
            padding="2"
            boxSize="11"
            aspectRatio="1:1"
            color={activeColor.number}
            style={{
              backgroundColor: hexToRgbA(themeValues.color[activeColor.iconBackground], 0.4)
            }}
          >
            {icon}
          </Center>
        )}
        <Text fontSize="5xl" fontWeight="bold" textTransform="capitalize" color={activeColor.number}>
          {number}
        </Text>
        <Text fontWeight="medium" fontSize="sm" textTransform="capitalize" color={activeColor.label}>
          {label}
        </Text>
      </Center>
    </Box>
  );
}
