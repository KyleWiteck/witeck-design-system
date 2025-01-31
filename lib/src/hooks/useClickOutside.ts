import { RefObject, useEffect } from 'react';

/**
 * Custom hook that detects clicks outside specified elements.
 *
 * @template T - The type of HTML element being monitored
 *
 * @param {RefObject<T>[]} refs - Array of refs to monitor
 * @param {boolean} isOpen - Whether the monitored component is open
 * @param {() => void} onClickOutside - Callback for outside clicks
 * @param {MouseEvent | TouchEvent} event - Browser event object
 * @param {HTMLElement} parentElement - Parent element to check boundaries
 *
 * @example
 * ```tsx
 * const modalRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * useClickOutside([modalRef], isOpen, () => setIsOpen(false));
 *
 * return isOpen && <div ref={modalRef}>Modal content</div>;
 * ```
 */
export const useClickOutside = (refs: RefObject<HTMLElement>[], isOpen: boolean, onClickOutside: () => void) => {
  const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
    if (
      isOpen &&
      !refs.some(ref => ref.current && ref.current.contains(event.target as Node)) &&
      !refs.some(ref => isClickInsideParent(event, ref.current))
    ) {
      onClickOutside();
    }
  };

  const isClickInsideParent = (event: globalThis.MouseEvent | TouchEvent, parentElement: HTMLElement | null) => {
    if (!parentElement) return false;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const { left, right, top, bottom } = parentElement.getBoundingClientRect();
    return clientX >= left && clientX <= right && clientY >= top && clientY <= bottom;
  };

  useEffect(() => {
    if (!isOpen || refs.length === 0 || !refs.every(ref => ref.current)) return;

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClickOutside, isOpen, refs]);
};
