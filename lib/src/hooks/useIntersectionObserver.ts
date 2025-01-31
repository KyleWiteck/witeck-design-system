import { MutableRefObject, useEffect, useRef, useState } from 'react';

/**
 * Arguments for the useIntersectionObserver hook.
 *
 * @template E - The type of the element being observed.
 */
export interface IntersectionObserverArgs<E extends Element> extends IntersectionObserverInit {
  /**
   * Ref to the target element to observe.
   */
  ref: MutableRefObject<E | null>;
  /**
   * If true, the observer will disconnect after the first intersection.
   * @default false
   */
  triggerOnce?: boolean;
  /**
   * Optional callback function to run when the intersection changes.
   *
   * @param {IntersectionObserverEntry} entry - The IntersectionObserverEntry for the observed element.
   */
  callback?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Custom hook to observe the intersection of a target element with its root.
 * This hook sets up an IntersectionObserver to monitor the visibility of a target element
 * and provides information about its visibility state.
 *
 * @template E - The type of the element being observed.
 *
 * @param {IntersectionObserverArgs<E>} args - Arguments for the intersection observer.
 * @param {MutableRefObject<E | null>} args.ref - Ref to the target element to observe.
 * @param {boolean} [args.triggerOnce=false] - If true, the observer will disconnect after the first intersection.
 * @param {function} [args.callback] - Optional callback function to run when the intersection changes.
 * @param {Element | null} [args.root=null] - The element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport if not specified.
 * @param {string} [args.rootMargin='0px'] - Margin around the root. Can have values similar to the CSS margin property.
 * @param {number | number[]} [args.threshold=0] - Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 *
 * @example
 * ```tsx
 * const ref = useRef(null);
 * const { isVisible } = useIntersectionObserver({
 *   ref,
 *   triggerOnce: true,
 *   callback: useCallback((entry) => console.log('Intersection changed', entry), []),
 * });
 *
 * return <div ref={ref}>Observe me</div>;
 * ```
 */
export function useIntersectionObserver<E extends Element>(args: IntersectionObserverArgs<E>) {
  const { ref, triggerOnce = false, callback, root, rootMargin, threshold } = args;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const isTriggeredRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    if (triggerOnce && isTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        if (callback) callback(entry);

        if (triggerOnce) {
          isTriggeredRef.current = true;
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback, triggerOnce, root, rootMargin, threshold]);

  const isVisible = entry?.isIntersecting ?? false;

  return { isVisible, entry };
}
