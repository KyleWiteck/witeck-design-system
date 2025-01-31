import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { sprinkles } from '../../theme/sprinkles.css';
import { varsContract } from '../../theme/vars.css';

/**
 * This recipe applies base and variant styling meant for containers.
 */

export const container = recipe({
  base: sprinkles({ marginX: 'auto', width: 'full' }),

  variants: {
    size: {
      sm: { maxWidth: varsContract?.sizes.sm },
      md: { maxWidth: varsContract?.sizes.md },
      lg: { maxWidth: varsContract?.sizes.lg },
      xl: { maxWidth: varsContract?.sizes.xl },
      ['2xl']: { maxWidth: varsContract?.sizes['2xl'] }
    }
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'xl'
  }
});

export type ContainerVariants = RecipeVariants<typeof container>;
