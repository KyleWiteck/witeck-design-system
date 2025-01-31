import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';

import { useDisclosure } from '../../hooks/useDisclosure';
import { CloseIcon } from '../../icons';
import { Button, ButtonProps } from '../Button';

export interface ModalCloseButtonProps extends Omit<ButtonProps<'button'>, 'variant' | 'size' | 'children'> {
  onClose?: ReturnType<typeof useDisclosure>['onClose'];
}

export const ModalCloseButton = forwardRef<HTMLButtonElement | null, ModalCloseButtonProps>(
  ({ onClose, ...props }, ref) => {
    return (
      <Dialog.Close asChild>
        <Button
          ref={ref}
          type="button"
          onClick={onClose}
          aria-label="Close"
          variant="custom"
          size="square"
          boxSize="9"
          style={{ marginRight: '-10px' }}
          {...props}
        >
          <CloseIcon boxSize="8" />
        </Button>
      </Dialog.Close>
    );
  }
);
