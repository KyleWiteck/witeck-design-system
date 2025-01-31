import { style } from '@vanilla-extract/css';

import { varsContract } from '../../theme';

const focusIndicator = {
  color: varsContract.color.primary400
};

export const tabButtonStyle = style({
  position: 'relative',
  paddingTop: varsContract.space['3'],
  paddingBottom: varsContract.space['3'],
  paddingLeft: varsContract.space['2'],
  paddingRight: varsContract.space['2'],
  fontSize: varsContract.fontSize.sm,
  fontWeight: varsContract.fontWeight.medium,
  fontFamily: varsContract.fontFamily.heading,
  borderTopLeftRadius: varsContract.borderRadius.base,
  borderTopRightRadius: varsContract.borderRadius.base,
  outline: '1px solid transparent',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      display: 'block',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: varsContract.color.primary,
      width: varsContract.space[0],
      transition: 'all 200ms',
      height: varsContract.space['0.5']
    },
    '&.active': {
      color: varsContract.color.primary,
      fontWeight: varsContract.fontWeight.semibold
    },
    '&:focus-within': focusIndicator,
    '&:focus-visible': focusIndicator,
    '&:hover': focusIndicator,
    '&.active::after': {
      width: varsContract.space.full
    },
    '&:disabled': {
      opacity: '1 !important', // almost transparent when opacity is 0.5
      color: varsContract.color.neutral400
    }
  }
});

export const badgeStyle = style({
  transition: 'all 200ms',
  backgroundColor: varsContract.color.neutral500,
  borderRadius: '1em',
  selectors: {
    [`${tabButtonStyle}:hover &`]: {
      backgroundColor: varsContract.color.primary400
    },
    [`${tabButtonStyle}.active &`]: {
      backgroundColor: varsContract.color.primary
    },
    [`${tabButtonStyle}:disabled &`]: {
      backgroundColor: varsContract.color.neutral400
    }
  }
});
