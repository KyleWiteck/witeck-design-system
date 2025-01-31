import { keyframes } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';
import { BoxProps } from '../Box';

export const modalGutters: Pick<BoxProps<'div'>, 'paddingX'> = { paddingX: { mobile: '4', tablet: '6' } };

export const ModalOverlayRecipe = recipe({
  base: {
    height: varsContract?.space.fullVH,
    width: varsContract?.space.fullVW,
    transition: 'opacity 100ms ease-in-out, visibility 100ms ease-in-out',
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0,
    visibility: 'visible',
    backdropFilter: varsContract.backdropFilter.base
  },

  variants: {
    isOpen: {
      false: {
        opacity: 0,
        visibility: 'hidden',
        position: 'absolute'
      },
      true: {
        opacity: 1,
        visibility: 'visible'
      },
      none: {}
    }
  },

  compoundVariants: [],

  defaultVariants: {
    isOpen: false
  }
});

export type ModalOverlayRecipeVariants = RecipeVariants<typeof ModalOverlayRecipe>;

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
});

export const ModalRecipe = recipe({
  base: {
    position: 'fixed',
    top: '48%',
    left: '50%',
    maxHeight: '90vh',
    transform: 'translate(-50%, -50%)',
    animation: `${contentShow} 300ms cubic-bezier(0.16, 1, 0.3, 1)`
  },
  variants: {
    variant: {
      sm: { width: '480px', maxWidth: '95vw' },
      md: { width: '572px', maxWidth: '95vw' },
      lg: { width: '932px', maxWidth: '95vw' },
      custom: {}
    }
  },

  compoundVariants: [],

  defaultVariants: {
    variant: 'md'
  }
});

export type ModalVariants = RecipeVariants<typeof ModalRecipe>;
