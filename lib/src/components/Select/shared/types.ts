import { ReactNode } from 'react';

import {
  BorderCSSProperties,
  FontCSSProperties,
  HeightCSSProperties,
  MarginCSSProperties,
  OverflowCSSPropertiesUnion,
  Overwrite,
  PaddingCSSPropertiesUnion,
  PositionCSSPropertiesUnion,
  WidthCSSProperties
} from '../../../types';
import { InputProps } from '../../Input';
import { StackProps } from '../../Stack';
import { TextProps } from '../../Text';

export interface OverridableSelectOptionProp<Props> {
  <Opt extends SelectOption>(
    props: Overwrite<
      Props,
      {
        options?: Opt[];
        renderOptionLabel: (option: Opt, ellipsisTextProps: TextProps<'span'>) => ReactNode;
        onSelect: (option: Opt) => void;
        onRemove?: (option: Opt) => void;
        value?: Opt[] | Opt;
        optionIdKey: keyof Opt;
      }
    >
  ): JSX.Element | null;
}

export type SelectOption = Record<PropertyKey, unknown>;

export interface SharedSelectProps {
  /**
   * The options available for selection.
   */
  options?: SelectOption[];
  /**
   * Placeholder text for the select input.
   */
  placeholder?: string;
  /**
   * Indicates if multiple selections are allowed.
   */
  isMultiSelectable?: boolean;
  /**
   * The key that should be used as an id. This is used internally for referencing options.
   * The value that belongs to that key should be a string or a number
   */
  optionIdKey: string;
  /**
   * Triggers the disabled state.
   */
  disabled?: boolean;
  /**
   * Triggers the error state.
   */
  hasError?: boolean;
  /**
   * Triggers the loading state.
   */
  isLoading?: boolean;
  /**
   * The currently selected value of the select.
   */
  noOptionsFallbackMessage?: ReactNode;
  /**
   * Sets the width of the components container.
   */
  width?: StackProps['width'];
  /**
   * Sets the min width of the components container.
   */
  minWidth?: StackProps['minWidth'];
  /**
   * Sets the max width of the components container.
   */
  maxWidth?: StackProps['maxWidth'];
  /**
   * The variant of the select input.
   */
  variant?: InputProps['variant'];
  /**
   * The size of the select input.
   */
  size?: InputProps['size'];
  /**
   * The currently selected value(s).
   */
  value?: SelectOption[] | SelectOption;
  /**
   * Callback function triggered when an option is selected.
   */
  onSelect: (option: SelectOption) => void;
  /**
   * Callback function triggered when an option is removed.
   */
  onRemove?: (option: SelectOption) => void;
  /**
   * Function to render the label for an option.
   */
  renderOptionLabel: (option: SelectOption, ellipsisTextProps: TextProps<'span'>) => ReactNode | null;
  /**
   * Props for the container element.
   */
  containerProps?: Omit<StackProps, 'element' | 'ref' | WidthCSSProperties>;
  /**
   * This is used to set a custom react portal element
   */
  portalElementOverride?: Element | DocumentFragment | null;
  /**
   * Enables the select chips to be in a scroll box of a internally fixed height
   */
  hasMultiSelectScrollBox?: boolean;
}

export type SelectTriggerProps<T extends 'button' | 'input'> = Omit<InputProps<T>, OmitSelectInputProps>;

export type OmitSelectInputProps =
  | 'hasErrors'
  | 'size'
  | 'variant'
  | 'onBlur'
  | 'value'
  | 'defaultValue'
  | 'element'
  | 'aria-autocomplete'
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-label'
  | 'role'
  | 'width'
  | 'rightIcon'
  | 'onChange'
  | 'overflow'
  | 'textOverflow'
  | 'rightIconContainerProps'
  | 'leftIcon'
  | 'leftIconContainerProps'
  | 'onClick'
  | 'autoComplete'
  | 'type'
  | 'cursor'
  | 'readOnly'
  | 'placeholder'
  | 'containerElement'
  | 'onReset'
  | FontCSSProperties
  | MarginCSSProperties
  | BorderCSSProperties
  | WidthCSSProperties
  | PositionCSSPropertiesUnion
  | OverflowCSSPropertiesUnion
  | PaddingCSSPropertiesUnion
  | HeightCSSProperties;
