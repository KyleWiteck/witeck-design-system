import { ConditionalValue, createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { breakPoints } from '../utils';
import { varsContract } from './vars.css';

export const PROPERTIES = Object.freeze({
  width: varsContract?.space,
  height: varsContract?.space,
  minWidth: varsContract?.space,
  maxWidth: varsContract?.space,
  minHeight: varsContract?.space,
  maxHeight: varsContract?.space,
  display: ['none', 'block', 'inline', 'flex', 'inline-flex', 'grid', 'contents', 'inline-block'],
  verticalAlign: ['baseline', 'top', 'middle', 'bottom', 'sub', 'text-top'],
  overflow: ['visible', 'hidden', 'scroll', 'auto'],
  overflowX: ['visible', 'hidden', 'scroll', 'auto'],
  overflowY: ['visible', 'hidden', 'scroll', 'auto'],
  /** varsContract?.aspectRatio */
  aspectRatio: varsContract?.aspectRatio,
  visibility: ['collapse', 'hidden', 'inherit', 'initial', 'revert', 'revert-layer', 'unset', 'visible'],
  flexDirection: ['row', 'column', 'column-reverse', 'row-reverse', 'unset'],
  alignItems: ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'],
  alignContent: ['flex-start', 'center', 'flex-end'],
  justifyContent: ['flex-start', 'space-between', 'space-around', 'center', 'flex-end'],
  justifyItems: ['flex-start', 'space-between', 'space-around', 'center', 'flex-end'],
  flexWrap: ['wrap', 'wrap-reverse', 'nowrap'],
  flex: ['auto', '0', '1'],
  flexGrow: [0, 1, 2, 3],
  flexShrink: [0, 1, 2, 3],
  flexBasis: varsContract?.space,
  justifySelf: ['flex-start', 'flex-end', 'center'],
  alignSelf: ['flex-start', 'flex-end', 'center', 'stretch'],
  order: [0, 1, 2, 3, 4, 5],
  gap: varsContract?.space,
  gridGap: varsContract?.space,
  gridRowGap: varsContract?.space,
  gridColumnGap: varsContract?.space,
  gridColumn: ['1', 'span 2', 'span 3'],
  /** varsContract?.gridRepeat */
  gridTemplateColumns: varsContract?.gridRepeat,
  gridAutoFlow: ['row', 'column', 'dense', 'row dense', 'column dense'],
  position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
  top: ['0px'],
  right: ['0px'],
  bottom: ['0px'],
  left: ['0px'],
  zIndex: varsContract?.zIndex,
  border: varsContract?.border,
  borderTop: varsContract?.border,
  borderRight: varsContract?.border,
  borderBottom: varsContract?.border,
  borderLeft: varsContract?.border,
  borderRadius: varsContract?.borderRadius,
  borderTopLeftRadius: varsContract?.borderRadius,
  borderTopRightRadius: varsContract?.borderRadius,
  borderBottomLeftRadius: varsContract?.borderRadius,
  borderBottomRightRadius: varsContract?.borderRadius,
  boxShadow: varsContract?.boxShadow,
  padding: varsContract?.space,
  paddingTop: varsContract?.space,
  paddingBottom: varsContract?.space,
  paddingLeft: varsContract?.space,
  paddingRight: varsContract?.space,
  paddingInlineStart: varsContract?.space,
  paddingInlineEnd: varsContract?.space,
  margin: varsContract?.space,
  marginTop: varsContract?.space,
  marginBottom: varsContract?.space,
  marginLeft: varsContract?.space,
  marginRight: varsContract?.space,
  marginInlineStart: varsContract?.space,
  marginInlineEnd: varsContract?.space,

  /** varsContract?.fontSize */
  fontSize: varsContract?.fontSize,
  /** varsContract?.fontFamily */
  fontFamily: varsContract?.fontFamily,
  /** varsContract?.fontWeight */
  fontWeight: varsContract?.fontWeight,
  /** varsContract?.lineHeight */
  lineHeight: varsContract?.lineHeight,
  /** varsContract?.letterSpacing */
  letterSpacing: varsContract?.letterSpacing,
  wordSpacing: varsContract?.wordSpacing,
  fontStyle: ['normal', 'bold', 'italic'],
  textAlign: ['left', 'center', 'right', 'inherit'],
  textDecoration: ['none', 'underline', 'overline', 'line-through'],
  textTransform: ['none', 'uppercase', 'lowercase', 'uppercase', 'capitalize'],
  textOverflow: ['clip', 'ellipsis', 'fade', 'string', 'initial', 'inherit', 'unset'],
  whiteSpace: ['normal', 'nowrap'],
  backgroundColor: varsContract?.color,
  color: varsContract?.color,
  cursor: [
    'default',
    'auto',
    'none',
    'help',
    'pointer',
    'progress',
    'wait',
    'crosshair',
    'text',
    'copy',
    'move',
    'no-drop',
    'not-allowed',
    'grab',
    'grabbing',
    'zoom-in',
    'zoom-out'
  ],
  backdropFilter: varsContract.backdropFilter,
  listStyle: ['none'],
  listStyleType: [
    'disc',
    'circle',
    'square',
    'decimal',
    'decimal-leading-zero',
    'lower-roman',
    'upper-roman',
    'lower-alpha',
    'upper-alpha',
    'none',
    'initial',
    'inherit'
  ],
  listStylePosition: ['inside', 'outside', 'initial', 'inherit'],
  pointerEvents: ['auto', 'none']
} as const);

export const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': `screen and (min-width: ${breakPoints.tablet}px)` },
    desktop: {
      '@media': `screen and (min-width: ${breakPoints.desktop}px)`
    },
    hd: { '@media': `screen and (min-width: ${breakPoints.hd}px)` }
  },
  defaultCondition: 'mobile',
  responsiveArray: ['mobile', 'tablet', 'desktop', 'hd'],
  properties: PROPERTIES,
  // TODO: When adding to shorthands. Please also update the SHORTHANDS conts lib/src/utils/theme.ts. Storing shorthands and then adding them to this causes TS errors. We need to find a way to not need to duplicate
  shorthands: {
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
  }
});

//TODO: Added light and dark mode
export const colorProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': `screen and (min-width: ${breakPoints.tablet}px)` },
    desktop: {
      '@media': `screen and (min-width: ${breakPoints.desktop}px)`
    },
    hd: { '@media': `screen and (min-width: ${breakPoints.hd}px)` },
    default: {},
    lightMode: {},
    darkMode: { '@media': '(prefers-color-scheme: dark)' },
    hover: { selector: '&:hover' }
  },
  defaultCondition: 'mobile',
  responsiveArray: ['mobile', 'tablet', 'desktop'],
  properties: {
    /** varsContract?.color */
    color: varsContract?.color,
    /** varsContract?.color */
    opacity: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
    /** varsContract?.color */
    borderColor: varsContract?.color
  }
});

export type ResponsiveValue<Value extends string | number> = ConditionalValue<typeof responsiveProperties, Value>;

export type Sprinkles = Parameters<typeof sprinkles>[0];

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);
