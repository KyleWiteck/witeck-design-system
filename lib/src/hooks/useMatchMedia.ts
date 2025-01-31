import { breakPoints } from '@KyleWiteck/witeck-design/utils';
import { useLayoutEffect, useState } from 'react';

import { isKeyOf } from '../utils';

/**
 * Callback function type that gets executed when the media query matches.
 * @callback OnMediaMatch
 * @param {MediaQueryList} media - The media query list object.
 */
export type OnMediaMatch = (media: MediaQueryList) => void;

const MEDIA_QUERIES = {
  mobile: `screen and (max-width: ${breakPoints.tablet - 1}px)`,
  tablet: `screen and (min-width: ${breakPoints.tablet}px) and (max-width: ${breakPoints.desktop - 1}px)`,
  'tablet-up': `screen and (min-width: ${breakPoints.tablet}px)`,
  desktop: `screen and (min-width: ${breakPoints.desktop}px) and (max-width: ${breakPoints.hd - 1}px)`,
  'desktop-down': `screen and (max-width: ${breakPoints.desktop - 1}px)`,
  'desktop-up': `screen and (min-width: ${breakPoints.desktop}px)`,
  hd: `screen and (min-width: ${breakPoints.hd}px)`
};

/**
 * Type representing the predefined media query breakpoints.
 *
 * Available values:
 * - `mobile`: Max width of tablet breakpoint - 1px.
 * - `tablet`: Between tablet and desktop breakpoints.
 * - `tablet-up`: Min width of tablet breakpoint.
 * - `desktop`: Between desktop and HD breakpoints.
 * - `desktop-down`: Max width of desktop breakpoint - 1px.
 * - `desktop-up`: Min width of desktop breakpoint.
 * - `hd`: Min width of HD breakpoint.
 */
export type MediaBreakpoint = keyof typeof MEDIA_QUERIES;

/**
 * Hook to determine if the current viewport matches a given media query or breakpoint.
 *
 * @param {Object} props - The props object.
 * @param {MediaBreakpoint} [props.breakpoint] - A predefined breakpoint key.
 * @param {string} [props.query] - A custom media query string.
 * @param {OnMediaMatch} [props.onMatch] - A callback function triggered when the media query matches.
 * @returns {boolean} Whether the media query matches the current viewport.
 *
 * @throws {Error} If neither a valid breakpoint nor a query is provided.
 *
 * @example
 * ```ts
 * // Using a predefined breakpoint
 * const isMobile = useMatchMedia({ breakpoint: 'mobile' });
 * ```
 *
 * @example
 * ```ts
 * // Using a custom media query
 * const isWideScreen = useMatchMedia({ query: '(min-width: 1200px)' });
 * ```
 *
 * @example
 * ```ts
 * // Using the onMatch callback
 * useMatchMedia({
 *   breakpoint: 'desktop',
 *   onMatch: useCallback((media) => console.log('Desktop view matched!', media), []),
 * });
 * ```
 */
export function useMatchMedia(props: { breakpoint: MediaBreakpoint; onMatch?: OnMediaMatch }): boolean;
export function useMatchMedia(props: { query: string; onMatch?: OnMediaMatch }): boolean;
export function useMatchMedia(props: {
  breakpoint?: MediaBreakpoint;
  query?: string;
  onMatch?: OnMediaMatch;
}): boolean {
  const { breakpoint, query, onMatch } = props;
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = isKeyOf(MEDIA_QUERIES, breakpoint) ? MEDIA_QUERIES[breakpoint] : query;
    if (!mediaQuery) throw new Error(`Invalid media-query provided: ${mediaQuery}`);

    const media = matchMedia(mediaQuery);
    setMatches(media.matches);

    if (!onMatch) return;
    if (media.matches) onMatch(media);

    function listener(e: MediaQueryListEvent) {
      const query = e.target;
      if (query instanceof MediaQueryList && onMatch && query.matches) onMatch(query);
    }

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query, breakpoint, onMatch]);

  return matches;
}
