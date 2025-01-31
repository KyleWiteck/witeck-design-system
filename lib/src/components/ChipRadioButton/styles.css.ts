import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme';

export const radio = style({
  appearance: 'none',
  position: 'absolute',
  visibility: 'hidden'
});

export const chipRadioButtonRecipe = recipe({
  base: {
    display: 'flex',
    cursor: 'pointer',
    border: varsContract.border['1px'],
    borderColor: varsContract.color['transparent'],
    borderRadius: varsContract.borderRadius.base,
    transition: 'all 200ms',
    outline: '1px solid transparent',
    selectors: {
      [`${radio}:checked + &`]: {
        color: varsContract.color.primary,
        backgroundColor: varsContract.color.white,
        borderColor: varsContract.color.border
      },
      '&:hover': {
        // !important: One off color by design
        backgroundColor: '#D1D6E7'
      },
      [`${radio}:disabled + &`]: {
        cursor: 'not-allowed',
        color: varsContract.color.neutral400,
        backgroundColor: varsContract.color.neutral200
      },
      [`${radio}:disabled:checked + &`]: {
        color: varsContract.color.primary300,
        borderColor: varsContract.color.transparent
      }
    }
  },
  variants: {
    size: {
      sm: {
        paddingTop: varsContract.space['1'],
        paddingBottom: varsContract.space['1'],
        paddingLeft: varsContract.space['2'],
        paddingRight: varsContract.space['2']
      },
      md: {
        paddingTop: varsContract.space['1'],
        paddingBottom: varsContract.space['1'],
        paddingLeft: varsContract.space['3'],
        paddingRight: varsContract.space['3']
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type RadioButtonVariants = RecipeVariants<typeof chipRadioButtonRecipe>;
