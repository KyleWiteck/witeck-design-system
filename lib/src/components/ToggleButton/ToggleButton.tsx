import { ForwardedRef, ReactNode, forwardRef } from 'react';

import { DefaultComponentProps } from '../../types';
import { classJoin, composeEventHandlers } from '../../utils';
import { Box } from '../Box';
import { Text } from '../Text';
import { useToggleButtonGroupContext } from './context';
import { labelContainer, radio, toggleButtonRecipe } from './styles.css';

function checkRadio(element: HTMLLabelElement) {
  element.tabIndex = 0;
  element.setAttribute('aria-checked', 'true');
  element.focus();
  // We click it to "check", so that the radio change event fires.
  element.click();
}

function uncheckRadio(element: HTMLLabelElement) {
  element.tabIndex = -1;
  element.setAttribute('aria-checked', 'false');
  element.blur();
}

/**
 * Moves focus to the previous radio button in the group,
 * uncheck the previously focused button, and check the newly focused button.
 * If focus is on the first button, focus moves to the last button.
 * */
function checkPrevious(collection: HTMLLabelElement[], element: HTMLLabelElement) {
  const idx = collection.indexOf(element);
  const previous = collection.at(idx - 1);
  if (previous) {
    uncheckRadio(element);
    checkRadio(previous);
  }
}

/**
 * Moves focus to the next radio button in the group,
 * uncheck the previously focused button, and check the newly focused button.
 * If focus is on the last button, focus moves to the first button.
 * */
function checkNext(collection: HTMLLabelElement[], element: HTMLLabelElement) {
  const idx = collection.indexOf(element);
  const next = collection.at(idx >= collection.length - 1 ? 0 : idx + 1);
  if (next) {
    uncheckRadio(element);
    checkRadio(next);
  }
}

type Props = {
  children: ReactNode;
  labelContainerProps?: Omit<React.ComponentPropsWithoutRef<'label'>, 'color'>;
};

type ToggleButtonTypeMap = {
  props: Props;
  defaultComponent: 'input';
};

export type ToggleButtonProps = DefaultComponentProps<ToggleButtonTypeMap>;

function ToggleButtonImpl(props: ToggleButtonProps, forwardedRef: ForwardedRef<HTMLInputElement>) {
  const { children, name, onChange, defaultChecked, checked, labelContainerProps = {}, ...inputProps } = props;

  const context = useToggleButtonGroupContext();
  const disabled = context.disabled;

  const onKeyDownHandler = composeEventHandlers(labelContainerProps?.onKeyDown, e => {
    if (!context.radioGroupRef.current) return;

    const collection = Array.from(
      context.radioGroupRef.current.querySelectorAll('label[role="radio"]')
    ) as HTMLLabelElement[];

    const cases: Record<string, () => void> = {
      ArrowUp: () => checkPrevious(collection, e.currentTarget),
      ArrowLeft: () => checkPrevious(collection, e.currentTarget),
      ArrowDown: () => checkNext(collection, e.currentTarget),
      ArrowRight: () => checkNext(collection, e.currentTarget),
      ' ': () => checkRadio(e.currentTarget),
      Enter: () => checkRadio(e.currentTarget)
    };

    const action = cases[e.key];
    if (action) action();
  });

  return (
    <Box
      element="label"
      {...labelContainerProps}
      className={classJoin(labelContainer, labelContainerProps.className)}
      onKeyDown={onKeyDownHandler}
      // a11y
      role="radio"
      tabIndex={checked || defaultChecked ? 0 : -1}
      aria-checked={checked || defaultChecked ? 'true' : 'false'}
      // disabled
      opacity={disabled ? '0.5' : undefined}
      pointerEvents={disabled ? 'none' : undefined}
    >
      <input
        {...inputProps}
        name={context.name ?? name}
        onChange={context.onChange ?? onChange}
        className={radio}
        checked={checked}
        defaultChecked={defaultChecked}
        type="radio"
        ref={forwardedRef}
      />
      <Text
        element="span"
        textAlign="center"
        variant={context.size === 'sm' ? 'caption' : 'label'}
        className={toggleButtonRecipe({ size: context.size, checked })}
      >
        {children}
      </Text>
    </Box>
  );
}

/*
 * Toggle Button (radio button)
 * */
export const ToggleButton = forwardRef(ToggleButtonImpl);
