import { keyframes, style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme';
import { colors } from '../../utils/theme';

export const wave = keyframes({
  '0%': {
    transform: 'translateX(-100%)'
  },
  '50%': {
    /* +0.5s of delay between each loop */
    transform: 'translateX(100%)'
  },
  '100%': {
    transform: 'translateX(100%)'
  }
});

/**
 * Generate a linear gradient background for a specified color with adjustable opacity.
 *
 * @param colorVar - The color variable name (e.g., 'neutral100', 'neutral200').
 * @param opacity - Opacity value (0.0 to 1.0) to smooth out the animation. Higher values may look choppy with darker backgrounds.
 * @returns The CSS linear-gradient background with the specified color and opacity.
 */
const SkeletonBackground = (
  colorVar: Extract<keyof typeof colors, 'neutral100' | 'neutral200'>,
  opacity: number = 0.8
) =>
  `linear-gradient(90deg, ${varsContract.color[colorVar]}, rgba(255, 255, 255, ${opacity}), ${varsContract.color[colorVar]})`;

export const skeleton = style({
  display: 'block',
  marginTop: '0px',
  marginBottom: '0px',
  transformOrigin: '0px 55%',
  position: 'relative',
  overflow: 'hidden',
  selectors: {
    '&::after': {
      content: '',
      width: '200%',
      position: 'absolute',
      transform: 'translateX(-100%)',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      background: SkeletonBackground('neutral100'),
      animation: `${wave} 2s linear 0.5s infinite`
    }
  }
});

// These configurations are based on the MUI Skeleton "wave" variant @2023
// but has been altered to match our theming
// https://mui.com/material-ui/react-skeleton/
export const skeletonRecipe = recipe({
  base: skeleton,

  variants: {
    variant: {
      base: {},
      text: {
        width: '100%',
        selectors: {
          '&::before': {
            fontSize: varsContract?.fontSize?.['sm'],
            lineHeight: varsContract?.lineHeight?.['2xl'],
            display: 'inline-block',
            visibility: 'hidden',
            content: '\\200B'
          }
        }
      },
      round: { borderRadius: '100%' },
      image: { padding: varsContract.space[2] }
    },
    shade: {
      light: {
        backgroundColor: varsContract.color.neutral100,
        selectors: {
          '&::after': {
            background: SkeletonBackground('neutral100')
          }
        }
      },
      dark: {
        backgroundColor: varsContract.color.neutral200,
        selectors: {
          '&::after': {
            background: SkeletonBackground('neutral200', 0.6)
          }
        }
      }
    }
  },

  compoundVariants: [],

  defaultVariants: {
    shade: 'light',
    variant: 'base'
  }
});

export type SkeletonVariants = RecipeVariants<typeof skeletonRecipe>;
