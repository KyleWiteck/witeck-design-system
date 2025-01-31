import { MutableRefObject, ReactNode, createContext, useContext } from 'react';

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
