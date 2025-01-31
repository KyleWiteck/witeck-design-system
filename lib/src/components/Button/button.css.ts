import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';
import { colors, hexToRgbA } from '../../utils';

// Some defaults are enforced in apps/react/lib/src/theme/globals.css.ts
const baseStyles = style({
  appearance: 'none',
  userSelect: 'none',
  transition: 'all 200ms',
  cursor: 'pointer',
  textTransform: 'capitalize',
  fontWeight: 'semibold',
  fontFamily: varsContract?.fontFamily?.body
});

const sharedVariantHovers = {
  primary: {
    backgroundColor: varsContract?.color.primary400
  },
  outlined: {
    backgroundColor: varsContract?.color.primary100,
    color: varsContract?.color.primary400,
    borderColor: varsContract?.color.primary400
  },
  text: {
    backgroundColor: varsContract?.color.primary100,
    color: varsContract?.color.primary400
  },
  round: {
    backgroundColor: varsContract?.color.primary100,
    color: varsContract?.color.primary400
  },
  errorText: {
    backgroundColor: varsContract?.color.errorTint,
    color: varsContract?.color.error
  },
  error: {
    backgroundColor: varsContract?.color.errorLight
  },
  errorOutlined: {
    backgroundColor: varsContract?.color.errorTint
  },
  nav: {
    backgroundColor: varsContract?.color.primary100
  },
  subNav: {
    backgroundColor: varsContract?.color.white
  },
  link: {
    color: varsContract?.color.primary400
  }
};

type VariantKeys =
  | 'primary'
  | 'outlined'
  | 'text'
  | 'errorText'
  | 'error'
  | 'errorOutlined'
  | 'nav'
  | 'subNav'
  | 'link'
  | 'round'
  | 'custom';

type ButtonVariantStyles = {
  [key in VariantKeys]: Record<string, string>;
};

function addImportantSuffix(obj: typeof sharedVariantHovers): ButtonVariantStyles {
  const result: ButtonVariantStyles = {} as ButtonVariantStyles;

  for (const [key, value] of Object.entries(obj)) {
    const updatedValue: Record<string, string> = {};

    for (const [prop, propValue] of Object.entries(value)) {
      updatedValue[prop] = `${propValue} !important`;
    }

    result[key as VariantKeys] = updatedValue;
  }

  return result;
}

export const buttonRecipe = recipe({
  base: [baseStyles],

  variants: {
    padding: {
      sm: {
        paddingLeft: varsContract?.space['4'],
        paddingRight: varsContract?.space['4'],
        paddingTop: varsContract?.space['2.5'],
        paddingBottom: varsContract?.space['2.5']
      },
      smIcon: {
        paddingLeft: varsContract?.space['3'],
        paddingRight: varsContract?.space['3'],
        paddingTop: varsContract?.space['2'],
        paddingBottom: varsContract?.space['2']
      },
      md: {
        paddingLeft: varsContract?.space['4'],
        paddingRight: varsContract?.space['4'],
        paddingTop: varsContract?.space['3'],
        paddingBottom: varsContract?.space['3']
      },
      mdIcon: {
        paddingLeft: varsContract?.space['3'],
        paddingRight: varsContract?.space['3'],
        paddingTop: varsContract?.space['3'],
        paddingBottom: varsContract?.space['3']
      },
      lg: {
        paddingLeft: varsContract?.space['4'],
        paddingRight: varsContract?.space['4'],
        paddingTop: varsContract?.space['3'],
        paddingBottom: varsContract?.space['3']
      },
      lgIcon: {
        paddingLeft: varsContract?.space['3'],
        paddingRight: varsContract?.space['3'],
        paddingTop: varsContract?.space['3'],
        paddingBottom: varsContract?.space['3']
      },
      square: {
        paddingLeft: varsContract?.space['2.5'],
        paddingRight: varsContract?.space['2.5'],
        paddingTop: varsContract?.space['2.5'],
        paddingBottom: varsContract?.space['2.5']
      },
      round: {
        paddingLeft: varsContract?.space['2.5'],
        paddingRight: varsContract?.space['2.5'],
        paddingTop: varsContract?.space['2.5'],
        paddingBottom: varsContract?.space['2.5']
      },
      custom: {}
    },
    size: {
      sm: {
        height: varsContract?.space['9'],
        fontSize: varsContract?.fontSize['sm']
      },
      md: {
        height: varsContract?.space['10'],
        fontSize: varsContract?.fontSize['base']
      },
      lg: {
        height: varsContract?.space['12'],
        fontSize: varsContract?.fontSize['base']
      },
      square: {
        fontSize: 'inherit',
        padding: varsContract.space['0']
      },
      link: { height: varsContract.space['11'], width: varsContract.space['11'], padding: varsContract.space['0'] },
      round: {},
      custom: {}
    },
    highlighted: {
      ...addImportantSuffix(sharedVariantHovers),
      nav: {
        ...addImportantSuffix(sharedVariantHovers).nav,
        color: varsContract?.color.primary + '!important',
        fontWeight: varsContract?.fontWeight.medium + '!important'
      },
      subNav: {
        ...addImportantSuffix(sharedVariantHovers).subNav,
        color: varsContract?.color.primary + '!important',
        fontWeight: varsContract?.fontWeight.medium + '!important'
      }
    },
    variant: {
      primary: {
        backgroundColor: varsContract?.color.primary,
        color: varsContract?.color.white,
        ':hover': {
          ...sharedVariantHovers?.primary
        },
        ':active': { backgroundColor: varsContract?.color.primary800, outlineColor: varsContract?.color.primary300 },
        ':focus': { outlineColor: varsContract?.color.primary300 },
        ':disabled': {
          cursor: 'default',
          backgroundColor: varsContract?.color.neutral400,
          color: varsContract?.color.neutral200
        }
      },
      outlined: {
        backgroundColor: varsContract?.color.white,
        border: varsContract?.border['2px'],
        borderColor: varsContract?.color.primary,
        color: varsContract?.color.primary,
        ':hover': {
          ...sharedVariantHovers?.outlined
        },
        ':active': { backgroundColor: varsContract?.color.primary200 },
        ':focus': {
          backgroundColor: varsContract?.color.primary100
        },
        ':disabled': {
          backgroundColor: varsContract?.color.white,
          color: varsContract?.color.neutral400,
          borderColor: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      text: {
        color: varsContract?.color.primary,
        ':hover': {
          ...sharedVariantHovers?.text
        },
        ':active': { backgroundColor: varsContract?.color.primary200, color: varsContract?.color.primary500 },
        ':focus': { backgroundColor: varsContract?.color.primary100, color: varsContract?.color.primary500 },
        ':disabled': {
          backgroundColor: varsContract?.color.white,
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      round: {
        color: varsContract?.color.primary,
        borderRadius: `${varsContract?.borderRadius.full} !important`,
        ':hover': {
          ...sharedVariantHovers?.text,
          borderRadius: varsContract?.borderRadius.full
        },
        ':active': {
          backgroundColor: varsContract?.color.primary200,
          color: varsContract?.color.primary500
        },
        ':focus': {
          backgroundColor: varsContract?.color.primary100,
          color: varsContract?.color.primary500
        },
        ':disabled': {
          backgroundColor: varsContract?.color.white,
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      errorText: {
        color: varsContract?.color.error,
        ':hover': {
          ...sharedVariantHovers?.errorText
        },
        ':active': {
          backgroundColor: varsContract?.color.errorLight,
          color: varsContract?.color.error
        },
        ':focus': {
          backgroundColor: varsContract?.color.errorTint,
          color: varsContract?.color.error
        },
        ':disabled': {
          backgroundColor: varsContract?.color.white,
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      error: {
        backgroundColor: varsContract?.color.error,
        color: varsContract?.color.white,
        ':hover': {
          ...sharedVariantHovers?.error
        },
        ':active': { backgroundColor: varsContract?.color.errorDark },
        ':focus': { backgroundColor: varsContract?.color.error },
        ':disabled': {
          backgroundColor: varsContract?.color.transparent,
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      errorOutlined: {
        backgroundColor: 'white',
        border: varsContract?.border['2px'],
        borderColor: varsContract?.color.error,
        color: varsContract?.color.error,
        ':hover': {
          ...sharedVariantHovers?.errorOutlined
        },
        ':active': {
          backgroundColor: varsContract?.color.errorLight,
          color: varsContract?.color.error,
          borderColor: varsContract?.color.error
        },
        ':focus': {
          backgroundColor: varsContract?.color.errorTint,
          color: varsContract?.color.errorLight,
          borderColor: varsContract?.color.errorLight
        },
        ':disabled': {
          backgroundColor: varsContract?.color.transparent,
          color: hexToRgbA(colors.error, 0.6) ?? colors.neutral500,
          borderColor: hexToRgbA(colors.error, 0.6) ?? colors.neutral500,
          cursor: 'default'
        }
      },
      nav: {
        backgroundColor: varsContract?.color.white,
        color: varsContract?.color.black,
        fontWeight: varsContract?.fontWeight?.normal,
        ':hover': {
          ...sharedVariantHovers?.nav
        },
        ':active': { backgroundColor: varsContract?.color.primary200, color: varsContract?.color.primary500 },
        ':focus': { backgroundColor: varsContract?.color.primary100, color: varsContract?.color.primary500 },
        ':disabled': {
          backgroundColor: varsContract?.color.white,
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      subNav: {
        backgroundColor: varsContract?.color.white,
        color: varsContract?.color.black,
        fontWeight: varsContract?.fontWeight?.normal,
        ':hover': {
          ...sharedVariantHovers?.nav
        },
        ':active': { color: varsContract?.color.primary500 },
        ':focus': { color: varsContract?.color.primary500 },
        ':disabled': {
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      link: {
        backgroundColor: 'transparent',
        textTransform: 'inherit',
        height: varsContract?.space.auto,
        padding: 0,
        color: varsContract?.color.primary,
        textDecoration: 'underline',
        ':hover': {
          ...sharedVariantHovers?.link
        },
        ':active': { color: varsContract?.color.primary500 },
        ':focus': { color: varsContract?.color.primary500 },
        ':disabled': {
          color: varsContract?.color.neutral400,
          cursor: 'default'
        }
      },
      custom: {}
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

// These styles are applied when passing `custom` to the Button's `variant` prop.
// This allows for some base styling as well as customization of hover, focus, active, etc.
export const buttonInvariant = style([
  baseStyles
  // {
  //   '&:hover': {
  //     opacity: 0.65,
  //   },
  // },
]);

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
