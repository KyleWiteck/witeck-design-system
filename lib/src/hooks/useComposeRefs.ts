import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Internal utility that handles setting of React refs with type safety.
 * Supports both callback refs and RefObjects.
 *
 * @template T - Type of referenced value (e.g., HTMLElement)
 * @param {PossibleRef<T>} ref - React ref to update (callback or RefObject)
 * @param {T} value - Value to assign to the ref
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * Utility for combining multiple React refs into a single callback ref.
 * Useful when needing to attach multiple refs to a single element, like
 * combining a forwarded ref with a local ref.
 *
 * @template T - Type of referenced element (e.g., HTMLButtonElement)
 * @param {...PossibleRef<T>} refs - Array of refs to compose together
 * @returns {(node: T) => void} Callback that updates all provided refs
 *
 * @example
 * ```tsx
 * const Button = forwardRef<HTMLButtonElement>((props, forwardedRef) => {
 *   const localRef = useRef<HTMLButtonElement>(null);
 *   const composed = composeRefs(forwardedRef, localRef);
 *
 *   useEffect(() => {
 *     // Both refs now point to the button element
 *     console.log(localRef.current === forwardedRef.current);
 *   }, []);
 *
 *   return <button ref={composed} {...props} />;
 * });
 * ```
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach(ref => setRef(ref, node));
}

/**
 * Hook that combines multiple React refs into a memoized callback.
 * Prevents unnecessary re-renders when composing refs by memoizing
 * the callback reference.
 *
 * @template T - Type of referenced element (e.g., HTMLDivElement)
 * @param {...PossibleRef<T>} refs - Refs to compose into a single ref
 * @returns {(node: T) => void} Stable callback that updates all refs
 *
 * @example
 * ```tsx
 * const Component = forwardRef<HTMLDivElement>((props, ref) => {
 *   const localRef = useRef<HTMLDivElement>(null);
 *   const focusRef = useRef<HTMLDivElement>(null);
 *
 *   // Stable reference across renders
 *   const composed = useComposedRefs(ref, localRef, focusRef);
 *
 *   return <div ref={composed}>Content</div>;
 * });
 * ```
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}
