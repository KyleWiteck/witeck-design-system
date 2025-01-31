import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';

export const wrapper = style({});

export const indicator = style({
  outline: 'unset',
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': {
      cursor: 'not-allowed'
    },
    '&:focus': {}
  }
});

export const label = style({
  outline: 'unset',
  userSelect: 'none',
  cursor: 'pointer',
  selectors: {
    '&.disabled': {
      cursor: 'not-allowed',
      color: varsContract.color.neutral500
    }
  }
});

export const iconRecipe = recipe({
  base: {
    display: 'none',
    outline: 'none !important',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'border-color 200ms',
    cursor: 'pointer',
    color: varsContract.color.neutral400,
    selectors: {
      [`${indicator}[data-state="checked"] &.checked-icon`]: {
        display: 'block',
        color: varsContract.color.primary
      },
      [`${indicator}[data-state="unchecked"] &.blank-icon`]: {
        display: 'block'
      },
      [`${indicator}[data-state="indeterminate"] &.indeterminate-icon`]: {
        display: 'block',
        color: varsContract.color.primary
      },
      [`${wrapper}:hover &`]: {
        color: `${varsContract.color.primary400} !important`
      },
      [`${indicator}:focus-visible &`]: {
        color: varsContract.color.primary400
      },
      [`${indicator}[data-disabled] &`]: {
        color: `${varsContract.color.neutral300} !important`
      }
    }
  },
  variants: {
    hasError: {
      true: {
        color: varsContract.color.error
      },
      false: {}
    }
  },
  defaultVariants: {
    hasError: false
  }
});

export type IconVariants = RecipeVariants<typeof iconRecipe>;
