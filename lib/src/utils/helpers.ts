/**
 * Determines if an HTML element is partially or fully outside the viewport.
 * Calculates visibility status for each edge and provides aggregate checks.
 *
 * @param {HTMLElement} elem - Element to check
 * @returns {Object} Visibility status for each edge and aggregate states
 *
 * @example
 * ```ts
 * const status = isOutOfViewport(myElement);
 * if (status.any) {
 *   // Element is partially outside viewport
 * }
 * ```
 */
export function isOutOfViewport(elem: HTMLElement) {
  const bounding = elem.getBoundingClientRect();
  return {
    top: bounding.top < 0,
    left: bounding.left < 0,
    bottom: bounding.bottom > (window.innerHeight || document.documentElement.clientHeight),
    right: bounding.right > (window.innerWidth || document.documentElement.clientWidth),
    any:
      bounding.top < 0 ||
      bounding.left < 0 ||
      bounding.bottom > (window.innerHeight || document.documentElement.clientHeight) ||
      bounding.right > (window.innerWidth || document.documentElement.clientWidth),
    all:
      bounding.top < 0 &&
      bounding.left < 0 &&
      bounding.bottom > (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right > (window.innerWidth || document.documentElement.clientWidth)
  };
}

/**
 * Sets focus on an element referenced by a React ref.
 * Safely handles null/undefined refs.
 *
 * @param {React.RefObject<HTMLElement>} elementRef - Reference to target element
 *
 * @example
 * ```tsx
 * const myRef = useRef<HTMLButtonElement>(null);
 * setFocusByRef(myRef); // Focuses the button
 * ```
 */
export const setFocusByRef = (elementRef: React.RefObject<HTMLElement>) => {
  if (elementRef && elementRef.current) {
    elementRef.current.focus();
  }
};

/**
 * Type guard that ensures a value is neither null nor undefined.
 * Useful for filtering out null values from arrays or validating optional props.
 *
 * @param {T | null | undefined} item - Value to check
 * @returns {boolean} True if value is neither null nor undefined
 *
 * @example
 * ```ts
 * const items = ['a', null, 'b', undefined].filter(isNonNullable);
 * // items = ['a', 'b']
 * ```
 */
export function isNonNullable<T>(item: T | null | undefined): item is T {
  return Boolean(item);
}

/**
 * Performs a deep equality check between two values.
 * Handles nested objects, arrays, and primitive types.
 * Should be used very sparingly as this is hard on performance.
 *
 * @template T
 * @param {T} a - First value
 * @param {T} b - Second value
 * @returns {boolean} True if values are deeply equal
 *
 * @example
 * ```ts
 * deepEqual({ a: [1] }, { a: [1] }) // true
 * deepEqual({ a: [1] }, { a: [2] }) // false
 * ```
 */
function deepEqual<T>(a: T, b: T): boolean {
  // Check if both are objects
  if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
    // Get keys of both objects
    const keysA = Object.keys(a) as (keyof T)[];
    const keysB = Object.keys(b) as (keyof T)[];

    // Check if number of keys match
    if (keysA.length !== keysB.length) {
      return false;
    }

    // Check deep equality of each key
    for (const key of keysA) {
      const valueA = a[key];
      const valueB = b[key];

      // Recursively compare nested objects and arrays
      if (typeof valueA === 'object' && typeof valueB === 'object') {
        if (!deepEqual(valueA, valueB)) {
          return false;
        }
      } else if (Array.isArray(valueA) && Array.isArray(valueB)) {
        if (!arraysEqual(valueA, valueB)) {
          return false;
        }
      } else if (valueA !== valueB) {
        return false;
      }
    }

    return true;
  }

  // For non-objects, do simple equality check
  return a === b;
}

// Deep equality check for arrays
function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!deepEqual(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Configuration for adding/removing unique items from arrays
 * @template T Type of array elements
 */
interface addUniqueArrayItemConfig<T> {
  current: T[];
  newItem: T;
  comparator?: (a: T, b: T) => boolean;
  removeIfExists?: boolean;
}

/**
 * Manages unique items in an array by adding new items or removing duplicates.
 * Uses deep equality by default but supports custom comparators.
 *
 * @template T Type of array elements
 * @param {addUniqueArrayItemConfig<T>} config Configuration object
 * @returns {T[]} Updated array with item added or removed
 *
 * @example
 * ```ts
 * const arr = addUniqueArrayItem({
 *   current: [{ id: 1 }],
 *   newItem: { id: 2 },
 *   comparator: (a, b) => a.id === b.id
 * });
 * ```
 */
export function addUniqueArrayItem<T>(config: addUniqueArrayItemConfig<T>): T[] {
  const { current, newItem, comparator = (a, b) => deepEqual(a, b), removeIfExists = true } = config;

  const index = current.findIndex(item => comparator(item, newItem));

  if (index !== -1) {
    // Item already exists in the array
    if (removeIfExists) {
      // Remove the existing item and return the updated array
      const updated = [...current];
      updated.splice(index, 1);
      return updated;
    } else {
      // If removeIfExists is false, return the current array as is
      return current;
    }
  } else {
    // Item does not exist in the array, add it
    return [...current, newItem];
  }
}
/**
 * Type guard. Determines whether an object has a property with the specified name.
 * */
export function isKeyOf<R extends Record<PropertyKey, unknown>>(record: R, key: unknown): key is keyof R {
  return (
    (typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol') &&
    Object.prototype.hasOwnProperty.call(record, key)
  );
}

/**
 * Composes two event handlers into a single function.
 *
 * @template E - The event type.
 * @param {((event: E) => void) | undefined} originalEventHandler - The original event handler.
 * @param {((event: E) => void) | undefined} ourEventHandler - The additional event handler to be executed.
 * @param {boolean} [checkForDefaultPrevented=true] - Whether to check if `event.defaultPrevented` is set before calling `ourEventHandler`.
 * @returns {(event: E) => void} A function that calls both handlers in order, respecting `defaultPrevented` if specified.
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  checkForDefaultPrevented = true
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
