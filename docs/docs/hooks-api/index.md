# Hooks API Reference

A collection of reusable `React` hook functions,
that allow you to encapsulate and share logic across multiple components.

## Interfaces

### IntersectionObserverArgs\<E\>

Arguments for the useIntersectionObserver hook.

#### Extends

- `IntersectionObserverInit`

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `E` *extends* `Element` | The type of the element being observed. |

#### Properties

##### callback()?

```ts
optional callback: (entry) => void;
```

Optional callback function to run when the intersection changes.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entry` | `IntersectionObserverEntry` | The IntersectionObserverEntry for the observed element. |

###### Returns

`void`

##### ref

```ts
ref: MutableRefObject<null | E>;
```

Ref to the target element to observe.

##### root?

```ts
optional root: null | Element | Document;
```

###### Inherited from

`IntersectionObserverInit.root`

##### rootMargin?

```ts
optional rootMargin: string;
```

###### Inherited from

`IntersectionObserverInit.rootMargin`

##### threshold?

```ts
optional threshold: number | number[];
```

###### Inherited from

`IntersectionObserverInit.threshold`

##### triggerOnce?

```ts
optional triggerOnce: boolean;
```

If true, the observer will disconnect after the first intersection.

###### Default

```ts
false
```

***

### UseOverlayUtilsConfig

Configuration interface for useOverlayUtils hook.

#### Param

Controls overlay visibility and scroll behavior

#### Properties

##### isOpen?

```ts
optional isOpen: boolean;
```

## Type Aliases

### MediaBreakpoint

```ts
type MediaBreakpoint: keyof typeof MEDIA_QUERIES;
```

Type representing the predefined media query breakpoints.

Available values:
- `mobile`: Max width of tablet breakpoint - 1px.
- `tablet`: Between tablet and desktop breakpoints.
- `tablet-up`: Min width of tablet breakpoint.
- `desktop`: Between desktop and HD breakpoints.
- `desktop-down`: Max width of desktop breakpoint - 1px.
- `desktop-up`: Min width of desktop breakpoint.
- `hd`: Min width of HD breakpoint.

***

### OnMediaMatch()

```ts
type OnMediaMatch: (media) => void;
```

Callback function type that gets executed when the media query matches.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `media` | `MediaQueryList` | The media query list object. |

#### Returns

`void`

## Functions

### composeRefs()

```ts
function composeRefs<T>(...refs): (node) => void
```

Utility for combining multiple React refs into a single callback ref.
Useful when needing to attach multiple refs to a single element, like
combining a forwarded ref with a local ref.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Type of referenced element (e.g., HTMLButtonElement) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`refs` | `PossibleRef`\<`T`\>[] | Array of refs to compose together |

#### Returns

`Function`

Callback that updates all provided refs

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `T` |

##### Returns

`void`

#### Example

```tsx
const Button = forwardRef<HTMLButtonElement>((props, forwardedRef) => {
  const localRef = useRef<HTMLButtonElement>(null);
  const composed = composeRefs(forwardedRef, localRef);

  useEffect(() => {
    // Both refs now point to the button element
    console.log(localRef.current === forwardedRef.current);
  }, []);

  return <button ref={composed} {...props} />;
});
```

***

### useClickOutside()

```ts
function useClickOutside(
   refs, 
   isOpen, 
   onClickOutside): void
```

Custom hook that detects clicks outside specified elements.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `refs` | `RefObject`\<`HTMLElement`\>[] | Array of refs to monitor |
| `isOpen` | `boolean` | Whether the monitored component is open |
| `onClickOutside` | () => `void` | Callback for outside clicks |

#### Returns

`void`

#### Example

```tsx
const modalRef = useRef<HTMLDivElement>(null);
const [isOpen, setIsOpen] = useState(false);

useClickOutside([modalRef], isOpen, () => setIsOpen(false));

return isOpen && <div ref={modalRef}>Modal content</div>;
```

***

### useComposedRefs()

```ts
function useComposedRefs<T>(...refs): (node) => void
```

Hook that combines multiple React refs into a memoized callback.
Prevents unnecessary re-renders when composing refs by memoizing
the callback reference.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Type of referenced element (e.g., HTMLDivElement) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`refs` | `PossibleRef`\<`T`\>[] | Refs to compose into a single ref |

#### Returns

`Function`

Stable callback that updates all refs

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `T` |

##### Returns

`void`

#### Example

```tsx
const Component = forwardRef<HTMLDivElement>((props, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  // Stable reference across renders
  const composed = useComposedRefs(ref, localRef, focusRef);

  return <div ref={composed}>Content</div>;
});
```

***

### useDisclosure()

```ts
function useDisclosure(initialState): object
```

Hook for managing visibility state of UI components like modals, dropdowns, and tooltips.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `initialState` | `boolean` | `false` | Initial visibility state |

#### Returns

`object`

State and handler methods

.isOpen - Current visibility state

.onOpen - Shows the component

.onClose - Hides the component

.onToggle - Toggles visibility

##### isOpen

```ts
isOpen: boolean;
```

##### onClose()

```ts
onClose: () => void;
```

###### Returns

`void`

##### onOpen()

```ts
onOpen: () => void;
```

###### Returns

`void`

##### onToggle()

```ts
onToggle: () => void;
```

###### Returns

`void`

#### Example

```tsx
const Dialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>Show Dialog</button>
      {isOpen && (
        <div role="dialog">
          <h2>Dialog Title</h2>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </>
  );
};
```

***

### useIntersectionObserver()

```ts
function useIntersectionObserver<E>(args): object
```

Custom hook to observe the intersection of a target element with its root.
This hook sets up an IntersectionObserver to monitor the visibility of a target element
and provides information about its visibility state.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `E` *extends* `Element` | The type of the element being observed. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `args` | [`IntersectionObserverArgs`](index.md#intersectionobserverargse)\<`E`\> | Arguments for the intersection observer. |

#### Returns

`object`

##### entry

```ts
entry: null | IntersectionObserverEntry;
```

##### isVisible

```ts
isVisible: boolean;
```

#### Example

```tsx
const ref = useRef(null);
const { isVisible } = useIntersectionObserver({
  ref,
  triggerOnce: true,
  callback: useCallback((entry) => console.log('Intersection changed', entry), []),
});

return <div ref={ref}>Observe me</div>;
```

***

### useMatchMedia()

#### useMatchMedia(props)

```ts
function useMatchMedia(props): boolean
```

Hook to determine if the current viewport matches a given media query or breakpoint.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | `object` | The props object. |
| `props.breakpoint` | \| `"mobile"` \| `"tablet"` \| `"tablet-up"` \| `"desktop"` \| `"desktop-down"` \| `"desktop-up"` \| `"hd"` | A predefined breakpoint key. |
| `props.onMatch`? | [`OnMediaMatch`](index.md#onmediamatch) | A callback function triggered when the media query matches. |

##### Returns

`boolean`

Whether the media query matches the current viewport.

##### Throws

If neither a valid breakpoint nor a query is provided.

##### Examples

```ts
// Using a predefined breakpoint
const isMobile = useMatchMedia({ breakpoint: 'mobile' });
```

```ts
// Using a custom media query
const isWideScreen = useMatchMedia({ query: '(min-width: 1200px)' });
```

```ts
// Using the onMatch callback
useMatchMedia({
  breakpoint: 'desktop',
  onMatch: useCallback((media) => console.log('Desktop view matched!', media), []),
});
```

#### useMatchMedia(props)

```ts
function useMatchMedia(props): boolean
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `object` |
| `props.onMatch`? | [`OnMediaMatch`](index.md#onmediamatch) |
| `props.query` | `string` |

##### Returns

`boolean`

***

### useOverlayUtils()

```ts
function useOverlayUtils(__namedParameters): object
```

Hook for managing overlay/modal utility functions with SSR support.
Handles scroll locking and portal rendering.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`UseOverlayUtilsConfig`](index.md#useoverlayutilsconfig) |

#### Returns

`object`

Utility values and refs

##### bodyRef

```ts
bodyRef: MutableRefObject<null | Element>;
```

##### renderPortal

```ts
renderPortal: boolean;
```

#### Example

```tsx
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { bodyRef, renderPortal } = useOverlayUtils({ isOpen });

  return renderPortal && createPortal(
    <div className="modal">
      Modal Content
    </div>,
    bodyRef.current
  );
};
```

***

### useResizeObserver()

```ts
function useResizeObserver<T>(ref, callback?): object
```

Custom hook to observe the resizing of a target element.
This hook sets up a ResizeObserver to monitor the size changes of a target element
and provides the current width and height of the element.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `Element` | The type of the element being observed. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ref` | `MutableRefObject`\<`null` \| `T`\> | Ref to the target element to observe. |
| `callback`? | (`entry`) => `void` | Optional callback function to run when the size of the target element changes. |

#### Returns

`object`

- Returns an object containing the current width and height of the target element.

##### height

```ts
height: number = 0;
```

##### width

```ts
width: number = 0;
```

#### Example

```tsx
const ref = useRef(null);
const size = useResizeObserver(ref, (entry) => {
  console.log('Resized', entry);
});

return <div ref={ref}>Resize me</div>;
```
