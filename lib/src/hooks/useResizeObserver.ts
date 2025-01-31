import { MutableRefObject, useLayoutEffect, useState } from 'react';

/**
 * Custom hook to observe the resizing of a target element.
 * This hook sets up a ResizeObserver to monitor the size changes of a target element
 * and provides the current width and height of the element.
 *
 * @template T - The type of the element being observed.
 *
 * @param {MutableRefObject<T | null>} ref - Ref to the target element to observe.
 * @param {function} [callback] - Optional callback function to run when the size of the target element changes.
 *
 * @returns {{ width: number; height: number }} - Returns an object containing the current width and height of the target element.
 *
 * @example
 * ```tsx
 * const ref = useRef(null);
 * const size = useResizeObserver(ref, (entry) => {
 *   console.log('Resized', entry);
 * });
 *
 * return <div ref={ref}>Resize me</div>;
 * ```
 */
export function useResizeObserver<T extends Element>(
  ref: MutableRefObject<T | null>,
  callback?: (entry: ResizeObserverEntry) => void
) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    setSize({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight
    });

    const observer = new ResizeObserver(([entry]) => {
      if (callback) callback(entry);
      setSize({
        width: entry.target.clientWidth,
        height: entry.target.clientHeight
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);

  return size;
}
