import { ReactNode, forwardRef } from 'react';

import { useDisclosure } from '../../hooks';
import { Box, BoxProps } from '../Box';
import { modalGutters } from './styles.css';

export interface ModalBodyProps
  extends Omit<BoxProps<'div'>, 'overflow' | 'width' | 'paddingX' | 'children'>,
    Partial<ReturnType<typeof useDisclosure>> {
  children?: ReactNode | ((disclosure: Partial<ReturnType<typeof useDisclosure>>) => ReactNode);
}

const ModalBodyImpl = forwardRef<HTMLDivElement | null, ModalBodyProps>(
  ({ children, onClose, onOpen, onToggle, isOpen, ...props }, ref) => {
    const disclosure = { onClose, onOpen, onToggle, isOpen };

    return (
      <Box overflowY="auto" overflowX="auto" width="full" {...props} {...modalGutters} ref={ref}>
        {children && typeof children === 'function' ? children?.(disclosure) : children}
      </Box>
    );
  }
);

// @ts-expect-error Property 'includeDisclosures' does not exist on type 'ForwardRefExoticComponent<Omit<ModalBodyProps, "ref"> & RefAttributes<HTMLDivElement | null>>'.
ModalBodyImpl.includeDisclosures = true;
ModalBodyImpl.displayName = 'ModalBody';

export const ModalBody = ModalBodyImpl;
