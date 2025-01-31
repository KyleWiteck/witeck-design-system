import { createTheme, createThemeContract } from '@vanilla-extract/css';

import { baseThemeToken } from '../utils';

export const varsContract = createThemeContract(baseThemeToken);

/**
 * Standard theme variables for internal use.
 */
export const internalVars = {
  color: {
    /** Placeholder color for Input, Select, Textarea, and similars  */
    placeholder: varsContract.color.neutral300
  }
} as const;

export const themeClass = createTheme<typeof varsContract>(varsContract, baseThemeToken);
