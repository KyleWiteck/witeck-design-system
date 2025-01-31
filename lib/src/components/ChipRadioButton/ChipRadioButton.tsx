import { ChangeEvent, ForwardedRef, KeyboardEvent, ReactNode, forwardRef, useId } from 'react';

import { DefaultComponentProps } from '../../types';
import { composeEventHandlers } from '../../utils';
import { Chip, ChipProps } from '../Chip';
import { useChipRadioGroupContext } from './context';
import { radio } from './styles.css';

function checkRadio(element: HTMLDivElement) {
  element.tabIndex = 0;
  element.setAttribute('aria-checked', 'true');
  element.focus();
  // We click it to "check", so that the radio change event fires.
  element.click();
}

function uncheckRadio(element: HTMLDivElement) {
  element.tabIndex = -1;
  element.setAttribute('aria-checked', 'false');
  const input = element.querySelector('input');
  if (input) input.checked = false;
  element.blur();
}

/**
 * Moves focus to the previous radio button in the group,
 * uncheck the previously focused button, and check the newly focused button.
 * If focus is on the first button, focus moves to the last button.
 * */
function checkPrevious(collection: HTMLDivElement[], element: HTMLDivElement, isMultiSelectable?: boolean) {
  const idx = collection.indexOf(element);
  const previous = collection.at(idx - 1);
  if (previous) {
    if (!isMultiSelectable) uncheckRadio(element);
    checkRadio(previous);
  }
}

/**
 * Moves focus to the next radio button in the group,
 * uncheck the previously focused button, and check the newly focused button.
 * If focus is on the last button, focus moves to the first button.
 * */
function checkNext(collection: HTMLDivElement[], element: HTMLDivElement, isMultiSelectable?: boolean) {
  const idx = collection.indexOf(element);
  const next = collection.at(idx >= collection.length - 1 ? 0 : idx + 1);
  if (next) {
    if (!isMultiSelectable) uncheckRadio(element);
    checkRadio(next);
  }
}

type Props = {
  children: ReactNode;
  labelContainerProps?: Omit<ChipProps, 'ref'>;
};

type ChipSelectButtonTypeMap = {
  props: Props;
  defaultComponent: 'input';
};

export type ChipSelectButtonProps = DefaultComponentProps<ChipSelectButtonTypeMap>;

function ChipRadioButtonImpl(props: ChipSelectButtonProps, forwardedRef: ForwardedRef<HTMLInputElement>) {
  const { children, name, onChange, defaultChecked, checked, labelContainerProps, ...inputProps } = props;

  const isChecked = checked || defaultChecked ? true : false;
  const context = useChipRadioGroupContext();
  const isMultiSelectable = context.isMultiSelectable;

  const id = useId();

  const onKeyDownHandler = composeEventHandlers(labelContainerProps?.onKeyDown, (e: KeyboardEvent<HTMLDivElement>) => {
    if (!context.chipSelectGroupRef.current) return;

    const collection = Array.from(
      context.chipSelectGroupRef.current.querySelectorAll(`label[role="${isMultiSelectable ? 'checkbox' : 'radio'}"]`)
    ) as HTMLDivElement[];

    const cases: Record<string, () => void> = {
      ArrowUp: () => checkPrevious(collection, e.currentTarget, isMultiSelectable),
      ArrowLeft: () => checkPrevious(collection, e.currentTarget, isMultiSelectable),
      ArrowDown: () => checkNext(collection, e.currentTarget, isMultiSelectable),
      ArrowRight: () => checkNext(collection, e.currentTarget, isMultiSelectable),
      ' ': () => checkRadio(e.currentTarget),
      Enter: () => checkRadio(e.currentTarget)
    };

    const action = cases[e.key];
    if (action) action();
  });

  const onInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (context.onChange) context.onChange(e);
    else if (onChange) onChange(e);
  };

  return (
    <Chip
      {...labelContainerProps}
      element="label"
      htmlFor={id}
      onKeyDown={onKeyDownHandler}
      // a11y
      role={isMultiSelectable ? 'checkbox' : 'radio'}
      checked={isChecked}
      isActive={isChecked}
      tabIndex={isChecked || isMultiSelectable ? 0 : -1}
      aria-checked={isChecked ? 'true' : 'false'}
    >
      <input
        {...inputProps}
        id={id}
        name={context.name ?? name}
        onChange={onInternalChange}
        className={radio}
        checked={checked}
        defaultChecked={defaultChecked}
        type={isMultiSelectable ? 'checkbox' : 'radio'}
        ref={forwardedRef}
      />
      {children}
    </Chip>
  );
}

/*
 * Radio Button (radio button)
 * */
export const ChipRadioButton = forwardRef(ChipRadioButtonImpl);
