import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ChangeEvent, ForwardedRef, ReactNode, forwardRef, memo, useCallback, useEffect, useId, useRef } from 'react';

import { CheckboxBlankIcon, CheckboxIcon, CheckboxIndeterminateIcon, IconProps } from '../../icons';
import { DefaultComponentProps } from '../../types';
import { classJoin, themeValues } from '../../utils';
import { Flex, FlexProps } from '../Flex';
import { Text, TextProps } from '../Text';
import * as styles from './checkbox.css';

type CheckBoxSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<CheckBoxSize, keyof typeof themeValues.space> = {
  sm: '4',
  md: '5',
  lg: '6'
};

type Props = {
  id?: string;
  name?: string;
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  /** For uncontrolled behavior, does not support "indeterminate" */
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  /** For controlled behavior */
  onControlledChange?(checked: boolean | 'indeterminate'): void;
  size?: CheckBoxSize;
  /** Input label, render as child of a `<Text element="span"></Text>` */
  label?: ReactNode;
  /** Label props, represents a `label` tag  */
  labelProps?: TextProps<'label'>;
  /** Inner icon props, represents a `svg` tag  */
  iconProps?: IconProps;
  /** Wrapper props represents a `div` tag  */
  wrapperProps?: FlexProps;
  hasError?: boolean;
  required?: boolean;
};

const lineHeightMap: Record<NonNullable<CheckboxProps['size']>, TextProps<'span'>['lineHeight']> = {
  sm: 'xl',
  md: '2xl',
  lg: '4xl'
};

type CheckboxTypeMap = {
  props: Props;
  defaultComponent: 'button';
};

export type CheckboxProps = DefaultComponentProps<CheckboxTypeMap>;

function CheckboxImpl(props: CheckboxProps, forwardedRef: ForwardedRef<HTMLInputElement>) {
  const {
    id,
    size = 'md',
    label,
    name,
    onChange,
    onControlledChange,
    hasError = false,
    iconProps = {},
    labelProps = {},
    disabled = false,
    checked,
    required,
    defaultChecked,
    wrapperProps = {},
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const internalId = useId();
  const checkboxId = id ?? internalId;

  const onCheckedChange = useCallback(
    (value: boolean | 'indeterminate') => {
      if (onControlledChange) {
        onControlledChange(value);
        return;
      }
      // Workaround for react-hook-form uncontrolled checkbox
      if (onChange && inputRef.current) {
        // Forces checked to always be in sync
        inputRef.current.checked = inputRef.current.checked ?? (typeof value === 'boolean' && value);

        const fakeEvent = { target: inputRef.current } as ChangeEvent<HTMLInputElement>;
        onChange(fakeEvent);
      }
    },
    [onChange, onControlledChange]
  );

  const iconStyles = styles.iconRecipe({
    hasError
  });

  // Workaround for react-hook-form uncontrolled checkbox
  // See https://github.com/radix-ui/primitives/discussions/874
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const checkbox = wrapper.querySelector('input[type="checkbox"]');
    if (!checkbox || !(checkbox instanceof HTMLInputElement)) return;

    inputRef.current = checkbox;

    if (typeof forwardedRef === 'object' && forwardedRef) forwardedRef.current = checkbox;
    if (typeof forwardedRef === 'function') forwardedRef(checkbox);
  }, [forwardedRef]);

  return (
    <Flex
      alignItems="center"
      gap="2"
      {...wrapperProps}
      ref={wrapperRef}
      className={classJoin(styles.wrapper, wrapperProps.className)}
    >
      <RadixCheckbox.Root
        name={name}
        id={checkboxId}
        checked={checked}
        disabled={disabled}
        required={required}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        className={styles.indicator}
        {...otherProps}
      >
        <RadixCheckbox.Indicator forceMount>
          <CheckboxIcon
            {...iconProps}
            boxSize={sizeMap[size]}
            className={classJoin('checked-icon', iconStyles, iconProps.className)}
          />
          <CheckboxBlankIcon
            {...iconProps}
            boxSize={sizeMap[size]}
            className={classJoin('blank-icon', iconStyles, iconProps.className)}
          />
          <CheckboxIndeterminateIcon
            {...iconProps}
            boxSize={sizeMap[size]}
            className={classJoin('indeterminate-icon', iconStyles, iconProps.className)}
          />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Text
          className={classJoin(styles.label, disabled && 'disabled')}
          {...labelProps}
          tabIndex={-1}
          id={`${id}-label`}
          variant="custom"
          element="label"
          lineHeight={lineHeightMap[size]}
          fontSize="sm"
          textTransform="capitalize"
          htmlFor={checkboxId}
        >
          {label}
        </Text>
      )}
    </Flex>
  );
}

/**
 * Checkbox primitive (input element)
 * @requires `id` in order to work properly, you could use `useId` hook for client components.
 * @preserve
 */
export const Checkbox = memo(forwardRef(CheckboxImpl));
