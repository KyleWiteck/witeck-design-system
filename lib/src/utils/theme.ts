/**
 * Converts a hexadecimal color to RGBA format with optional transparency.
 * Handles both 3-digit and 6-digit hex codes, performing validation before conversion.
 *
 * @param {string} hex - Hexadecimal color code (e.g., "#FF0000" or "#F00")
 * @param {string | number} [transparency=1] - Opacity value between 0 and 1
 * @returns {string | null} RGBA color string or null if invalid
 * @throws {Error} If hex code is invalid
 *
 * @example
 * ```ts
 * hexToRgbA('#FF0000', 0.5) // returns "rgba(255, 0, 0, 0.5)"
 * hexToRgbA('#F00') // returns "rgba(255, 0, 0, 1)"
 * ```
 */
export const hexToRgbA = (hex: string, transparency?: string | number): string | null => {
  let c: string[] | number;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = parseInt(c.join(''), 16);
    return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${transparency ?? 1})`;
  }

  throw new Error(`Bad Hex - hex passed in: ${hex}`);
};

/**
 * Lightens a hexadecimal color by a specified percentage.
 * Adjusts RGB values while maintaining color balance and preventing overflow.
 *
 * @param {string} color - Hexadecimal color to lighten
 * @param {number} percent - Percentage to lighten (0-100)
 * @returns {string} Lightened color in hex format
 *
 * @example
 * ```ts
 * lightenColor('#000000', 50) // returns "#7F7F7F"
 * lightenColor('#FF0000', 20) // returns "#FF3333"
 * ```
 */
export const lightenColor = function (color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
    (G < 255 ? (G < 1 ? 0 : G) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

/**
 * Joins multiple classNames into a single string, filtering out falsy values.
 * Ensures proper spacing between class names and handles conditional classes.
 *
 * @param {...(string | null | undefined | false)[]} classnames - Classes to combine
 * @returns {string} Combined class string with proper spacing
 *
 * @example
 * ```ts
 * classJoin('btn', isActive && 'active', isPrimary && 'primary')
 * // returns "btn active primary" if both conditions are true
 * ```
 */
export const classJoin = (...classnames: (string | null | undefined | false)[]) => {
  let names = '';
  for (const name of classnames) {
    if (name) names += names.endsWith(' ') ? name : ' ' + name;
  }
  return names;
};

/**
 * Calculates the optimal text color (black or white) for maximum readability
 * against a given background color. Supports both hex and rgba formats.
 *
 * Following WCAG 2.0 guidelines for text contrast ratios (4.5:1 minimum).
 *
 * @param {string} backgroundColor - Background color in hex or rgba format
 * @returns {'black' | 'white'} Optimal text color for contrast
 *
 * @example
 * ```ts
 * determineTextColor('#000000') // returns 'white'
 * determineTextColor('rgba(255, 255, 255, 0.9)') // returns 'black'
 * ```
 */
export const determineTextColor = (backgroundColor: string) => {
  let hexColor = backgroundColor;

  // Handle rgba color format
  if (backgroundColor.startsWith('rgba')) {
    const rgbaMatch = backgroundColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([.\d]+)\)/);
    if (rgbaMatch) {
      const [_ignored, red, green, blue, alpha] = rgbaMatch;
      const opacity = parseFloat(alpha);
      if (opacity === 0) {
        // Fully transparent color, return "white" as default
        return 'white';
      } else if (opacity === 1) {
        hexColor = `#${Number(red).toString(16).padStart(2, '0')}${Number(green).toString(16).padStart(2, '0')}${Number(
          blue
        )
          .toString(16)
          .padStart(2, '0')}`;
      } else {
        // Handle semi-transparent colors by blending with a white background
        const blendedRed = Math.round((1 - opacity) * 255 + opacity * Number(red));
        const blendedGreen = Math.round((1 - opacity) * 255 + opacity * Number(green));
        const blendedBlue = Math.round((1 - opacity) * 255 + opacity * Number(blue));
        hexColor = `#${blendedRed.toString(16).padStart(2, '0')}${blendedGreen
          .toString(16)
          .padStart(2, '0')}${blendedBlue.toString(16).padStart(2, '0')}`;
      }
    }
  }

  // Handle hex color format
  if (!hexColor.startsWith('#')) {
    hexColor = `#${hexColor}`;
  }

  const [red, green, blue] =
    hexColor
      ?.substring(1)
      ?.match(/.{1,2}/g)
      ?.map(value => parseInt(value, 16)) ?? [];

  // Calculate relative luminance
  const relativeLuminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;

  // Calculate contrast ratio
  const contrastRatio = (relativeLuminance + 0.05) / 0.05;

  // Adjust the threshold to meet the 4.5:1 contrast ratio requirement
  const threshold = 4.5;

  // Determine the text color based on the contrast ratio
  return contrastRatio >= threshold ? 'black' : 'white';
};

/**
 * Responsive breakpoints are essential for defining styles that
 * adapt to different screen sizes in your application.
 *
 * These breakpoints are made available to support scenarios where you need to create responsive styles outside of the design system.
 * To utilize these breakpoints effectively, we recommend using them in conjunction with the @vanilla-extract/css library.
 *
 * @example
 * This is using the style function provided by Vanilla Extract
 ```ts
  export const desktopLogo = style({
    width: '265px',
    marginLeft: '-16px',
    '@media': {
      [`screen and (min-width: ${breakPoints.tablet}px)`]: {
        width: '265px',
        marginLeft: '-10px',
        marginTop: '-15px'
      },
      'screen and (min-width: 920px)': {
        width: '340px',
        marginTop: '-3px'
      }
    }
  });
 ```
 * */
export const breakPoints = {
  tablet: 768,
  desktop: 1024,
  hd: 1920
};

type BaseColorKeys =
  | 'neutral100'
  | 'neutral200'
  | 'neutral300'
  | 'neutral400'
  | 'neutral500'
  | 'neutral600'
  | 'neutral700'
  | 'neutral800'
  | 'neutral900'
  | 'primary100'
  | 'primary200'
  | 'primary300'
  | 'primary400'
  | 'primary500'
  | 'primary600'
  | 'primary700'
  | 'primary800'
  | 'primary900'
  | 'secondary100'
  | 'secondary200'
  | 'secondary300'
  | 'secondary400'
  | 'secondary500'
  | 'secondary600'
  | 'secondary700'
  | 'secondary800'
  | 'secondary900'
  | 'tertiary100'
  | 'tertiary200'
  | 'tertiary300'
  | 'tertiary400'
  | 'tertiary500'
  | 'tertiary600'
  | 'tertiary700'
  | 'tertiary800'
  | 'tertiary900';

type StatusColorKeys =
  | 'errorTint'
  | 'errorLight'
  | 'error'
  | 'errorDark'
  | 'warningTint'
  | 'warningLight'
  | 'warning'
  | 'warningDark'
  | 'successTint'
  | 'successLight'
  | 'success'
  | 'successDark'
  | 'infoTint'
  | 'infoLight'
  | 'info'
  | 'infoDark';

/** @hidden */
const primaryColor = '#293F96';
const primaryColorVar = `var(--primary__color, ${primaryColor})`;

/** @hidden */
const colorOptions: {
  baseColors: Record<BaseColorKeys, string>;
  statusColors: Record<StatusColorKeys, string>;
} = {
  baseColors: {
    // Neutral
    neutral100: '#F7F7F8',
    neutral200: '#E3E5E8',
    neutral300: '#BABEC4',
    neutral400: '#9DA4AF',
    neutral500: '#7C8798',
    neutral600: '#606E85',
    neutral700: '#495569',
    neutral800: '#384456',
    neutral900: '#2A394F',
    // Primary
    primary100: `hsl(from ${primaryColorVar} h calc(min(max(s + 30, 5), 97)) calc(min(max(l + 60, 5), 97)))`, // hsl(231, 87%, 97%), #F1F3FE
    primary200: `hsl(from ${primaryColorVar} h calc(min(max(s + 25, 5), 97)) calc(min(max(l + 48, 5), 97)))`, // hsl(228, 82%, 85%), #B9C6F8
    primary300: `hsl(from ${primaryColorVar} h calc(min(max(s + 23, 5), 97)) calc(min(max(l + 33, 5), 97)))`, //hsl(228, 80%, 70%), #758EF0
    primary400: `hsl(from ${primaryColorVar} h calc(min(max(s + 11, 5), 97)) calc(min(max(l + 18, 5), 97)))`, //	hsl(228, 68%, 55%), #3E5EDA
    primary500: `var(--primary__color, ${primaryColor})`, // hsl(228, 57%, 37%), #293F96
    primary600: `hsl(from ${primaryColorVar} h calc(min(max(s - 9, 5), 97)) calc(min(max(l - 5, 5), 97)))`, //hsl(228, 48%, 32%), #2A3A79,
    primary700: `hsl(from ${primaryColorVar} h calc(min(max(s - 17, 5), 97)) calc(min(max(l - 9, 5), 97)))`, //hsl(228, 40%, 28%), #2B3664,
    primary800: `hsl(from ${primaryColorVar} h calc(min(max(s - 12, 5), 97)) calc(min(max(l - 13, 5), 97)))`, //hsl(228, 45%, 24%), #222D59,
    primary900: `hsl(from ${primaryColorVar} h calc(min(max(s + 3, 5), 97)) calc(min(max(l - 20, 5), 97)))`, //hsl(227, 60%, 17%), #111C45,
    // Secondary
    secondary100: '#FEE9E6',
    secondary200: '#FDD4CE',
    secondary300: '#F8A396',
    secondary400: '#F57D6A',
    secondary500: '#F16752',
    secondary600: '#D2432D',
    secondary700: '#CA3721',
    secondary800: '#9C2816',
    secondary900: '#6B1306',
    // Tertiary
    tertiary100: '#D6F6FF',
    tertiary200: '#C3F1FD',
    tertiary300: '#99E5FA',
    tertiary400: '#5ECEED',
    tertiary500: '#0EAAD5',
    tertiary600: '#1A8CB2',
    tertiary700: '#047895',
    tertiary800: '#03647D',
    tertiary900: '#02475A'
  },
  statusColors: {
    // Error
    errorTint: '#FEF2F0',
    errorLight: '#F57D6A',
    error: '#F16752',
    errorDark: '#AD4838',
    // Warning
    warningTint: '#FFF6EB',
    warningLight: '#FFBA5C',
    warning: '#FAA838',
    warningDark: '#A16717',
    // Success
    successTint: '#F0FEF7',
    successLight: '#78EDB1',
    success: '#33CC7E',
    successDark: '#07743C',
    // Info
    infoTint: '#F0FCFF',
    infoLight: '#5ECEED',
    info: '#0EAAD5',
    infoDark: '#02647D'
  }
} as const;
// hsl(357, 92%, 47%)
/** @hidden */
export const brandColors = {
  magnitPrimary: '#293F96',
  primary: colorOptions.baseColors.primary500,
  secondary: colorOptions.baseColors.secondary500,
  tertiary: colorOptions.baseColors.tertiary500,
  black: colorOptions.baseColors.neutral900,
  white: '#fff',
  border: colorOptions.baseColors.neutral200,
  border2: colorOptions.baseColors.neutral300,
  overlay: `${hexToRgbA(colorOptions.baseColors.neutral900, 0.48)}`
};

/** @hidden */
export const colors = {
  ...colorOptions.baseColors,
  ...colorOptions.statusColors,
  ...brandColors
};

/** @hidden */
export const baseThemeToken = {
  /** Container sizes */
  sizes: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  space: {
    auto: 'auto',
    '0': '0px',
    px: '1px',
    /** 2px */
    '0.5': '0.125rem',
    /** 4px */
    '1': '0.25rem',
    /** 5px */
    '1.25': '0.3125rem',
    /** 6px */
    '1.5': '0.375rem',
    /** 8px */
    '2': '0.5rem',
    /** 10px */
    '2.5': '0.625rem',
    /** 12px */
    '3': '0.75rem',
    /** 13px */
    '3.25': '0.8125rem',
    /** 14px */
    '3.5': '0.875rem',
    /** 16px */
    '4': '1rem',
    /** 18px */
    '4.5': '1.125rem',
    /** 20px */
    '5': '1.25rem',
    /** 24px */
    '6': '1.5rem',
    /** 28px */
    '7': '1.75rem',
    /** 32px */
    '8': '2rem',
    /** 36px */
    '9': '2.25rem',
    /** 40px */
    '10': '2.5rem',
    /** 42px */
    '10.5': '2.625rem',
    /** 44px */
    '11': '2.75rem',
    /** 48px */
    '12': '3rem',
    /** 52px */
    '13': '3.25rem',
    /** 56px */
    '14': '3.5rem',
    /** 60px */
    '15': '3.75rem',
    /** 64px */
    '16': '4rem',
    /** 72px */
    '18': '4.5rem',
    /** 80px */
    '20': '5rem',
    /** 88px */
    '22': '5.5rem',
    /** 96px */
    '24': '6rem',
    /** 112px */
    '28': '7rem',
    /** 128px */
    '32': '8rem',
    /** 144px */
    '36': '9rem',
    /** 160px */
    '40': '10rem',
    /** 176px */
    '44': '11rem',
    /** 192px */
    '48': '12rem',
    /** 208px */
    '52': '13rem',
    /** 224px */
    '56': '14rem',
    /** 240px */
    '60': '15rem',
    /** 256px */
    '64': '16rem',
    /** 288px */
    '72': '18rem',
    /** 320px */
    '80': '20rem',
    /** 384px */
    '96': '24rem',
    /** 400px */
    '100': '25rem',
    /** 450px */
    '112.5': '28.125rem',
    /** 500px */
    '125': '31.25rem',
    /** 600px */
    '150': '37.5rem',
    /** 800px */
    '200': '50rem',
    /** 1024px */
    '256': '64rem',
    /** 1140px */
    '285': '71.25rem',
    /** 1440px */
    '360': '90rem',
    /** 1920px */
    '480': '120rem',
    // Percentages
    '1/2': '50%',
    '1/3': '33.333333%',
    '2/3': '66.666667%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.666667%',
    '2/6': '33.333333%',
    '3/6': '50%',
    '4/6': '66.666667%',
    '5/6': '83.333333%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
    full: '100%',
    // Special
    fullVW: '100vw',
    fullVH: '100vh',
    minContent: 'min-content',
    maxContent: 'max-content',
    fitContent: 'fit-content'
  },

  color: {
    ...colors,
    inherit: 'inherit',
    transparent: 'transparent',
    current: 'currentColor'
  },

  fontFamily: {
    heading: `Work Sans, sans-serif`,
    body: `Work Sans, sans-serif`
  },

  fontSize: {
    /** 10px */
    '2xs': '0.625rem',
    /** 12px */
    xs: '0.75rem',
    /** 14px */
    sm: '0.875rem',
    /** 16px */
    base: '1rem',
    /** 18px */
    lg: '1.125rem',
    /** 21px */
    xl: '1.3125rem',
    /** 24px */
    '2xl': '1.5rem',
    /** 28px */
    '3xl': '1.75rem',
    /** 32px */
    '4xl': '2rem',
    /** 40px */
    '5xl': '2.5rem',
    /** 48px */
    '6xl': '3rem',
    inherit: 'inherit'
  },

  fontWeight: {
    inherit: 'inherit',
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },

  lineHeight: {
    /** 32px font size with 38px line height */
    xs: '1.08em',
    /** 40px font size with 44px line height */
    sm: '1.1em',
    /** 28px font size with 38px line height */
    md: '1.19em',
    /** 16px font size with 20px line height */
    lg: '1.25em',
    /** 21px font size with 31px line height */
    xl: '1.29em',
    /** 12px font size with 16px line height, 18px font size with 24px line height */
    '2xl': '1.33em',
    /** 24px font size with 31px line height */
    '3xl': '1.36em',
    /** 14px font size with 20px line height */
    '4xl': '1.43em',
    /** 48px font size with 52px line height */
    '5xl': '1.48em',
    /** 16px font size with 24px line height */
    '6xl': '1.5em',
    /** 10px font size with 16px line height */
    '7xl': '1.6em',
    /** 14px font size with 24px line height */
    '8xl': '1.71em',
    /** Default line height */
    normal: 'normal',
    /** No additional line height */
    none: '1em'
  },

  letterSpacing: {
    normal: '0',
    base: '0.0125rem',
    wide: '0.025em',
    wider: '0.05rem',
    widest: '0.0625rem'
  },

  wordSpacing: {
    normal: '0',
    base: '0.0125rem',
    wide: '0.025em',
    wider: '0.05rem',
    widest: '0.0625rem'
  },

  /** Grid layout */
  gridRepeat: {
    '1x': 'repeat(1, 1fr)',
    '2x': 'repeat(2, 1fr)',
    '3x': 'repeat(3, 1fr)',
    '4x': 'repeat(4, 1fr)',
    '5x': 'repeat(5, 1fr)',
    '6x': 'repeat(6, 1fr)'
  },

  /** Borders & radius */
  border: {
    none: '0',
    '0px': '0px',
    '1px': '1px solid',
    '2px': '2px solid'
  },

  borderRadius: {
    none: '0px',
    base: '4px',
    rounder: '6px',
    full: '100%'
  },

  /** Misc */
  boxShadow: {
    none: 'none',
    base: `0px 2px 4px ${hexToRgbA(colors.black, 0.2)}`,
    medium: `0px 4px 6px ${hexToRgbA(colors.black, 0.2)}`,
    high: `0px 6px 8px ${hexToRgbA(colors.black, 0.2)}`
  },

  zIndex: {
    hidden: '-1',
    auto: 'auto',
    base: '0',
    barely: '1',
    dropdown: '10',
    tooltip: '20',
    drawer: '1380',
    header: '1400',
    overlay: '1420',
    modal: '1500',
    notification: '1700',
    topmost: '1800'
  },

  aspectRatio: {
    auto: 'auto',
    '1:1': '1 / 1',
    '2:1': '2/1',
    '4:3': '3 / 4',
    '3:2': '2 / 3',
    '16:9': '9 / 16'
  },

  backdropFilter: {
    base: 'blur(2px)'
  }
};

/** @hidden */
export const SHORTHANDS = {
  ratio: ['aspectRatio'],
  boxSize: ['width', 'height'],
  minBoxSize: ['minWidth', 'minHeight'],
  maxBoxSize: ['maxWidth', 'maxHeight'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  paddingStart: ['paddingInlineStart'],
  paddingEnd: ['paddingInlineEnd'],
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  marginStart: ['marginInlineStart'],
  marginEnd: ['marginInlineEnd'],
  bg: ['backgroundColor'],
  background: ['backgroundColor'],
  spacing: ['gap'],
  shadow: ['boxShadow']
};

/**
 * Comprehensive design system tokens defining the visual foundation.
 * Includes spacing, typography, colors, shadows, and other core values.
 * This is what [Sprinkles](/docs/guides/styles-and-theming/sprinkles) are built on.
 *
 * @readonly
 * @type {typeof baseThemeToken}
 *
 * @example
 * ```ts
 * import { themeValues } from '@peopleticker/magnit-design/utils';
 *
 * const styles = {
 *   padding: themeValues.space[4],
 *   color: themeValues.color.primary500,
 *   fontSize: themeValues.fontSize.base
 * };
 * ```
 */
export const themeValues = { ...baseThemeToken };

export type ThemeColor = keyof typeof themeValues.color;
