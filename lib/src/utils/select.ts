import { SelectOption } from '../components/Select/shared/types';
import { TextProps } from '../components/Text';

/**
 * Preset text properties that enable single-line text truncation with ellipsis.
 * Ensures consistent text overflow handling across components while maintaining
 * proper alignment and capitalization.
 *
 * @type {TextProps<'span'>}
 *
 * @example
 * ```tsx
 * <Text {...ellipsisTextProps}>This long text will truncate with ellipsis</Text>
 * ```
 */
export const ellipsisTextProps: TextProps<'span'> = {
  element: 'span',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  variant: 'inherit',
  lineHeight: 'normal',
  display: 'inline-block',
  verticalAlign: 'middle',
  textTransform: 'capitalize'
};

export interface addUniqueOptionBasedOnKeyConfig<opt extends SelectOption> {
  current?: opt[];
  newItem: opt;
  // removeIfExists?: boolean;
  key: string;
}

/**
 * Configuration interface for managing unique options in selection components.
 * Enables toggle-like behavior where adding a duplicate item removes it instead.
 *
 * @template opt - Type extending SelectOption with shared selection properties
 *
 * @param {opt[]} [current] - Existing array of selected options
 * @param {opt} newItem - Option to toggle (add or remove)
 * @param {string} key - Unique identifier property name for comparison
 *
 * @example
 * ```tsx
 * const config: addUniqueOptionBasedOnKeyConfig<SelectOption> = {
 *   current: selectedUsers,
 *   newItem: { id: '123', label: 'John Doe' },
 *   key: 'id'
 * };
 * ```
 */
export function addUniqueOptionBasedOnKey<T extends SelectOption>(config: addUniqueOptionBasedOnKeyConfig<T>) {
  const { current = [], newItem, key } = config;

  const index = current.findIndex(item => item[key] === newItem[key]);

  if (index !== -1) {
    // Item already exists in the array, remove it
    const updated = [...current];
    updated.splice(index, 1);

    return updated;
  } else {
    // Item does not exist in the array, add it
    return [...current, newItem];
  }
}

/**
 * Manages unique items in a selection array by toggling their presence.
 * If an item with the same key exists, it's removed; if not, it's added.
 * Useful for implementing multi-select with toggle behavior.
 *
 * @template T - Type extending SelectOption interface
 * @param {addUniqueOptionBasedOnKeyConfig<T>} config - Toggle configuration
 * @returns {T[]} Updated array with item either added or removed
 *
 * @example
 * ```tsx
 * const updatedSelection = addUniqueOptionBasedOnKey({
 *   current: selectedUsers,
 *   newItem: { id: '123', label: 'John Doe' },
 *   key: 'id'
 * });
 * ```
 */
export function filterOptionsBySearchTerm<T>({
  options = [],
  searchTerm,
  key,
  variant = 'startsWith'
}: {
  options?: T[];
  searchTerm: string;
  key: keyof T;
  variant?: 'includes' | 'startsWith';
}): T[] {
  return options.filter(option => {
    const value = option[key];
    if (typeof value === 'string') {
      return value.toLowerCase()[variant](searchTerm.toLowerCase());
    }
    return false;
  });
}
