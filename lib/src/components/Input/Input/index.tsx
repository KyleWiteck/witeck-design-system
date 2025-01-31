import { ElementType, ForwardedRef, ReactNode, forwardRef, memo, useEffect, useRef, useState } from 'react';

import { OverridableComponent, Overwrite, PolymorphicProps, Simplify } from '../../../types';
import { PaddingCSSPropertiesUnion } from '../../../types/globalTypes';
import { classJoin } from '../../../utils';
import { Box, BoxProps, SprinklesProps } from '../../Box';
import { Flex, FlexProps } from '../../Flex';
import { InputVariants, inputRecipe } from '../styles.css';

type InputVariantsWithSprinklesProps = Simplify<Overwrite<SprinklesProps, Simplify<InputVariants>>>;

type Props = Omit<InputVariantsWithSprinklesProps, PaddingCSSPropertiesUnion> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconContainerProps?: BoxProps<'div'>;
  rightIconContainerProps?: BoxProps<'div'>;
  // autocomplete Ref https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  // does not inferred correctly by TS
  autoComplete?:
    | 'off'
    | 'on'
    | 'name'
    | 'given-name'
    | 'family-name'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'address-line1'
    | 'address-line2'
    | 'postal-code'
    | 'country-name'
    | 'cc-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-csc'
    | 'tel';
  containerElement?: FlexProps['element'];
};

type InputTypeMap = {
  props: Props;
  defaultComponent: 'input';
};

export type InputProps<Root extends ElementType = InputTypeMap['defaultComponent']> = PolymorphicProps<
  InputTypeMap,
  Root
>;

function InputImpl(props: InputProps, forwardedRef: ForwardedRef<Element>) {
  const {
    element,
    containerElement = 'div',
    variant = 'outlined',
    size = 'md',
    width = 'auto',
    style = {},
    minWidth,
    maxWidth,
    hasError = false,
    disabled = false,
    readOnly = false,
    leftIcon,
    rightIcon,
    className,
    height = 'fitContent',
    minHeight,
    maxHeight,
    leftIconContainerProps,
    rightIconContainerProps,
    ...otherProps
  } = props;

  const inputClassNames = inputRecipe({
    variant,
    size,
    disabled,
    readOnly,
    hasError
  });

  const leftIconRef = useRef<HTMLSpanElement>(null);
  const rightIconRef = useRef<HTMLSpanElement>(null);
  const [leftIconWidth, setLeftIconWidth] = useState<number | null>();
  const [reftIconWidth, setReftIconWidth] = useState<number | null>();

  const paddingHandler: Record<
    NonNullable<InputProps['size']>,
    { y: SprinklesProps['padding']; x: SprinklesProps['padding'] }
  > = {
    sm: { y: '1', x: '2' },
    md: { y: '2', x: '3' },
    lg: { y: '2', x: '3' },
    custom: { y: undefined, x: undefined }
  };

  useEffect(() => {
    if (leftIconRef.current && leftIcon) {
      setLeftIconWidth(leftIconRef.current.offsetWidth);
    } else if (leftIconWidth && !leftIcon) {
      setLeftIconWidth(null);
    }

    if (rightIconRef.current && rightIcon) {
      setReftIconWidth(rightIconRef.current.offsetWidth);
    } else if (reftIconWidth && !rightIcon) {
      setReftIconWidth(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftIconRef.current, leftIcon, rightIconRef.current, rightIcon]);

  return (
    <Flex
      element={containerElement}
      position="relative"
      flex="1"
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      style={{ boxSizing: 'border-box' }}
    >
      {leftIcon && (
        <Box
          ref={leftIconRef}
          element="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="full"
          width="auto"
          left="0px"
          top="0px"
          position="absolute"
          minWidth="8"
          maxWidth="10/12"
          color={readOnly || disabled || hasError ? 'neutral600' : 'primary'}
          {...leftIconContainerProps}
        >
          {leftIcon}
        </Box>
      )}
      <Box
        element={element ?? 'input'}
        flex="1"
        className={classJoin(inputClassNames, className)}
        paddingX={paddingHandler[size].x}
        paddingY={paddingHandler[size].y}
        height={height}
        minHeight={minHeight}
        maxHeight={maxHeight}
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        disabled={disabled}
        readOnly={readOnly}
        {...otherProps}
        style={{
          ...style,
          paddingLeft: leftIconWidth ? `${leftIconWidth}px` : undefined,
          paddingRight: reftIconWidth ? `${reftIconWidth}px` : undefined
        }}
        ref={forwardedRef}
      />
      {rightIcon && (
        <Box
          ref={rightIconRef}
          element="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="full"
          width="auto"
          right="0px"
          top="0px"
          position="absolute"
          minWidth="8"
          maxWidth="10/12"
          color={readOnly || disabled || hasError ? 'neutral600' : 'primary'}
          {...rightIconContainerProps}
        >
          {rightIcon}
        </Box>
      )}
    </Flex>
  );
}

export const Input = memo(forwardRef(InputImpl)) as OverridableComponent<InputTypeMap>;
