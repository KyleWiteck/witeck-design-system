import { CSSProperties, style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { varsContract } from '../../theme/vars.css';

const baseStyles = style({
  transition: 'opacity 100ms'
});

export const textVariants = {
  inherit: {
    color: 'inherit',
    lineHeight: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: 'inherit',
    whiteSpace: 'inherit',
    textAlign: 'inherit'
  },
  display: {
    fontSize: `${varsContract?.fontSize?.['6xl']} !important`,
    lineHeight: varsContract?.lineHeight?.['5xl']
  },
  h1: {
    fontSize: `${varsContract?.fontSize?.['5xl']} !important`,
    lineHeight: varsContract?.lineHeight?.['sm']
  },
  h2: {
    fontSize: `${varsContract?.fontSize?.['4xl']} !important`,
    lineHeight: varsContract?.lineHeight?.['xs']
  },
  h3: {
    fontSize: `${varsContract?.fontSize?.['3xl']} !important`,
    lineHeight: varsContract?.lineHeight?.['md']
  },
  h4: {
    fontSize: `${varsContract?.fontSize?.['2xl']} !important`,
    lineHeight: varsContract?.lineHeight?.['3xl']
  },
  h5: {
    fontSize: `${varsContract?.fontSize?.['xl']} !important`,
    lineHeight: varsContract?.lineHeight?.['xl']
  },
  h6: {
    fontSize: `${varsContract?.fontSize?.['lg']} !important`,
    lineHeight: varsContract?.lineHeight?.['2xl']
  },
  subtitle1: {
    fontSize: `${varsContract?.fontSize?.['base']} !important`,
    lineHeight: varsContract?.lineHeight?.['6xl']
  },
  subtitle2: {
    fontSize: `${varsContract?.fontSize?.['sm']} !important`,
    lineHeight: varsContract?.lineHeight?.['2xl']
  },
  body1: {
    fontSize: `${varsContract?.fontSize?.['base']} !important`,
    lineHeight: varsContract?.lineHeight?.['lg']
  },
  body2: {
    fontSize: `${varsContract?.fontSize?.['sm']} !important`,
    lineHeight: varsContract?.lineHeight?.['4xl']
  },
  caption: {
    fontSize: `${varsContract?.fontSize?.['xs']} !important`,
    lineHeight: varsContract?.lineHeight?.['2xl']
  },
  micro: {
    fontSize: `${varsContract?.fontSize?.['2xs']} !important`,
    lineHeight: varsContract?.lineHeight?.['7xl']
  },
  label: {
    fontSize: `${varsContract?.fontSize?.sm} !important`,
    lineHeight: varsContract?.lineHeight?.['8xl'],
    fontWeight: varsContract?.fontWeight?.medium
  }
} satisfies Record<string, CSSProperties>;

export const textRecipe = recipe({
  // These styles cannot be overriden by by style props. If you need to
  // override/ customize these, pass`variant='custom'` to your Text
  // component to bypass this recipe.
  //
  // Note that this will be discouraged in most cases as we want to capture
  // all possible text styles and behaviors in this file. If you encounter
  // the need for ad-hoc styling, bring it up with the team or design lead
  // so it can be included here.
  base: baseStyles,
  variants: {
    variant: {
      ...textVariants,
      custom: {}
    }
  },

  compoundVariants: [],

  defaultVariants: { variant: 'custom' }
});

export type TextVariants = RecipeVariants<typeof textRecipe>;
