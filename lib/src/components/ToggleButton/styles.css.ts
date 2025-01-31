// !important: When migrated to the lib us varsContract instead of themeValues
import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme';

const focusIndicator = {
  outline: `1px solid ${varsContract.color.neutral300}`
};

export const radio = style({
  appearance: 'none',
  position: 'absolute',
  visibility: 'hidden'
});

export const buttonGroup = style({
  // !important: One off color by design
  backgroundColor: '#E0E3EE'
});

export const fullWidthGroup = style({
  flex: 1
});

export const labelContainer = style({
  display: 'inline-block',
  borderRadius: varsContract.borderRadius.base,
  selectors: {
    '&:focus-within': focusIndicator,
    '&:focus-visible': focusIndicator,
    [`${fullWidthGroup} &`]: {
      display: 'flex',
      flex: 'auto'
    }
  }
});

export const toggleButtonRecipe = recipe({
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
      },
      [`${fullWidthGroup} &`]: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingTop: varsContract.space['0.5'],
        paddingBottom: varsContract.space['0.5'],
        paddingLeft: varsContract.space['3'],
        paddingRight: varsContract.space['3']
      }
    },
    checked: {
      true: {
        color: varsContract.color.primary,
        backgroundColor: varsContract.color.white,
        borderColor: varsContract.color.border,
        pointerEvents: 'none'
      },
      false: {}
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export type ToggleButtonVariants = RecipeVariants<typeof toggleButtonRecipe>;
