import { responsiveProperties } from '../theme/sprinkles.css';

type SprinklesCSSProperties = keyof typeof responsiveProperties.styles;

export type PaddingCSSPropertiesUnion = Extract<
  SprinklesCSSProperties,
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingTop'
  | 'paddingBottom'
  | 'paddingStart'
  | 'paddingEnd'
>;

export type PositionCSSPropertiesUnion = Extract<
  SprinklesCSSProperties,
  'left' | 'right' | 'top' | 'bottom' | 'position'
>;

export type OverflowCSSPropertiesUnion = Extract<SprinklesCSSProperties, 'overflow' | 'overflowY' | 'overflowX'>;

export type FontCSSProperties = Extract<
  SprinklesCSSProperties,
  | 'fontSize'
  | 'fontFamily'
  | 'fontWeight'
  | 'lineHeight'
  | 'letterSpacing'
  | 'wordSpacing'
  | 'fontStyle'
  | 'textAlign'
  | 'textDecoration'
  | 'textTransform'
  | 'textOverflow'
  | 'whiteSpace'
  | 'color'
>;

export type FlexCSSProperties = Extract<
  SprinklesCSSProperties,
  'flexDirection' | 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'justifySelf' | 'alignSelf' | 'order'
>;

export type HeightCSSProperties = Extract<SprinklesCSSProperties, 'height' | 'minHeight' | 'maxHeight'>;

export type WidthCSSProperties = Extract<SprinklesCSSProperties, 'width' | 'minWidth' | 'maxWidth'>;

export type BorderCSSProperties =
  | Extract<SprinklesCSSProperties, 'border' | 'borderRadius' | 'borderBottom' | 'borderTop'>
  | 'borderRight'
  | 'borderLeft';

export type MarginCSSProperties =
  | Extract<SprinklesCSSProperties, 'margin' | 'marginBottom' | 'marginTop'>
  | 'marginRight'
  | 'marginLeft';
