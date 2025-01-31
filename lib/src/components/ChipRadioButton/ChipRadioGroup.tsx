import { ForwardedRef, forwardRef, useRef } from 'react';

import { useComposedRefs } from '../../hooks';
import { DefaultComponentProps } from '../../types';
import { SprinklesProps } from '../Box';
import { Flex } from '../Flex';
import { ChipRadioGroupContext } from './context';
import { RadioButtonVariants } from './styles.css';

type Props = SprinklesProps &
  RadioButtonVariants & {
    fullWidth?: boolean;
    name: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    isMultiSelectable?: boolean;
  };

type ChipRadioGroupTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type ChipRadioGroupProps = DefaultComponentProps<ChipRadioGroupTypeMap>;

function ChipRadioGroupImpl(props: ChipRadioGroupProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const {
    name,
    size = 'md',
    className,
    onChange,
    width = 'fitContent',
    children,
    isMultiSelectable,
    ...flexProps
  } = props;

  const chipSelectGroupRef = useRef<HTMLDivElement | null>(null);
  const composedRefs = useComposedRefs(forwardedRef, chipSelectGroupRef);

  return (
    <ChipRadioGroupContext.Provider
      value={{
        name,
        size,
        onChange,
        chipSelectGroupRef,
        isMultiSelectable
      }}
    >
      <Flex
        gap="3"
        width={width}
        {...flexProps}
        ref={composedRefs}
        role={!isMultiSelectable ? 'radiogroup' : undefined}
        className={className}
      >
        {children}
      </Flex>
    </ChipRadioGroupContext.Provider>
  );
}

/**
 * Chip Button Group
 *
 * A set of checkable buttons where no more than one of the buttons can be checked at a time.
 *
 * Adheres to the Radio Group WAI-ARIA design pattern,
 * and uses roving tabindex to manage focus movement among radio items.
 *
 * - Full keyboard navigation.
 * - Supports "fitContent" and "fullWidth"
 * - Can be controlled or uncontrolled.
 *
 * @a11y https://www.w3.org/WAI/ARIA/apg/patterns/radio/
 */
export const ChipRadioGroup = forwardRef(ChipRadioGroupImpl);
