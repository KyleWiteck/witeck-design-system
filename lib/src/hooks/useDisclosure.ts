import { useMemo, useState } from 'react';

/**
 * Hook for managing visibility state of UI components like modals, dropdowns, and tooltips.
 *
 * @template T - Type of state value
 * @param {boolean} initialState - Initial visibility state
 * @returns {Object} State and handler methods
 * @returns {boolean} .isOpen - Current visibility state
 * @returns {() => void} .onOpen - Shows the component
 * @returns {() => void} .onClose - Hides the component
 * @returns {() => void} .onToggle - Toggles visibility
 *
 * @example
 * ```tsx
 * const Dialog = () => {
 *   const { isOpen, onOpen, onClose } = useDisclosure();
 *
 *   return (
 *     <>
 *       <button onClick={onOpen}>Show Dialog</button>
 *       {isOpen && (
 *         <div role="dialog">
 *           <h2>Dialog Title</h2>
 *           <button onClick={onClose}>Close</button>
 *         </div>
 *       )}
 *     </>
 *   );
 * };
 * ```
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  return useMemo(
    () => ({
      isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false),
      onToggle: () => setIsOpen(!isOpen)
    }),
    [isOpen, setIsOpen]
  );
}
