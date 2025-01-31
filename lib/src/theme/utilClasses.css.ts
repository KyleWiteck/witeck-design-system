import { keyframes, style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const rotate180Recipe = recipe({
  base: { transition: 'transform 300ms ease' },
  variants: {
    isOpen: {
      true: { transform: `rotate(180deg)` },
      false: { transform: `rotate(0deg)` }
    }
  },

  defaultVariants: {
    isOpen: false
  }
});

export type ButtonDropdownWrapperRecipeVariants = RecipeVariants<typeof rotate180Recipe>;

const expandTransitionMaker = (ms: number) =>
  `max-height ${ms}ms ease, max-height ${ms}ms ease, visibility ${ms}ms ease`;

export const expandRecipe = recipe({
  base: {},
  variants: {
    ms: {
      200: { transition: expandTransitionMaker(200) },
      300: { transition: expandTransitionMaker(300) },
      400: { transition: expandTransitionMaker(400) }
    },
    isOpen: {
      true: { minHeight: undefined, maxHeight: undefined, opacity: 1, visibility: 'visible' },
      false: {
        minHeight: 0 + ' !important',
        maxHeight: 0 + ' !important',
        opacity: 0 + ' !important',
        visibility: 'hidden',
        paddingTop: 0 + ' !important',
        paddingBottom: 0 + ' !important'
      }
    }
  },

  defaultVariants: {
    isOpen: false,
    ms: 300
  }
});

export type expandRecipeVariants = RecipeVariants<typeof expandRecipe>;

export const shimmer = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
    backgroundColor: 'hsl(200, 20%, 80%)'
  },
  '100%': {
    transform: 'translateX(100%)',
    backgroundColor: 'hsl(200, 20%, 80%)'
  }
});

export const accessiblyHidden = style({
  position: 'absolute',
  width: '1px !important',
  height: '1px !important',
  margin: '-1px !important',
  border: '0 !important',
  padding: '0 !important',
  overflow: 'hidden !important',
  clip: 'rect(0 0 0 0) !important',
  clipPath: 'inset(50%) !important',
  whiteSpace: 'nowrap !important'
});
