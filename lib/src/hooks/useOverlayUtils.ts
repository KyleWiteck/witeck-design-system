import { useEffect, useRef, useState } from 'react';

/**
 * Configuration interface for useOverlayUtils hook.
 *
 * @param {boolean} isOpen - Controls overlay visibility and scroll behavior
 */
export interface UseOverlayUtilsConfig {
  isOpen?: boolean;
}

/**
 * Hook for managing overlay/modal utility functions with SSR support.
 * Handles scroll locking and portal rendering.
 *
 * @param {UseOverlayUtilsConfig} config - Configuration options for the overlay
 * @param {boolean} config.isOpen - Enables/disables scroll lock and controls overlay state
 * @param {EventListener} handleScroll - Event handler that prevents scroll when overlay is open
 * @param {Element} bodyRef.current - Reference to document body for portal mounting
 * @param {boolean} renderPortal - SSR-safe flag for portal rendering
 * @returns {Object} Utility values and refs
 * @returns {React.RefObject<Element>} .bodyRef - Reference to document.body
 * @returns {boolean} .renderPortal - Safe to render portal flag
 *
 * @example
 * ```tsx
 * const Modal = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const { bodyRef, renderPortal } = useOverlayUtils({ isOpen });
 *
 *   return renderPortal && createPortal(
 *     <div className="modal">
 *       Modal Content
 *     </div>,
 *     bodyRef.current
 *   );
 * };
 * ```
 */

export const useOverlayUtils = ({ isOpen }: UseOverlayUtilsConfig) => {
  const bodyRef = useRef<Element | null>(null);
  const [renderPortal, setRenderPortal] = useState(false);

  // Use to prevent hydration errors
  useEffect(() => {
    if (typeof window === 'undefined') return;
    bodyRef.current = document.body;
    setRenderPortal(true);
  }, []);

  // Disables scroll when opened
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll: EventListener = e => {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return { bodyRef, renderPortal };
};
