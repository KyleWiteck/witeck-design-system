import { ForwardedRef, forwardRef, memo } from 'react';

import { accessiblyHidden } from '../../../theme';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { FormFieldBasedContent, FormFieldHelperText, FormFieldLabelPattern, SharedFormFieldProps } from '../shared';
import { DefaultComponentProps } from './../../../types/components';

type Props = SharedFormFieldProps & {
  /**
   * The ID of the form field element this label is associated with.
   */
  htmlFor: string;
};

type FormFieldTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type FormFieldProps = DefaultComponentProps<FormFieldTypeMap>;

function FormFieldImpl(props: FormFieldProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const {
    label,
    htmlFor,
    hideLabel,
    required = false,
    disabled = false,
    helperText,
    hintText,
    errorMessage,
    actions,
    children,
    labelRightSideContent,
    disableErrorScrolling,
    ...otherProps
  } = props;

  const cursor = disabled ? 'not-allowed' : 'pointer';

  const hideLabelHandler = hideLabel ? accessiblyHidden : '';

  return (
    <Stack
      position="relative"
      alignItems="stretch"
      justifyContent="flex-start"
      {...otherProps}
      element="div"
      ref={forwardedRef}
    >
      <Text
        element="label"
        htmlFor={htmlFor}
        variant="label"
        cursor={cursor}
        display="flex"
        flexDirection="column"
        gap="2"
        textTransform="capitalize"
        className={hideLabelHandler}
      >
        <FormFieldLabelPattern required={required} label={label} labelRightSideContent={labelRightSideContent} />

        <FormFieldHelperText helperText={helperText} />
      </Text>

      <FormFieldBasedContent
        actions={actions}
        errorMessage={errorMessage}
        hintText={hintText}
        disableErrorScrolling={disableErrorScrolling}
      >
        {children}
      </FormFieldBasedContent>
    </Stack>
  );
}

export const FormField = memo(forwardRef(FormFieldImpl));
