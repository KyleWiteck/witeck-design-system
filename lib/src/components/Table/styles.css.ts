import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';

export const table = style({
  borderCollapse: 'collapse'
});

export const zebraTable = style({});

export const rowRecipe = recipe({
  base: {
    selectors: {
      '&:not(:last-of-type)': {
        borderBottom: varsContract.border['1px'],
        borderColor: varsContract.color.border
      },
      [`${zebraTable} &:nth-child(even)`]: {
        backgroundColor: varsContract.color.neutral100
      }
    }
  },
  variants: {
    clickable: {
      true: {
        transition: 'background-color 200ms',
        cursor: 'pointer',
        selectors: {
          [`${zebraTable} &:hover`]: {
            backgroundColor: varsContract.color.primary100
          },
          '&:hover': {
            backgroundColor: varsContract.color.primary100
          }
        }
      },
      false: {}
    }
  }
});

export const sortableTableHeadStyles = style({
  transition: 'background-color 200ms ease, box-shadow 200ms ease, color 200ms ease',
  outline: 'none',
  selectors: {
    '&:hover': {
      color: varsContract.color.primary
    },
    '&:focus': {
      color: varsContract.color.primary
    },
    '&:focus-within': {
      color: varsContract.color.primary
    },
    '&.loading': {
      cursor: 'wait'
    }
  }
});

export type RowVariants = RecipeVariants<typeof rowRecipe>;
