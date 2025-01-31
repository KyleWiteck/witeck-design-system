import { ReactNode, useEffect, useRef } from 'react';

import { Overwrite } from '../../types/components';
import { SprinklesProps } from '../Box';
import { Flex, FlexProps } from '../Flex';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { Stack } from '../Stack';
import { Text } from '../Text';

export type SharedFormFieldProps = Overwrite<
  SprinklesProps,
  {
    /**
     * The label text for the form field.
     */
    label: ReactNode;
    /**
     * The ID of the form field element this label is associated with.
     */
    isFieldset?: boolean;
    /**
     * If `true`, the label will be visually hidden but still accessible to screen readers.
     */
    hideLabel?: boolean;
    /**
     * If `true`, the field is required.
     */
    required?: boolean;
    /**
     * If `true`, the field is disabled.
     */
    disabled?: boolean;
    /**
     * Helper text to provide additional information about the field.
     */
    helperText?: string;
    /**
     * Hint text to provide a hint or suggestion about the field.
     */
    hintText?: string;
    /**
     * Error message to display when there is an error with the field's value.
     */
    errorMessage?: string;
    /**
     * Action for the form field.
     */
    actions?: ReactNode;
    /**
     * Action for the form field.
     */
    labelRightSideContent?: ReactNode;
    /**
     * The content of the form field.
     */
    children: ReactNode;
    /**
     * Disables the auto scrolling when there is an error message
     */
    disableErrorScrolling?: boolean;
  }
>;

export const FormFieldLabelPattern = (
  props: Pick<SharedFormFieldProps, 'required' | 'label' | 'labelRightSideContent'> & FlexProps
) => {
  const { required, label, labelRightSideContent, ...flexProps } = props;

  return (
    <Flex element="span" {...flexProps}>
      {required && (
        <Text element="span" marginLeft="1" variant="custom" fontSize="lg" color="error">
          *
        </Text>
      )}
      {<ReactNodeStringHandler flex="1">{label}</ReactNodeStringHandler>}
      {labelRightSideContent}
    </Flex>
  );
};

export const FormFieldHelperText = (props: Pick<SharedFormFieldProps, 'helperText'>) => {
  const { helperText } = props;

  if (!helperText) return null;

  return (
    <Text element="span" variant="caption" color="neutral500">
      {helperText}
    </Text>
  );
};

export const FormFieldBasedContent = (
  props: Pick<SharedFormFieldProps, 'children' | 'actions' | 'errorMessage' | 'hintText' | 'disableErrorScrolling'>
) => {
  const { children, actions, errorMessage, hintText, disableErrorScrolling } = props;
  const errorMessageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (errorMessageRef.current && !disableErrorScrolling) {
      // Scroll to the error message
      errorMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <Stack element="span">
      {children}
      {actions}
      {errorMessage && (
        <Text ref={errorMessageRef} element="span" variant="caption" color="error">
          {errorMessage}
        </Text>
      )}
      {!errorMessage && hintText && (
        <Text element="span" variant="caption" color="neutral500">
          {hintText}
        </Text>
      )}
    </Stack>
  );
};
