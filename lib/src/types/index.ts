/**
 * A collection of reusable utility type definitions.
 *
 * @module Types and Interfaces
 * */

export * from './components';
export * from './globalTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DictArray = Record<any, any>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dict = Record<any, any>;

export type StringDict = { [key: string]: string };

export type EnvironmentVariable = 'production' | 'development' | 'staging';

export type LabelValueOption = {
  label: string;
  value: string;
};

export interface LabelValueDict {
  label?: string;
  value: string | number;
  toString?: () => string;
}

export type Primitives = string | number | boolean | null | undefined | symbol | bigint;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownDict = Record<string | number, any>;

// Use `OmitFromKnownKeys` when the type extends Record (ie [s: string]: any).
// Most of the Shopper* types do this, so this is the workaround.
// https://github.com/microsoft/TypeScript/issues/31153#issuecomment-1074283505
export type NoIndex<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};
export type OnlyIndex<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T as {} extends Record<K, 1> ? K : never]: T[K];
};
export type OmitFromKnownKeys<T, K extends keyof NoIndex<T>> = Omit<NoIndex<T>, K> & OnlyIndex<T>;
