import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';
import { BoxProps } from '../Box';

export const drawerGutters: BoxProps<'div'> = { paddingX: { mobile: '4', tablet: '6' } };

export const drawerOverlayRecipe = recipe({
  base: {
    width: varsContract?.space.fullVW,
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0
  },

  variants: {},

  compoundVariants: [],

  defaultVariants: {}
});

export type drawerOverlayRecipeVariants = RecipeVariants<typeof drawerOverlayRecipe>;

export const drawerContainerOverlayRecipe = recipe({
  base: {
    width: varsContract?.space.fullVW,
    transition: 'all 400ms ease-in-out',
    position: 'absolute',
    top: 0,
    left: 0
  },

  variants: {
    isOpen: {
      false: {
        visibility: 'hidden',
        position: 'absolute'
      },
      true: {
        transition: 'none',
        visibility: 'visible'
      }
    }
  },

  compoundVariants: [],

  defaultVariants: {
    isOpen: false
  }
});

export type drawerContainerOverlayRecipeVariants = RecipeVariants<typeof drawerContainerOverlayRecipe>;
