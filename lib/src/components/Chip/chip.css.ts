import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';

const baseStyles = style({
  appearance: 'none',
  userSelect: 'none',
  transition: 'all 200ms',

  textTransform: 'capitalize',
  fontWeight: 'semibold'
});

export const chipColorVariants = {
  default: {
    borderColor: varsContract.color.border,
    color: varsContract.color.black,
    backgroundColor: varsContract.color.white
  },
  yellow: {
    borderColor: varsContract.color.warningLight,
    color: varsContract.color.black,
    backgroundColor: varsContract.color.warningTint
  },
  red: {
    borderColor: varsContract.color.errorLight,
    color: varsContract.color.black,
    backgroundColor: varsContract.color.errorTint
  },
  cyan: {
    borderColor: varsContract.color.infoLight,
    color: varsContract.color.black,
    backgroundColor: varsContract.color.infoTint
  },
  indigo: {
    borderColor: varsContract.color.neutral300,
    color: varsContract.color.black,
    backgroundColor: varsContract.color.neutral200
  },
  green: {
    borderColor: varsContract.color.successLight,
    color: varsContract.color.black,
    backgroundColor: varsContract.color.successTint
  },
  active: {
    borderColor: varsContract.color.primary,
    color: varsContract.color.primary,
    backgroundColor: varsContract.color.primary100
  },
  error: {
    borderColor: varsContract.color.error,
    color: varsContract.color.error,
    backgroundColor: varsContract.color.errorTint
  },
  disabled: {
    cursor: 'default',
    borderColor: varsContract.color.neutral300,
    color: varsContract.color.neutral400,
    backgroundColor: varsContract.color.neutral200
  },
  custom: {}
};

export type ChipColorVariants = keyof typeof chipColorVariants;

export const chipRecipe = recipe({
  base: [baseStyles],

  variants: {
    color: chipColorVariants,
    isButton: {
      true: {
        cursor: 'pointer',
        ':hover': {
          borderColor: varsContract.color.neutral200,
          color: varsContract.color.black,
          backgroundColor: varsContract.color.neutral100
        },
        ':focus': {
          borderColor: varsContract.color.neutral200,
          color: varsContract.color.black,
          backgroundColor: varsContract.color.neutral100
        },
        ':active': {
          borderColor: varsContract.color.primary,
          color: varsContract.color.primary,
          backgroundColor: varsContract.color.primary100
        },
        ':disabled': {
          cursor: 'default',
          borderColor: varsContract.color.neutral300,
          color: varsContract.color.neutral400,
          backgroundColor: varsContract.color.neutral200
        }
      }
    }
  },

  defaultVariants: {
    color: 'default'
  }
});

export type ChipVariants = RecipeVariants<typeof chipRecipe>;
