import { ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { DefaultComponentProps, Overwrite, Simplify } from '../../types';
import { Box, SprinklesProps } from '../Box';
import { Flex, FlexProps } from '../Flex';
import { Text, TextProps } from '../Text';
import { RadioVariants, radioRecipe } from './radio.css';

type RadioVariantsWithSprinklesProps = Simplify<Overwrite<SprinklesProps, RadioVariants>>;

type Props = Overwrite<
  RadioVariantsWithSprinklesProps,
  {
    id: string;
    /** Input label, render as child of a `<Text element="span"></Text>` */
    label: ReactNode;
    /** Label props, represents a `label` tag  */
    labelProps?: Omit<FlexProps<'label'>, 'align' | 'textTransform' | 'gap'>;
    /** Inner text props, represents a `span` tag  */
    labelTextProps?: Omit<TextProps<'span'>, 'fontSize' | 'lineHeight' | 'variant'>;
  }
>;

type RadioTypeMap = {
  props: Props;
  defaultComponent: 'input';
};

export type RadioProps = DefaultComponentProps<RadioTypeMap>;

// TODO: Make radio work with SVGs like Checkbox
function RadioImpl(props: RadioProps, forwardedRef: ForwardedRef<HTMLInputElement>) {
  const {
    size = 'md',
    label,
    color = 'primary',
    hasError = false,
    labelProps = {},
    labelTextProps = {},
    disabled = false,
    ...otherProps
  } = props;

  const checkboxClassName = radioRecipe({
    size,
    hasError
  });

  const labelColor = disabled ? 'neutral400' : undefined;
  const cursor = disabled ? 'not-allowed' : 'pointer';

  return (
    <Flex element="label" align="center" gap="2.5" {...labelProps} style={{ cursor, ...labelProps?.style }}>
      <Box
        element="input"
        type="radio"
        color={color}
        className={checkboxClassName}
        {...otherProps}
        disabled={disabled}
        ref={forwardedRef}
      />
      {label && (
        <Text
          variant="custom"
          element="span"
          lineHeight="2xl"
          fontSize="sm"
          flex="1"
          color={labelColor}
          textTransform="capitalize"
          {...labelTextProps}
        >
          {label}
        </Text>
      )}
    </Flex>
  );
}

/**
 * Radio primitive (input element)
 * @requires `id` in order to work properly, you could use `useId` hook for client components.
 * @preserve
 */
export const Radio = memo(forwardRef(RadioImpl));
