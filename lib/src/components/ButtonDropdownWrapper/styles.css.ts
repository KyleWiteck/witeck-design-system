import { keyframes, style } from '@vanilla-extract/css';

const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-2px)'
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)'
  }
});

const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(2px)'
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)'
  }
});

const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)'
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)'
  }
});

const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-2px)'
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)'
  }
});

export const dropdownMenuContent = style({
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  selectors: {
    '&[data-side="top"]': {
      animationName: slideDownAndFade
    },
    '&[data-side="right"]': {
      animationName: slideLeftAndFade
    },
    '&[data-side="bottom"]': {
      animationName: slideUpAndFade
    },
    '&[data-side="left"]': {
      animationName: slideRightAndFade
    }
  }
});
