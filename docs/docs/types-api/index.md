# Types API Reference

A collection of reusable utility type definitions.

## Interfaces

### LabelValueDict

#### Properties

##### label?

```ts
optional label: string;
```

##### toString()?

```ts
optional toString: () => string;
```

###### Returns

`string`

##### value

```ts
value: string | number;
```

***

### OverridableComponent()\<M\>

A component whose root component can be controlled via an `element` prop.

Adjusts valid props based on the type of `element`.

#### Type Parameters

• **M** *extends* [`OverridableTypeMap`](index.md#overridabletypemap)

```ts
interface OverridableComponent<C>(props): null | Element
```

A component whose root component can be controlled via an `element` prop.

Adjusts valid props based on the type of `element`.

#### Type Parameters

• **C** *extends* `ElementType`\<`any`, keyof `IntrinsicElements`\>

#### Parameters

• **props**: `object` & `BaseProps`\<`M`\> & `DistributiveOmit`\<`ComponentPropsWithRef`\<`C`\>, keyof `BaseProps`\<`M`\>\>

#### Returns

`null` \| `Element`

```ts
interface OverridableComponent(props): null | Element
```

A component whose root component can be controlled via an `element` prop.

Adjusts valid props based on the type of `element`.

#### Parameters

• **props**: [`DefaultComponentProps`](index.md#defaultcomponentpropsm)\<`M`\>

#### Returns

`null` \| `Element`

#### Properties

##### propTypes?

```ts
optional propTypes: any;
```

***

### OverridableTypeMap

#### Properties

##### defaultComponent

```ts
defaultComponent: ElementType<any, keyof IntrinsicElements>;
```

##### props

```ts
props: object;
```

## Type Aliases

### BorderCSSProperties

```ts
type BorderCSSProperties: Extract<SprinklesCSSProperties, "border" | "borderRadius" | "borderBottom" | "borderTop"> | "borderRight" | "borderLeft";
```

***

### DefaultComponentProps\<M\>

```ts
type DefaultComponentProps<M>: BaseProps<M> & DistributiveOmit<React.ComponentPropsWithRef<M["defaultComponent"]>, keyof BaseProps<M>>;
```

Props if `element={Component}` is NOT used.

#### Type Parameters

• **M** *extends* [`OverridableTypeMap`](index.md#overridabletypemap)

***

### Dict

```ts
type Dict: Record<any, any>;
```

***

### DictArray

```ts
type DictArray: Record<any, any>[];
```

***

### EnvironmentVariable

```ts
type EnvironmentVariable: "production" | "development" | "staging";
```

***

### FlexCSSProperties

```ts
type FlexCSSProperties: Extract<SprinklesCSSProperties, 
  | "flexDirection"
  | "flex"
  | "flexGrow"
  | "flexShrink"
  | "flexBasis"
  | "justifySelf"
  | "alignSelf"
| "order">;
```

***

### FontCSSProperties

```ts
type FontCSSProperties: Extract<SprinklesCSSProperties, 
  | "fontSize"
  | "fontFamily"
  | "fontWeight"
  | "lineHeight"
  | "letterSpacing"
  | "wordSpacing"
  | "fontStyle"
  | "textAlign"
  | "textDecoration"
  | "textTransform"
  | "textOverflow"
  | "whiteSpace"
| "color">;
```

***

### HeightCSSProperties

```ts
type HeightCSSProperties: Extract<SprinklesCSSProperties, "height" | "minHeight" | "maxHeight">;
```

***

### LabelValueOption

```ts
type LabelValueOption: object;
```

#### Type declaration

##### label

```ts
label: string;
```

##### value

```ts
value: string;
```

***

### MarginCSSProperties

```ts
type MarginCSSProperties: Extract<SprinklesCSSProperties, "margin" | "marginBottom" | "marginTop"> | "marginRight" | "marginLeft";
```

***

### NoIndex\<T\>

```ts
type NoIndex<T>: { [K in keyof T as Object extends Record<K, 1> ? never : K]: T[K] };
```

#### Type Parameters

• **T**

***

### OmitFromKnownKeys\<T, K\>

```ts
type OmitFromKnownKeys<T, K>: Omit<NoIndex<T>, K> & OnlyIndex<T>;
```

#### Type Parameters

• **T**

• **K** *extends* keyof [`NoIndex`](index.md#noindext)\<`T`\>

***

### OnlyIndex\<T\>

```ts
type OnlyIndex<T>: { [K in keyof T as Object extends Record<K, 1> ? K : never]: T[K] };
```

#### Type Parameters

• **T**

***

### OverflowCSSPropertiesUnion

```ts
type OverflowCSSPropertiesUnion: Extract<SprinklesCSSProperties, "overflow" | "overflowY" | "overflowX">;
```

***

### Overwrite\<T, U\>

```ts
type Overwrite<T, U>: DistributiveOmit<T, keyof U> & U;
```

Like `T & U`, but using the value types from `U` where their properties overlap.

#### Type Parameters

• **T**

• **U**

***

### PaddingCSSPropertiesUnion

```ts
type PaddingCSSPropertiesUnion: Extract<SprinklesCSSProperties, 
  | "padding"
  | "paddingX"
  | "paddingY"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | "paddingStart"
| "paddingEnd">;
```

***

### PolymorphicProps\<TypeMap, RootComponent\>

```ts
type PolymorphicProps<TypeMap, RootComponent>: TypeMap["props"] & DistributiveOmit<React.ComponentPropsWithRef<RootComponent>, keyof TypeMap["props"]> & object;
```

Own props of the component augmented with props of the root component.

#### Type declaration

##### element?

```ts
optional element: React.ElementType;
```

#### Type Parameters

• **TypeMap** *extends* [`OverridableTypeMap`](index.md#overridabletypemap)

• **RootComponent** *extends* `React.ElementType`

***

### PositionCSSPropertiesUnion

```ts
type PositionCSSPropertiesUnion: Extract<SprinklesCSSProperties, 
  | "left"
  | "right"
  | "top"
  | "bottom"
| "position">;
```

***

### Primitives

```ts
type Primitives: 
  | string
  | number
  | boolean
  | null
  | undefined
  | symbol
  | bigint;
```

***

### Simplify\<T\>

```ts
type Simplify<T>: T extends Function ? T : { [K in keyof T]: T[K] };
```

Simplifies the display of a type (without modifying it).
Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/

#### Type Parameters

• **T**

***

### StringDict

```ts
type StringDict: object;
```

#### Index Signature

 \[`key`: `string`\]: `string`

***

### UnknownDict

```ts
type UnknownDict: Record<string | number, any>;
```

***

### WidthCSSProperties

```ts
type WidthCSSProperties: Extract<SprinklesCSSProperties, "width" | "minWidth" | "maxWidth">;
```
