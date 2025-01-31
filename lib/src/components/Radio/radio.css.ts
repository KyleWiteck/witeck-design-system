import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';

export const radioRecipe = recipe({
  base: {
    display: 'grid',
    placeContent: 'center',
    appearance: 'none',
    backgroundColor: varsContract.color.white,
    margin: 0,
    font: 'inherit',
    color: 'currentColor',
    border: varsContract.border['2px'],
    borderColor: varsContract.color.neutral400,
    borderRadius: '50%',
    transition: 'border-color 200ms',
    overflow: 'hidden',
    selectors: {
      '&:before': {
        content: '""',
        borderRadius: varsContract.borderRadius.full,
        transform: `scale(0)`,
        transition: '200ms transform',
        backgroundColor: varsContract.color.primary,
        cursor: 'pointer'
      },
      '&:hover:not(:checked):not(:disabled)': {
        borderColor: varsContract.color.primary400
      },
      '&:checked': {
        borderColor: varsContract?.color.primary
      },
      '&:checked:before': {
        transform: `scale(1)`
      },
      '&:disabled:checked:before': {
        transform: `scale(1)`,
        backgroundColor: varsContract.color.neutral400
      },
      '&:disabled': {
        borderColor: varsContract?.color.neutral400,
        backgroundColor: varsContract.color.neutral200,
        cursor: 'not-allowed'
      }
    }
  },

  variants: {
    variant: {
      custom: {}
    },
    size: {
      md: {
        width: varsContract?.space['4.5'],
        height: varsContract?.space['4.5'],
        selectors: {
          '&:before': {
            width: varsContract.space['2.5'],
            height: varsContract.space['2.5']
          }
        }
      }
    },
    hasError: {
      true: {
        borderColor: varsContract.color.error
      },
      false: {}
    }
  },

  defaultVariants: {
    size: 'md',
    hasError: false
  }
});

export type RadioVariants = RecipeVariants<typeof radioRecipe>;
