import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode, forwardRef } from 'react';

import { useDisclosure } from '../../hooks/useDisclosure';
import { CancelIcon, WarningIcon } from '../../icons';
import { Flex } from '../Flex';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { Stack } from '../Stack';
import { ModalCloseButton } from './ModalCloseButton';
import { modalGutters } from './styles.css';

export interface ModalHeaderProps extends Partial<ReturnType<typeof useDisclosure>> {
  children?: ReactNode;
  status?: 'warning' | 'error';
}

const ModalHeaderImpl = forwardRef<HTMLDivElement, ModalHeaderProps>(({ children, status, onClose }, ref) => {
  return (
    <Stack
      borderRadius="none"
      direction="row"
      justifyContent={children || status ? 'space-between' : 'flex-end'}
      alignItems="center"
      width="full"
      height="fitContent"
      fontSize={{ mobile: 'base', tablet: 'lg' }}
      paddingY="4"
      fontWeight="medium"
      {...modalGutters}
      ref={ref}
    >
      <Flex borderRadius="none" alignItems="center" gap={{ mobile: '3', tablet: '1.5' }} flex="1" height="fitContent">
        {status === 'warning' && <WarningIcon boxSize="5" color="warning" />}
        {status === 'error' && <CancelIcon boxSize="5" color="error" />}
        {children && (
          <Dialog.Title asChild>
            <ReactNodeStringHandler>{children}</ReactNodeStringHandler>
          </Dialog.Title>
        )}
      </Flex>
      <ModalCloseButton onClose={onClose} />
    </Stack>
  );
});

// @ts-expect-error Property 'includeDisclosures' does not exist on type 'ForwardRefExoticComponent<ModalHeaderProps & RefAttributes<HTMLDivElement>>'.
ModalHeaderImpl.includeDisclosures = true;
ModalHeaderImpl.displayName = 'ModalHeader';

export const ModalHeader = ModalHeaderImpl;
