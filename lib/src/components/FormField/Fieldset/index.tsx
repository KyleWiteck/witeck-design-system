import { ForwardedRef, forwardRef, memo } from 'react';

import { Box } from '../../Box';
import { Text } from '../../Text';
import { FormFieldBasedContent, FormFieldHelperText, FormFieldLabelPattern, SharedFormFieldProps } from '../shared';
import { accessiblyHidden } from './../../../theme/utilClasses.css';
import { DefaultComponentProps } from './../../../types/components';

type Props = SharedFormFieldProps;

type FieldsetTypeMap = {
  props: Props;
  defaultComponent: 'fieldset';
};

export type FieldsetProps = DefaultComponentProps<FieldsetTypeMap>;

function FieldsetImpl(props: FieldsetProps, forwardedRef: ForwardedRef<HTMLFieldSetElement>) {
  const {
    label,
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
    <Box {...otherProps} element="fieldset" border="0px" ref={forwardedRef}>
      <Text
        element="legend"
        variant="label"
        cursor={cursor}
        display="flex"
        flexDirection="column"
        marginBottom="2"
        textTransform="capitalize"
        className={hideLabelHandler}
      >
        <FormFieldLabelPattern
          required={required}
          label={label}
          marginBottom={helperText ? '2' : undefined}
          labelRightSideContent={labelRightSideContent}
        />

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
    </Box>
  );
}

export const Fieldset = memo(forwardRef(FieldsetImpl));
