import { keyframes } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';
import { colors, hexToRgbA } from '../../utils/theme';

const spin = keyframes({ to: { transform: 'rotate(360deg)' } });

const borderHandler = (px: number) => ({
  border: `${px}px solid ${hexToRgbA(colors.neutral300, 0.3)}`,
  borderTopColor: 'currentColor',
  borderRadius: '50%',
  animation: `${spin} 1s ease-in-out infinite`,
  backgroundColor: 'transparent'
});

export const spinnerRecipe = recipe({
  base: {
    display: 'inline-block'
  },

  variants: {
    variant: {},
    size: {
      sm: {
        width: varsContract?.space['5'],
        height: varsContract?.space['5'],
        ...borderHandler(4)
      },
      md: {
        width: varsContract?.space['8'],
        height: varsContract?.space['8'],
        ...borderHandler(4)
      },
      lg: {
        width: varsContract?.space['13'],
        height: varsContract?.space['13'],
        ...borderHandler(6)
      },
      xl: {
        width: varsContract?.space['22'],
        height: varsContract?.space['22'],
        ...borderHandler(8)
      },
      custom: {
        ...borderHandler(4)
      }
    }
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'md'
  }
});

export type SpinnerVariants = RecipeVariants<typeof spinnerRecipe>;
