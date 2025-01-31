import { ForwardedRef, forwardRef, memo } from 'react';

import { DefaultComponentProps, Overwrite, Simplify } from '../../../types';
import { PaddingCSSPropertiesUnion } from '../../../types/globalTypes';
import { classJoin } from '../../../utils';
import { Box, SprinklesProps } from '../../Box';
import { InputVariants, inputRecipe } from '../styles.css';

type TextareaVariantsWithSprinklesProps = Overwrite<SprinklesProps, InputVariants>;

type Props = Omit<TextareaVariantsWithSprinklesProps, PaddingCSSPropertiesUnion>;

type TextareaTypeMap = {
  props: Props;
  defaultComponent: 'textarea';
};

export type TextareaProps = Simplify<Omit<DefaultComponentProps<TextareaTypeMap>, 'children'>>;

function TextareaImpl(props: TextareaProps, forwardedRef: ForwardedRef<HTMLTextAreaElement>) {
  const {
    variant = 'outlined',
    size = 'md',
    hasError = false,
    disabled = false,
    readOnly = false,
    className,
    ...otherProps
  } = props;

  const textareaClassNames = inputRecipe({
    variant,
    size,
    disabled,
    readOnly,
    hasError
  });

  const paddingHandler: Record<
    NonNullable<TextareaProps['size']>,
    { y: SprinklesProps['padding']; x: SprinklesProps['padding'] }
  > = {
    sm: { y: '1', x: '2' },
    md: { y: '2', x: '3' },
    lg: { y: '2', x: '3' },
    custom: { y: undefined, x: undefined }
  };

  return (
    <Box
      element="textarea"
      className={classJoin(textareaClassNames, className)}
      width="full"
      paddingX={paddingHandler[size].x}
      paddingY={paddingHandler[size].y}
      disabled={disabled}
      readOnly={readOnly}
      lineHeight="6xl"
      {...otherProps}
      ref={forwardedRef}
    />
  );
}

export const Textarea = memo(forwardRef(TextareaImpl));
