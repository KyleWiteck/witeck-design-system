import { MutableRefObject, ReactNode, Ref, createContext, useContext } from 'react';

/**
 * Context for sharing ref values across components.
 * @template T Type of the ref value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RefContext = createContext<MutableRefObject<any> | null>(null);

/**
 * Props for the RefProvider component.
 * @template T Type of the ref value
 */
interface RefProviderProps<T> {
  children: ReactNode;
  refValue: MutableRefObject<T | null>;
}

/**
 * Provider component that shares a ref value with its descendants.
 *
 * @template T Type of the ref value
 * @param {RefProviderProps<T>} props Provider configuration
 *
 * @example
 * ```tsx
 * const myRef = useRef<HTMLDivElement>(null);
 *
 * return (
 *   <RefProvider refValue={myRef}>
 *     <ChildComponent />
 *   </RefProvider>
 * );
 * ```
 */
export const RefProvider = <T,>({ children, refValue }: RefProviderProps<T>) => {
  return <RefContext.Provider value={refValue}>{children}</RefContext.Provider>;
};

/**
 * Hook to access a ref value from the nearest RefProvider ancestor.
 *
 * @template T Type of the ref value
 * @returns {MutableRefObject<T | null>} Shared ref object
 *
 * @example
 * ```tsx
 * const divRef = useRefValue<HTMLDivElement>();
 *
 * useEffect(() => {
 *   if (divRef.current) {
 *     divRef.current.focus();
 *   }
 * }, []);
 * ```
 */
export const useRefValue = <T,>() => useContext(RefContext) as MutableRefObject<T | null>;

/**
 * Type definition for the DataGrid filter context.
 * This context stores metadata related to the filtering form.
 */
export type DataGridFilterContextType = {
  /**
   * Unique identifier for the filter form.
   * This ID is used to associate form elements and manage submissions.
   */
  formId: string;

  /**
   * React reference to the filter form element.
   * This allows direct access to the form for programmatic interactions.
   */
  formRef: Ref<HTMLFormElement | null>;
};

/**
 * Context for managing DataGrid filters.
 * Provides access to filtering form data and operations within the DataGrid.
 */
export const DataGridFilterContext = createContext({});

/**
 * Hook to access the DataGrid filter context.
 * This allows components to retrieve and use the filter form metadata.
 *
 * @throws {Error} If the context is not available, indicating that the component is
 * used outside a valid DataGridFilterContext provider.
 *
 * @returns {DataGridFilterContextType} The current state of the DataGrid filter context.
 */
export function useDataGridFiltersContext() {
  const ctx = useContext(DataGridFilterContext) as DataGridFilterContextType;
  if (!ctx) throw new Error('No DataGridFilterContext found.');
  return ctx;
}
