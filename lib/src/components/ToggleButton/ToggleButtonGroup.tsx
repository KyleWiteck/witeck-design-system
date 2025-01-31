import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

import { useComposedRefs } from '../../hooks';
import { DefaultComponentProps } from '../../types';
import { classJoin } from '../../utils';
import { SprinklesProps } from '../Box';
import { Flex } from '../Flex';
import { ToggleButtonGroupContext } from './context';
import { ToggleButtonVariants, buttonGroup, fullWidthGroup } from './styles.css';

type Props = SprinklesProps &
  ToggleButtonVariants & {
    fullWidth?: boolean;
    name: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
  };

type ToggleButtonGroupTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type ToggleButtonGroupProps = DefaultComponentProps<ToggleButtonGroupTypeMap>;

function ToggleButtonGroupImpl(props: ToggleButtonGroupProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const { name, size = 'md', className, onChange, fullWidth = false, children, disabled, ...flexProps } = props;

  const radioGroupRef = useRef<HTMLDivElement | null>(null);
  const composedRefs = useComposedRefs(forwardedRef, radioGroupRef);
  const paddingY = size === 'sm' ? '1' : '1.25';
  const paddingX = size === 'sm' ? '1.5' : '2.5';

  /*
   * Enables tab focus if not controlled and no default checked has been provided
   */
  useEffect(() => {
    if (!radioGroupRef.current) return;
    const isControlled = typeof onChange === 'function';

    const collection = Array.from(radioGroupRef.current.querySelectorAll('label[role="radio"]')) as HTMLLabelElement[];

    const defaultCheckedRadio = radioGroupRef.current.querySelector('input[type="radio"]:checked');
    const firstRadioLabel = collection.at(0);

    if (!defaultCheckedRadio && !isControlled && firstRadioLabel instanceof HTMLLabelElement) {
      firstRadioLabel.tabIndex = 0;
    }
  }, [onChange]);

  return (
    <ToggleButtonGroupContext.Provider
      value={{
        name,
        size,
        onChange,
        radioGroupRef,
        disabled
      }}
    >
      <Flex
        element="div"
        border="1px"
        borderColor="border"
        paddingX={paddingX}
        paddingY={paddingY}
        alignItems="center"
        gap="2"
        width={!fullWidth ? 'fitContent' : undefined}
        {...flexProps}
        ref={composedRefs}
        role="radiogroup"
        className={classJoin(className, buttonGroup, fullWidth && fullWidthGroup)}
      >
        {children}
      </Flex>
    </ToggleButtonGroupContext.Provider>
  );
}

/**
 * Toggle Button Group
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
export const ToggleButtonGroup = forwardRef(ToggleButtonGroupImpl);
