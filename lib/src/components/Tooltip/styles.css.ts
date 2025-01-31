// tooltipStyles.ts
import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

import { themeValues } from '../../utils';

export const tooltipContainerHover = style({
  selectors: {
    '&:hover, &:focus': {
      ['.tooltip' as string]: {
        visibility: 'visible',
        opacity: 1
      }
    }
  }
});

export const tooltipContent = style({
  visibility: 'hidden',
  position: 'absolute',
  zIndex: themeValues.zIndex.tooltip,
  opacity: 0,
  transition: 'opacity 300ms'
});

export const tooltipRecipe = recipe({
  base: tooltipContent,
  variants: {
    side: {
      top: {
        bottom: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      bottom: {
        top: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      left: {
        top: '50%',
        right: 'calc(100% + 12px)',
        transform: 'translateY(-50%)'
      },
      right: {
        top: '50%',
        left: 'calc(100% + 12px)',
        transform: 'translateY(-50%)'
      }
    }
  },
  defaultVariants: {
    side: 'top'
  }
});

export type SwitchVariants = RecipeVariants<typeof tooltipRecipe>;

export const arrowPositionRecipe = recipe({
  base: {
    width: 'fitContent',
    height: 'fitContent',
    position: 'absolute'
  },
  variants: {
    side: {
      top: {
        bottom: '-14px',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      bottom: {
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)'
      },
      left: {
        top: '50%',
        right: '-10px',
        transform: 'translateY(-50%)'
      },
      right: {
        top: '50%',
        left: '-12px',
        transform: 'translateY(-50%)'
      }
    }
  },
  defaultVariants: {
    side: 'bottom'
  }
});

export type ArrowPositionVariants = RecipeVariants<typeof arrowPositionRecipe>;
