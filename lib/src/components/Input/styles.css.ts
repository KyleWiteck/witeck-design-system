import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';

/** Icon size to width props mapping, should be used in style-props only */
export const iconSizePropsMapping = {
  sm: { width: '6' },
  md: { width: '7' },
  lg: { width: '8' },
  custom: {}
};

export const inputSizes = {
  sm: {
    fontSize: varsContract?.fontSize.sm,
    minHeight: varsContract?.space['9']
  },
  md: {
    fontSize: varsContract?.fontSize.base,
    minHeight: varsContract?.space['11']
  },
  lg: {
    fontSize: varsContract?.fontSize.base,
    minHeight: varsContract?.space['13']
  },
  custom: {}
};

export const inputRecipe = recipe({
  base: {
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    fontFamily: varsContract?.fontFamily.body,
    display: 'flex',
    appearance: 'none',
    whiteSpace: 'nowrap',
    margin: 0,
    borderRadius: varsContract.borderRadius.base,
    '::placeholder': {
      color: varsContract?.color.neutral300
    }
  },

  variants: {
    variant: {
      outlined: {
        background: varsContract?.color.white,
        border: `${varsContract?.border['1px']} ${varsContract?.color.border}`,
        selectors: {
          '&': {
            boxShadow: `0 0 0 1px ${varsContract?.color.border};`
          },
          '&:not(:disabled)': {
            backgroundColor: varsContract?.color.white
          },
          '&:invalid:not(:disabled)': {
            boxShadow: `0 0 0 2px ${varsContract?.color.error};`
          },
          '&:hover:not(:disabled):not(:focus)': {
            boxShadow: `0 0 0 2px ${varsContract?.color.primary200};`
          },
          '&:focus:not(:disabled)': {
            boxShadow: `0 0 0 2px ${varsContract?.color.primary};`,
            outline: 'none'
          }
        }
      },
      ghosted: {
        border: 'none',
        background: 'transparent'
      },
      custom: {}
    },
    size: inputSizes,
    hasError: {
      true: {
        selectors: {
          '&:not(:disabled):not(read-only)': {
            border: `${varsContract?.border['2px']} ${varsContract?.color.error} !important`
          }
        }
      },
      false: {}
    },
    disabled: {
      true: {
        boxShadow: `0 0 0 2px ${varsContract?.color.border};`,
        background: `${varsContract?.color.neutral100} !important`,
        cursor: 'not-allowed'
      }
    },
    readOnly: {
      true: {
        border: `none`,
        background: varsContract?.color.transparent
      }
    }
  },

  defaultVariants: {
    variant: 'outlined',
    size: 'md'
  }
});

export type InputVariants = RecipeVariants<typeof inputRecipe>;
