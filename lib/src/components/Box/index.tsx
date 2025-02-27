import { CSSProperties } from '@vanilla-extract/css';
import { ElementRef, ElementType, ForwardedRef, ReactElement, ReactNode, RefAttributes, forwardRef, memo } from 'react';

import { Sprinkles, sprinkles } from '../../theme/sprinkles.css';
import { OverridableComponent, PolymorphicProps } from '../../types';

/**
 * Combine the Box-specific props and the component props for a given element type
 * @deprecated use `PolymorphicProps` and `OverridableComponent`
 */
export type PolymorphicComponentProps<E extends ElementType, P> = P & BoxProps<E>;

/**
 * Define a polymorphic component that can render any element type
 * @deprecated use `PolymorphicProps` and `OverridableComponent`
 */
export type PolymorphicComponent<P, D extends ElementType = 'div'> = <E extends ElementType = D>(
  props: PolymorphicComponentProps<E, P> & RefAttributes<ElementRef<E>> // Use ElementRef<E>
) => ReactElement | null;

/**
 * Define the props for our Box component, which can be used to render any HTML element
 * @deprecated use `BoxProps` or `SprinklesProps`
 */
export type BoxSpecificProps<E extends ElementType = ElementType> = {
  element?: E | ElementType;
  className?: string;
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
} & Sprinkles;

export type SprinklesProps = Sprinkles;

type BoxTypeMap = {
  props: SprinklesProps;
  // The default element type to render if no "element" prop is specified
  defaultComponent: 'div';
};

export type BoxProps<Root extends ElementType = BoxTypeMap['defaultComponent']> = PolymorphicProps<BoxTypeMap, Root>;

/**
 * Combines an array of class names into a single string, filtering out empty strings and null/undefined values
 */
function composeClassNames(...classNames: Array<string | undefined>) {
  const classes = classNames
    .filter(className => Boolean(className) && className !== ' ')
    .map(className => className?.toString().trim());
  return classes.length === 0 ? undefined : classes.join(' ');
}

/**
 * Separates style props from element props and returns an object for each.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractSprinklesFromProps(props: any) {
  let hasStyleProps = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styleProps: { [key: string]: any } = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elementProps: { [key: string]: any } = {};

  for (const key in props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (sprinkles.properties.has(key as any)) {
      hasStyleProps = true;
      styleProps[key] = props[key];
    } else {
      elementProps[key] = props[key];
    }
  }

  return { hasStyleProps, styleProps, elementProps };
}

function BoxImpl(props: BoxProps, forwardedRef: ForwardedRef<Element>) {
  const { element, className, style, children, ...otherProps } = props;

  const Element = element ?? 'div';

  const { hasStyleProps, styleProps, elementProps } = extractSprinklesFromProps(otherProps);
  const classNames = hasStyleProps ? composeClassNames(sprinkles(styleProps), className) : className;

  return (
    <Element className={classNames} style={style} {...elementProps} ref={forwardedRef}>
      {children}
    </Element>
  );
}

/**
 * Box is the most foundational component in the Magnit Design Library, upon which all other components are built.
 *
 * @description This is a highly flexible component that forms the foundation of our design components.
 * By default, it renders as a div element, making it a flexible starting point for designing and laying out content.
 */
export const Box = memo(forwardRef(BoxImpl)) as OverridableComponent<BoxTypeMap>;
