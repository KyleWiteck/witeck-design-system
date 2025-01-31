import { globalStyle } from '@vanilla-extract/css';

import { sprinkles } from './sprinkles.css';
import { varsContract } from './vars.css';

globalStyle('*', {
  fontFamily: 'Work Sans, sans-serif'
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontWeight: varsContract?.fontWeight.bold,
  fontStyle: 'normal',
  color: varsContract?.color.neutral800
});

globalStyle('html, body', {
  fontWeight: varsContract?.fontWeight.normal,
  fontStyle: 'normal',
  margin: 0,
  padding: 0,
  opacity: 1
});

globalStyle('a', {
  cursor: 'pointer'
});

globalStyle('body', {
  minHeight: '100vh',
  maxWidth: '100vw',
  color: varsContract?.color.neutral800
});

globalStyle('div', {
  borderColor: varsContract?.color.border,
  borderRadius: varsContract?.borderRadius.base
});

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  borderColor: varsContract.color.border
});

globalStyle(':focus', {
  outline: `2px solid ${varsContract.color.primary}`,
  borderRadius: varsContract.borderRadius.base
});

globalStyle('.react-target', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
});

globalStyle('::placeholder', {
  fontSize: '1em',
  color: varsContract?.color.neutral300
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer'
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  fontWeight: varsContract.fontWeight.medium
});

globalStyle('img', {
  '@media': {
    'screen and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm)': {
      imageRendering: '-webkit-optimize-contrast'
    },
    'not all and (min-resolution:.001dpcm)': {
      '@supports': {
        '(-webkit-appearance:none) and (stroke-color:transparent)': {
          imageRendering: 'unset'
        }
      }
    }
  }
});

// hides number arrows (spinners) added by browser
globalStyle('input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button', {
  WebkitAppearance: 'none',
  margin: 0
});

// Firefox scrollbar styling does not work with scrollbar webkit at the time of implementation.
/* General scrollbar styles */
globalStyle('::-webkit-scrollbar', {
  width: varsContract.space['3.25'],
  height: varsContract.space['3.25']
});

/* Track */
globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: '#F9F9F9',
  borderLeft: '1px solid #E2E2E2'
});

/* Handle */
globalStyle('::-webkit-scrollbar-thumb', {
  background: varsContract.color['neutral400'],
  borderRadius: '7px',
  border: '3px solid transparent',
  backgroundClip: 'content-box'
});

/* Handle on hover */
globalStyle('::-webkit-scrollbar-thumb:hover', {
  background: varsContract.color['neutral500'],
  borderRadius: '7px',
  border: '3px solid transparent',
  backgroundClip: 'content-box'
});

export const appClass = sprinkles({});
