# Utilities API Reference

A collection of reusable helper functions, that allow you to encapsulate and
share logic across multiple components.

## Interfaces

### addUniqueOptionBasedOnKeyConfig\<opt\>

#### Type Parameters

• **opt** _extends_ `SelectOption`

#### Properties

##### current?

```ts
optional current: opt[];
```

##### key

```ts
key: string;
```

##### newItem

```ts
newItem: opt;
```

## Type Aliases

### ErrorCatcherComponent\<E\>

```ts
type ErrorCatcherComponent<E>: FunctionComponent<object & Partial<Record<string, unknown>>>;
```

#### Type Parameters

• **E** _extends_ `Error`

---

### ThemeColor

```ts
type ThemeColor: keyof typeof color;
```

## Variables

### breakPoints

```ts
const breakPoints: object;
```

Responsive breakpoints are essential for defining styles that adapt to different
screen sizes in your application.

These breakpoints are made available to support scenarios where you need to
create responsive styles outside of the design system. To utilize these
breakpoints effectively, we recommend using them in conjunction with the
@vanilla-extract/css library.

#### Type declaration

| Name      | Type     | Default value |
| --------- | -------- | ------------- |
| `desktop` | `number` | 1024          |
| `hd`      | `number` | 1920          |
| `tablet`  | `number` | 768           |

#### Example

This is using the style function provided by Vanilla Extract

```ts
export const desktopLogo = style({
  width: '265px',
  marginLeft: '-16px',
  '@media': {
    [`screen and (min-width: ${breakPoints.tablet}px)`]: {
      width: '265px',
      marginLeft: '-10px',
      marginTop: '-15px'
    },
    'screen and (min-width: 920px)': {
      width: '340px',
      marginTop: '-3px'
    }
  }
});
```

---

### ease

```ts
const ease: object;
```

Collection of easing functions for animation timing. Each function transforms
linear progress (0-1) into eased progress.

#### Type declaration

| Name       | Type     | Description                                |
| ---------- | -------- | ------------------------------------------ |
| `inQuad`   | `number` | Quadratic ease-in - Accelerates from start |
| `inQuart`  | `number` | Quartic ease-in - Stronger acceleration    |
| `outQuad`  | `number` | Quadratic ease-out - Decelerates to end    |
| `outQuart` | `number` | Quartic ease-out - Stronger deceleration   |

#### See

[https://easings.net/](https://easings.net/) for visual examples

---

### ellipsisTextProps

```ts
const ellipsisTextProps: TextProps<"span">;
```

Preset text properties that enable single-line text truncation with ellipsis.
Ensures consistent text overflow handling across components while maintaining
proper alignment and capitalization.

#### Example

```tsx
<Text {...ellipsisTextProps}>This long text will truncate with ellipsis</Text>
```

---

### themeValues

```ts
const readonly themeValues: object;
```

Comprehensive design system tokens defining the visual foundation. Includes
spacing, typography, colors, shadows, and other core values. This is what
[Sprinkles](/docs/guides/styles-and-theming/sprinkles) are built on.

#### Type declaration

| Name                    | Type     | Default value                        | Description                                                                |
| ----------------------- | -------- | ------------------------------------ | -------------------------------------------------------------------------- |
| `aspectRatio`           | `object` | -                                    | -                                                                          |
| `aspectRatio.1:1`       | `string` | '1 / 1'                              | -                                                                          |
| `aspectRatio.16:9`      | `string` | '9 / 16'                             | -                                                                          |
| `aspectRatio.2:1`       | `string` | '2/1'                                | -                                                                          |
| `aspectRatio.3:2`       | `string` | '2 / 3'                              | -                                                                          |
| `aspectRatio.4:3`       | `string` | '3 / 4'                              | -                                                                          |
| `aspectRatio.auto`      | `string` | 'auto'                               | -                                                                          |
| `backdropFilter`        | `object` | -                                    | -                                                                          |
| `backdropFilter.base`   | `string` | 'blur(2px)'                          | -                                                                          |
| `border`                | `object` | -                                    | Borders & radius                                                           |
| `border.0px`            | `string` | '0px'                                | -                                                                          |
| `border.1px`            | `string` | '1px solid'                          | -                                                                          |
| `border.2px`            | `string` | '2px solid'                          | -                                                                          |
| `border.none`           | `string` | '0'                                  | -                                                                          |
| `borderRadius`          | `object` | -                                    | -                                                                          |
| `borderRadius.base`     | `string` | '4px'                                | -                                                                          |
| `borderRadius.full`     | `string` | '100%'                               | -                                                                          |
| `borderRadius.none`     | `string` | '0px'                                | -                                                                          |
| `borderRadius.rounder`  | `string` | '6px'                                | -                                                                          |
| `boxShadow`             | `object` | -                                    | Misc                                                                       |
| `boxShadow.base`        | `string` | -                                    | -                                                                          |
| `boxShadow.high`        | `string` | -                                    | -                                                                          |
| `boxShadow.medium`      | `string` | -                                    | -                                                                          |
| `boxShadow.none`        | `string` | 'none'                               | -                                                                          |
| `color`                 | `object` | -                                    | -                                                                          |
| `color.black`           | `string` | colorOptions.baseColors.neutral900   | -                                                                          |
| `color.border`          | `string` | colorOptions.baseColors.neutral200   | -                                                                          |
| `color.border2`         | `string` | colorOptions.baseColors.neutral300   | -                                                                          |
| `color.current`         | `string` | 'currentColor'                       | -                                                                          |
| `color.error`           | `string` | -                                    | -                                                                          |
| `color.errorDark`       | `string` | -                                    | -                                                                          |
| `color.errorLight`      | `string` | -                                    | -                                                                          |
| `color.errorTint`       | `string` | -                                    | -                                                                          |
| `color.info`            | `string` | -                                    | -                                                                          |
| `color.infoDark`        | `string` | -                                    | -                                                                          |
| `color.infoLight`       | `string` | -                                    | -                                                                          |
| `color.infoTint`        | `string` | -                                    | -                                                                          |
| `color.inherit`         | `string` | 'inherit'                            | -                                                                          |
| `color.masterPrimary`   | `string` | '#293F96'                            | -                                                                          |
| `color.neutral100`      | `string` | -                                    | -                                                                          |
| `color.neutral200`      | `string` | -                                    | -                                                                          |
| `color.neutral300`      | `string` | -                                    | -                                                                          |
| `color.neutral400`      | `string` | -                                    | -                                                                          |
| `color.neutral500`      | `string` | -                                    | -                                                                          |
| `color.neutral600`      | `string` | -                                    | -                                                                          |
| `color.neutral700`      | `string` | -                                    | -                                                                          |
| `color.neutral800`      | `string` | -                                    | -                                                                          |
| `color.neutral900`      | `string` | -                                    | -                                                                          |
| `color.overlay`         | `string` | -                                    | -                                                                          |
| `color.primary`         | `string` | colorOptions.baseColors.primary500   | -                                                                          |
| `color.primary100`      | `string` | -                                    | -                                                                          |
| `color.primary200`      | `string` | -                                    | -                                                                          |
| `color.primary300`      | `string` | -                                    | -                                                                          |
| `color.primary400`      | `string` | -                                    | -                                                                          |
| `color.primary500`      | `string` | -                                    | -                                                                          |
| `color.primary600`      | `string` | -                                    | -                                                                          |
| `color.primary700`      | `string` | -                                    | -                                                                          |
| `color.primary800`      | `string` | -                                    | -                                                                          |
| `color.primary900`      | `string` | -                                    | -                                                                          |
| `color.secondary`       | `string` | colorOptions.baseColors.secondary500 | -                                                                          |
| `color.secondary100`    | `string` | -                                    | -                                                                          |
| `color.secondary200`    | `string` | -                                    | -                                                                          |
| `color.secondary300`    | `string` | -                                    | -                                                                          |
| `color.secondary400`    | `string` | -                                    | -                                                                          |
| `color.secondary500`    | `string` | -                                    | -                                                                          |
| `color.secondary600`    | `string` | -                                    | -                                                                          |
| `color.secondary700`    | `string` | -                                    | -                                                                          |
| `color.secondary800`    | `string` | -                                    | -                                                                          |
| `color.secondary900`    | `string` | -                                    | -                                                                          |
| `color.success`         | `string` | -                                    | -                                                                          |
| `color.successDark`     | `string` | -                                    | -                                                                          |
| `color.successLight`    | `string` | -                                    | -                                                                          |
| `color.successTint`     | `string` | -                                    | -                                                                          |
| `color.tertiary`        | `string` | colorOptions.baseColors.tertiary500  | -                                                                          |
| `color.tertiary100`     | `string` | -                                    | -                                                                          |
| `color.tertiary200`     | `string` | -                                    | -                                                                          |
| `color.tertiary300`     | `string` | -                                    | -                                                                          |
| `color.tertiary400`     | `string` | -                                    | -                                                                          |
| `color.tertiary500`     | `string` | -                                    | -                                                                          |
| `color.tertiary600`     | `string` | -                                    | -                                                                          |
| `color.tertiary700`     | `string` | -                                    | -                                                                          |
| `color.tertiary800`     | `string` | -                                    | -                                                                          |
| `color.tertiary900`     | `string` | -                                    | -                                                                          |
| `color.transparent`     | `string` | 'transparent'                        | -                                                                          |
| `color.warning`         | `string` | -                                    | -                                                                          |
| `color.warningDark`     | `string` | -                                    | -                                                                          |
| `color.warningLight`    | `string` | -                                    | -                                                                          |
| `color.warningTint`     | `string` | -                                    | -                                                                          |
| `color.white`           | `string` | '#fff'                               | -                                                                          |
| `fontFamily`            | `object` | -                                    | -                                                                          |
| `fontFamily.body`       | `string` | -                                    | -                                                                          |
| `fontFamily.heading`    | `string` | -                                    | -                                                                          |
| `fontSize`              | `object` | -                                    | -                                                                          |
| `fontSize.2xl`          | `string` | '1.5rem'                             | 24px                                                                       |
| `fontSize.2xs`          | `string` | '0.625rem'                           | 10px                                                                       |
| `fontSize.3xl`          | `string` | '1.75rem'                            | 28px                                                                       |
| `fontSize.4xl`          | `string` | '2rem'                               | 32px                                                                       |
| `fontSize.5xl`          | `string` | '2.5rem'                             | 40px                                                                       |
| `fontSize.6xl`          | `string` | '3rem'                               | 48px                                                                       |
| `fontSize.base`         | `string` | '1rem'                               | 16px                                                                       |
| `fontSize.inherit`      | `string` | 'inherit'                            | -                                                                          |
| `fontSize.lg`           | `string` | '1.125rem'                           | 18px                                                                       |
| `fontSize.sm`           | `string` | '0.875rem'                           | 14px                                                                       |
| `fontSize.xl`           | `string` | '1.3125rem'                          | 21px                                                                       |
| `fontSize.xs`           | `string` | '0.75rem'                            | 12px                                                                       |
| `fontWeight`            | `object` | -                                    | -                                                                          |
| `fontWeight.black`      | `string` | '900'                                | -                                                                          |
| `fontWeight.bold`       | `string` | '700'                                | -                                                                          |
| `fontWeight.extrabold`  | `string` | '800'                                | -                                                                          |
| `fontWeight.extralight` | `string` | '200'                                | -                                                                          |
| `fontWeight.inherit`    | `string` | 'inherit'                            | -                                                                          |
| `fontWeight.light`      | `string` | '300'                                | -                                                                          |
| `fontWeight.medium`     | `string` | '500'                                | -                                                                          |
| `fontWeight.normal`     | `string` | '400'                                | -                                                                          |
| `fontWeight.semibold`   | `string` | '600'                                | -                                                                          |
| `fontWeight.thin`       | `string` | '100'                                | -                                                                          |
| `gridRepeat`            | `object` | -                                    | Grid layout                                                                |
| `gridRepeat.1x`         | `string` | 'repeat(1, 1fr)'                     | -                                                                          |
| `gridRepeat.2x`         | `string` | 'repeat(2, 1fr)'                     | -                                                                          |
| `gridRepeat.3x`         | `string` | 'repeat(3, 1fr)'                     | -                                                                          |
| `gridRepeat.4x`         | `string` | 'repeat(4, 1fr)'                     | -                                                                          |
| `gridRepeat.5x`         | `string` | 'repeat(5, 1fr)'                     | -                                                                          |
| `gridRepeat.6x`         | `string` | 'repeat(6, 1fr)'                     | -                                                                          |
| `letterSpacing`         | `object` | -                                    | -                                                                          |
| `letterSpacing.base`    | `string` | '0.0125rem'                          | -                                                                          |
| `letterSpacing.normal`  | `string` | '0'                                  | -                                                                          |
| `letterSpacing.wide`    | `string` | '0.025em'                            | -                                                                          |
| `letterSpacing.wider`   | `string` | '0.05rem'                            | -                                                                          |
| `letterSpacing.widest`  | `string` | '0.0625rem'                          | -                                                                          |
| `lineHeight`            | `object` | -                                    | -                                                                          |
| `lineHeight.2xl`        | `string` | '1.33em'                             | 12px font size with 16px line height, 18px font size with 24px line height |
| `lineHeight.3xl`        | `string` | '1.36em'                             | 24px font size with 31px line height                                       |
| `lineHeight.4xl`        | `string` | '1.43em'                             | 14px font size with 20px line height                                       |
| `lineHeight.5xl`        | `string` | '1.48em'                             | 48px font size with 52px line height                                       |
| `lineHeight.6xl`        | `string` | '1.5em'                              | 16px font size with 24px line height                                       |
| `lineHeight.7xl`        | `string` | '1.6em'                              | 10px font size with 16px line height                                       |
| `lineHeight.8xl`        | `string` | '1.71em'                             | 14px font size with 24px line height                                       |
| `lineHeight.lg`         | `string` | '1.25em'                             | 16px font size with 20px line height                                       |
| `lineHeight.md`         | `string` | '1.19em'                             | 28px font size with 38px line height                                       |
| `lineHeight.none`       | `string` | '1em'                                | No additional line height                                                  |
| `lineHeight.normal`     | `string` | 'normal'                             | Default line height                                                        |
| `lineHeight.sm`         | `string` | '1.1em'                              | 40px font size with 44px line height                                       |
| `lineHeight.xl`         | `string` | '1.29em'                             | 21px font size with 31px line height                                       |
| `lineHeight.xs`         | `string` | '1.08em'                             | 32px font size with 38px line height                                       |
| `sizes`                 | `object` | -                                    | Container sizes                                                            |
| `sizes.2xl`             | `string` | '1536px'                             | -                                                                          |
| `sizes.lg`              | `string` | '1024px'                             | -                                                                          |
| `sizes.md`              | `string` | '768px'                              | -                                                                          |
| `sizes.sm`              | `string` | '640px'                              | -                                                                          |
| `sizes.xl`              | `string` | '1280px'                             | -                                                                          |
| `space`                 | `object` | -                                    | -                                                                          |
| `space.0`               | `string` | '0px'                                | -                                                                          |
| `space.0.5`             | `string` | '0.125rem'                           | 2px                                                                        |
| `space.1`               | `string` | '0.25rem'                            | 4px                                                                        |
| `space.1.25`            | `string` | '0.3125rem'                          | 5px                                                                        |
| `space.1.5`             | `string` | '0.375rem'                           | 6px                                                                        |
| `space.1/12`            | `string` | '8.333333%'                          | -                                                                          |
| `space.1/2`             | `string` | '50%'                                | -                                                                          |
| `space.1/3`             | `string` | '33.333333%'                         | -                                                                          |
| `space.1/4`             | `string` | '25%'                                | -                                                                          |
| `space.1/5`             | `string` | '20%'                                | -                                                                          |
| `space.1/6`             | `string` | '16.666667%'                         | -                                                                          |
| `space.10`              | `string` | '2.5rem'                             | 40px                                                                       |
| `space.10.5`            | `string` | '2.625rem'                           | 42px                                                                       |
| `space.10/12`           | `string` | '83.333333%'                         | -                                                                          |
| `space.100`             | `string` | '25rem'                              | 400px                                                                      |
| `space.11`              | `string` | '2.75rem'                            | 44px                                                                       |
| `space.11/12`           | `string` | '91.666667%'                         | -                                                                          |
| `space.112.5`           | `string` | '28.125rem'                          | 450px                                                                      |
| `space.12`              | `string` | '3rem'                               | 48px                                                                       |
| `space.125`             | `string` | '31.25rem'                           | 500px                                                                      |
| `space.13`              | `string` | '3.25rem'                            | 52px                                                                       |
| `space.14`              | `string` | '3.5rem'                             | 56px                                                                       |
| `space.15`              | `string` | '3.75rem'                            | 60px                                                                       |
| `space.150`             | `string` | '37.5rem'                            | 600px                                                                      |
| `space.16`              | `string` | '4rem'                               | 64px                                                                       |
| `space.18`              | `string` | '4.5rem'                             | 72px                                                                       |
| `space.2`               | `string` | '0.5rem'                             | 8px                                                                        |
| `space.2.5`             | `string` | '0.625rem'                           | 10px                                                                       |
| `space.2/12`            | `string` | '16.666667%'                         | -                                                                          |
| `space.2/3`             | `string` | '66.666667%'                         | -                                                                          |
| `space.2/4`             | `string` | '50%'                                | -                                                                          |
| `space.2/5`             | `string` | '40%'                                | -                                                                          |
| `space.2/6`             | `string` | '33.333333%'                         | -                                                                          |
| `space.20`              | `string` | '5rem'                               | 80px                                                                       |
| `space.200`             | `string` | '50rem'                              | 800px                                                                      |
| `space.22`              | `string` | '5.5rem'                             | 88px                                                                       |
| `space.24`              | `string` | '6rem'                               | 96px                                                                       |
| `space.256`             | `string` | '64rem'                              | 1024px                                                                     |
| `space.28`              | `string` | '7rem'                               | 112px                                                                      |
| `space.285`             | `string` | '71.25rem'                           | 1140px                                                                     |
| `space.3`               | `string` | '0.75rem'                            | 12px                                                                       |
| `space.3.25`            | `string` | '0.8125rem'                          | 13px                                                                       |
| `space.3.5`             | `string` | '0.875rem'                           | 14px                                                                       |
| `space.3/12`            | `string` | '25%'                                | -                                                                          |
| `space.3/4`             | `string` | '75%'                                | -                                                                          |
| `space.3/5`             | `string` | '60%'                                | -                                                                          |
| `space.3/6`             | `string` | '50%'                                | -                                                                          |
| `space.32`              | `string` | '8rem'                               | 128px                                                                      |
| `space.36`              | `string` | '9rem'                               | 144px                                                                      |
| `space.360`             | `string` | '90rem'                              | 1440px                                                                     |
| `space.4`               | `string` | '1rem'                               | 16px                                                                       |
| `space.4.5`             | `string` | '1.125rem'                           | 18px                                                                       |
| `space.4/12`            | `string` | '33.333333%'                         | -                                                                          |
| `space.4/5`             | `string` | '80%'                                | -                                                                          |
| `space.4/6`             | `string` | '66.666667%'                         | -                                                                          |
| `space.40`              | `string` | '10rem'                              | 160px                                                                      |
| `space.44`              | `string` | '11rem'                              | 176px                                                                      |
| `space.48`              | `string` | '12rem'                              | 192px                                                                      |
| `space.480`             | `string` | '120rem'                             | 1920px                                                                     |
| `space.5`               | `string` | '1.25rem'                            | 20px                                                                       |
| `space.5/12`            | `string` | '41.666667%'                         | -                                                                          |
| `space.5/6`             | `string` | '83.333333%'                         | -                                                                          |
| `space.52`              | `string` | '13rem'                              | 208px                                                                      |
| `space.56`              | `string` | '14rem'                              | 224px                                                                      |
| `space.6`               | `string` | '1.5rem'                             | 24px                                                                       |
| `space.6/12`            | `string` | '50%'                                | -                                                                          |
| `space.60`              | `string` | '15rem'                              | 240px                                                                      |
| `space.64`              | `string` | '16rem'                              | 256px                                                                      |
| `space.7`               | `string` | '1.75rem'                            | 28px                                                                       |
| `space.7/12`            | `string` | '58.333333%'                         | -                                                                          |
| `space.72`              | `string` | '18rem'                              | 288px                                                                      |
| `space.8`               | `string` | '2rem'                               | 32px                                                                       |
| `space.8/12`            | `string` | '66.666667%'                         | -                                                                          |
| `space.80`              | `string` | '20rem'                              | 320px                                                                      |
| `space.9`               | `string` | '2.25rem'                            | 36px                                                                       |
| `space.9/12`            | `string` | '75%'                                | -                                                                          |
| `space.96`              | `string` | '24rem'                              | 384px                                                                      |
| `space.auto`            | `string` | 'auto'                               | -                                                                          |
| `space.fitContent`      | `string` | 'fit-content'                        | -                                                                          |
| `space.full`            | `string` | '100%'                               | -                                                                          |
| `space.fullVH`          | `string` | '100vh'                              | -                                                                          |
| `space.fullVW`          | `string` | '100vw'                              | -                                                                          |
| `space.maxContent`      | `string` | 'max-content'                        | -                                                                          |
| `space.minContent`      | `string` | 'min-content'                        | -                                                                          |
| `space.px`              | `string` | '1px'                                | -                                                                          |
| `wordSpacing`           | `object` | -                                    | -                                                                          |
| `wordSpacing.base`      | `string` | '0.0125rem'                          | -                                                                          |
| `wordSpacing.normal`    | `string` | '0'                                  | -                                                                          |
| `wordSpacing.wide`      | `string` | '0.025em'                            | -                                                                          |
| `wordSpacing.wider`     | `string` | '0.05rem'                            | -                                                                          |
| `wordSpacing.widest`    | `string` | '0.0625rem'                          | -                                                                          |
| `zIndex`                | `object` | -                                    | -                                                                          |
| `zIndex.auto`           | `string` | 'auto'                               | -                                                                          |
| `zIndex.barely`         | `string` | '1'                                  | -                                                                          |
| `zIndex.base`           | `string` | '0'                                  | -                                                                          |
| `zIndex.drawer`         | `string` | '1380'                               | -                                                                          |
| `zIndex.dropdown`       | `string` | '10'                                 | -                                                                          |
| `zIndex.header`         | `string` | '1400'                               | -                                                                          |
| `zIndex.hidden`         | `string` | '-1'                                 | -                                                                          |
| `zIndex.modal`          | `string` | '1500'                               | -                                                                          |
| `zIndex.notification`   | `string` | '1700'                               | -                                                                          |
| `zIndex.overlay`        | `string` | '1420'                               | -                                                                          |
| `zIndex.tooltip`        | `string` | '20'                                 | -                                                                          |
| `zIndex.topmost`        | `string` | '1800'                               | -                                                                          |

#### Example

```ts
import { themeValues } from '@KyleWiteck/witeck-design/utils';

const styles = {
  padding: themeValues.space[4],
  color: themeValues.color.primary500,
  fontSize: themeValues.fontSize.base
};
```

## Functions

### addUniqueArrayItem()

```ts
function addUniqueArrayItem<T>(config): T[];
```

Manages unique items in an array by adding new items or removing duplicates.
Uses deep equality by default but supports custom comparators.

#### Type Parameters

• **T**

Type of array elements

#### Parameters

• **config**: `addUniqueArrayItemConfig`\<`T`\>

Configuration object

#### Returns

`T`[]

Updated array with item added or removed

#### Example

```ts
const arr = addUniqueArrayItem({
  current: [{ id: 1 }],
  newItem: { id: 2 },
  comparator: (a, b) => a.id === b.id
});
```

---

### addUniqueOptionBasedOnKey()

```ts
function addUniqueOptionBasedOnKey<T>(config): T[];
```

Configuration interface for managing unique options in selection components.
Enables toggle-like behavior where adding a duplicate item removes it instead.

#### Type Parameters

• **T** _extends_ `SelectOption`

#### Parameters

• **config**:
[`addUniqueOptionBasedOnKeyConfig`](index.md#adduniqueoptionbasedonkeyconfigopt)\<`T`\>

#### Returns

`T`[]

#### Example

```tsx
const config: addUniqueOptionBasedOnKeyConfig<SelectOption> = {
  current: selectedUsers,
  newItem: { id: '123', label: 'John Doe' },
  key: 'id'
};
```

---

### animate()

```ts
function animate(options): number;
```

Calculates animation progress for a single frame.

#### Parameters

• **options**

Animation configuration

• **options.duration?**: `number`

Animation duration in ms

• **options.easing?**

Easing function

• **options.pixels**: `number`

Total pixels to animate

• **options.startTime**: `number`

Animation start timestamp

• **options.timestamp**: `number`

Current frame timestamp

#### Returns

`number`

Calculated pixel value for current frame

---

### animationFrames()

```ts
function animationFrames(): AsyncGenerator<number, void, unknown>;
```

Generates an infinite sequence of animation frames using requestAnimationFrame.
Used to create smooth animations by yielding frame timings before browser
repaints.

#### Returns

`AsyncGenerator`\<`number`, `void`, `unknown`\>

Generator yielding frame timestamps

#### Example

```ts
for await (const timestamp of animationFrames()) {
  // Animate something each frame
}
```

---

### classJoin()

```ts
function classJoin(...classnames): string;
```

Joins multiple classNames into a single string, filtering out falsy values.
Ensures proper spacing between class names and handles conditional classes.

#### Parameters

• ...**classnames**: (`undefined` \| `null` \| `string` \| `false`)[]

Classes to combine

#### Returns

`string`

Combined class string with proper spacing

#### Example

```ts
classJoin('btn', isActive && 'active', isPrimary && 'primary');
// returns "btn active primary" if both conditions are true
```

---

### collapse()

```ts
function collapse(pixels, duration?): AsyncGenerator<number, void, unknown>;
```

Generator that animates a collapse effect over time. Yields decreasing values
from pixels to 0.

#### Parameters

• **pixels**: `number`

Starting height to collapse from

• **duration?**: `number`

#### Returns

`AsyncGenerator`\<`number`, `void`, `unknown`\>

#### Yields

Current height value

#### Example

```ts
for await (const height of collapse(200)) {
  element.style.height = `${height}px`;
}
```

---

### composeEventHandlers()

```ts
function composeEventHandlers<E>(
  originalEventHandler?,
  ourEventHandler?,
  checkForDefaultPrevented?
): (event) => void;
```

Composes two event handlers into a single function.

#### Type Parameters

• **E**

The event type.

#### Parameters

• **originalEventHandler?**

The original event handler.

• **ourEventHandler?**

The additional event handler to be executed.

• **checkForDefaultPrevented?**: `boolean` = `true`

Whether to check if `event.defaultPrevented` is set before calling
`ourEventHandler`.

#### Returns

`Function`

A function that calls both handlers in order, respecting `defaultPrevented` if
specified.

##### Parameters

• **event**: `E`

##### Returns

`void`

---

### determineTextColor()

```ts
function determineTextColor(backgroundColor): 'black' | 'white';
```

Calculates the optimal text color (black or white) for maximum readability
against a given background color. Supports both hex and rgba formats.

Following WCAG 2.0 guidelines for text contrast ratios (4.5:1 minimum).

#### Parameters

• **backgroundColor**: `string`

Background color in hex or rgba format

#### Returns

`"black"` \| `"white"`

Optimal text color for contrast

#### Example

```ts
determineTextColor('#000000'); // returns 'white'
determineTextColor('rgba(255, 255, 255, 0.9)'); // returns 'black'
```

---

### expand()

```ts
function expand(pixels, duration?): AsyncGenerator<number, void, unknown>;
```

Generator that animates an expand effect over time. Yields increasing values
from 0 to pixels.

#### Parameters

• **pixels**: `number`

Target height to expand to

• **duration?**: `number`

#### Returns

`AsyncGenerator`\<`number`, `void`, `unknown`\>

#### Yields

Current height value

#### Example

```ts
for await (const height of expand(200)) {
  element.style.height = `${height}px`;
}
```

---

### filterOptionsBySearchTerm()

```ts
function filterOptionsBySearchTerm<T>(config): T[];
```

Manages unique items in a selection array by toggling their presence. If an item
with the same key exists, it's removed; if not, it's added. Useful for
implementing multi-select with toggle behavior.

#### Type Parameters

• **T**

Type extending SelectOption interface

#### Parameters

• **config**

Toggle configuration

• **config.key**: keyof `T`

• **config.options?**: `T`[] = `[]`

• **config.searchTerm**: `string`

• **config.variant?**: `"includes"` \| `"startsWith"` = `'startsWith'`

#### Returns

`T`[]

Updated array with item either added or removed

#### Example

```tsx
const updatedSelection = addUniqueOptionBasedOnKey({
  current: selectedUsers,
  newItem: { id: '123', label: 'John Doe' },
  key: 'id'
});
```

---

### hexToRgbA()

```ts
function hexToRgbA(hex, transparency?): null | string;
```

Converts a hexadecimal color to RGBA format with optional transparency. Handles
both 3-digit and 6-digit hex codes, performing validation before conversion.

#### Parameters

• **hex**: `string`

Hexadecimal color code (e.g., "#FF0000" or "#F00")

• **transparency?**: `string` \| `number`

Opacity value between 0 and 1

#### Returns

`null` \| `string`

RGBA color string or null if invalid

#### Throws

If hex code is invalid

#### Example

```ts
hexToRgbA('#FF0000', 0.5); // returns "rgba(255, 0, 0, 0.5)"
hexToRgbA('#F00'); // returns "rgba(255, 0, 0, 1)"
```

---

### isKeyOf()

```ts
function isKeyOf<R>(record, key): key is keyof R;
```

Type guard. Determines whether an object has a property with the specified name.

#### Type Parameters

• **R** _extends_ `Record`\<`PropertyKey`, `unknown`\>

#### Parameters

• **record**: `R`

• **key**: `unknown`

#### Returns

`key is keyof R`

---

### isNonNullable()

```ts
function isNonNullable<T>(item): item is T;
```

Type guard that ensures a value is neither null nor undefined. Useful for
filtering out null values from arrays or validating optional props.

#### Type Parameters

• **T**

#### Parameters

• **item**: `undefined` \| `null` \| `T`

Value to check

#### Returns

`item is T`

True if value is neither null nor undefined

#### Example

```ts
const items = ['a', null, 'b', undefined].filter(isNonNullable);
// items = ['a', 'b']
```

---

### isOutOfViewport()

```ts
function isOutOfViewport(elem): object;
```

Determines if an HTML element is partially or fully outside the viewport.
Calculates visibility status for each edge and provides aggregate checks.

#### Parameters

• **elem**: `HTMLElement`

Element to check

#### Returns

`object`

Visibility status for each edge and aggregate states

| Name     | Type      |
| -------- | --------- |
| `all`    | `boolean` |
| `any`    | `boolean` |
| `bottom` | `boolean` |
| `left`   | `boolean` |
| `right`  | `boolean` |
| `top`    | `boolean` |

#### Example

```ts
const status = isOutOfViewport(myElement);
if (status.any) {
  // Element is partially outside viewport
}
```

---

### lightenColor()

```ts
function lightenColor(color, percent): string;
```

Lightens a hexadecimal color by a specified percentage. Adjusts RGB values while
maintaining color balance and preventing overflow.

#### Parameters

• **color**: `string`

Hexadecimal color to lighten

• **percent**: `number`

Percentage to lighten (0-100)

#### Returns

`string`

Lightened color in hex format

#### Example

```ts
lightenColor('#000000', 50); // returns "#7F7F7F"
lightenColor('#FF0000', 20); // returns "#FF3333"
```

---

### RefProvider()

```ts
function RefProvider<T>(props): Element;
```

Provider component that shares a ref value with its descendants.

#### Type Parameters

• **T**

Type of the ref value

#### Parameters

• **props**: `RefProviderProps`\<`T`\>

Provider configuration

#### Returns

`Element`

#### Example

```tsx
const myRef = useRef<HTMLDivElement>(null);

return (
  <RefProvider refValue={myRef}>
    <ChildComponent />
  </RefProvider>
);
```

---

### setFocusByRef()

```ts
function setFocusByRef(elementRef): void;
```

Sets focus on an element referenced by a React ref. Safely handles
null/undefined refs.

#### Parameters

• **elementRef**: `RefObject`\<`HTMLElement`\>

Reference to target element

#### Returns

`void`

#### Example

```tsx
const myRef = useRef<HTMLButtonElement>(null);
setFocusByRef(myRef); // Focuses the button
```

---

### useRefValue()

```ts
function useRefValue<T>(): MutableRefObject<null | T>;
```

Hook to access a ref value from the nearest RefProvider ancestor.

#### Type Parameters

• **T**

Type of the ref value

#### Returns

`MutableRefObject`\<`null` \| `T`\>

Shared ref object

#### Example

```tsx
const divRef = useRefValue<HTMLDivElement>();

useEffect(() => {
  if (divRef.current) {
    divRef.current.focus();
  }
}, []);
```

---

### withErrorCatch()

```ts
function withErrorCatch<ErrorType, C>(
  Component,
  shouldCatch?,
  onError?
): (props) => Element;
```

Functional react components as Error Boundaries.

#### Type Parameters

• **ErrorType** _extends_ `Error`

• **C** _extends_
[`ErrorCatcherComponent`](index.md#errorcatchercomponente)\<`ErrorType`\>

#### Parameters

• **Component**: `C`

Functional error boundary component.

• **shouldCatch?**: `ShouldCatch`\<`ErrorType`\>

Function that validates if a given error should be caught by the current error
boundary. If no callback is provided the boundary will catch all errors.

• **onError?**: `ErrorHandler`\<`ErrorType`\>

An optional callback that is executed when an error is caught.

#### Returns

`Function`

##### Parameters

• **props**: `Omit`\<`PropsWithChildren`\<`ComponentProps`\<`C`\>\>, `"error"`\>

##### Returns

`Element`

#### Example

```tsx
// Only catch not found errors in this component.
const shouldCatch = (error: Error) => error instanceof NotFound;

const NotFoundRateCard = withErrorCatch(({ error, children }) => {
  if (error) {
    return <Text color="error">{error.message}</Text>;
  }
  return children;
}, shouldCatch);
```
