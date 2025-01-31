import { ReactNode, forwardRef } from 'react';

import { useDisclosure } from '../../hooks';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { modalGutters } from './styles.css';

type RequiredProps = {
  variant: ButtonProps<'button'>['variant'];
  width: ButtonProps<'button'>['width'];
  disclosure: Partial<ReturnType<typeof useDisclosure>>;
};

type NoVariantButtonProps = Omit<ButtonProps<'button'>, 'variant'> | ((requireProps: RequiredProps) => ReactNode);

export interface ModalFooterProps extends Partial<ReturnType<typeof useDisclosure>> {
  primaryButton: NoVariantButtonProps & {
    variant?: Extract<ButtonProps<'button'>['variant'], 'primary' | 'error'>;
  };
  secondaryButton?: NoVariantButtonProps & {
    variant?: Extract<ButtonProps<'button'>['variant'], 'outlined' | 'errorOutlined'>;
  };
  tertiary1Button?: NoVariantButtonProps;
  tertiary2Button?: NoVariantButtonProps;
  contentOverride?: ReactNode;
  removePaddingX?: boolean;
}

const ModalFooterImpl = forwardRef<HTMLDivElement | null, ModalFooterProps>(
  (
    {
      primaryButton,
      secondaryButton,
      tertiary1Button,
      tertiary2Button,
      contentOverride,
      removePaddingX,
      onClose,
      isOpen,
      onOpen,
      onToggle
    },
    ref
  ) => {
    const disclosure = { onClose, isOpen, onOpen, onToggle };
    const requiredActionProps: Record<
      'primaryButton' | 'secondaryButton' | 'tertiary1Button' | 'tertiary2Button',
      Omit<RequiredProps, 'disclosure'>
    > = {
      primaryButton: {
        variant: 'primary',
        width: { mobile: 'full', tablet: 'fitContent' }
      },
      secondaryButton: {
        variant: 'outlined',
        width: { mobile: 'full', tablet: 'fitContent' }
      },
      tertiary1Button: {
        variant: 'text',
        width: { mobile: 'full', tablet: 'fitContent' }
      },
      tertiary2Button: {
        variant: 'text',
        width: { mobile: 'full', tablet: 'fitContent' }
      }
    };

    return (
      <Flex
        borderRadius="none"
        direction={{ mobile: 'column-reverse', tablet: 'row' }}
        justifyContent="space-between"
        width="full"
        paddingTop="4"
        gap="2"
        {...(removePaddingX ? {} : modalGutters)}
        ref={ref}
      >
        {contentOverride ?? (
          <>
            <Flex gap="2" borderRadius="none" direction={{ mobile: 'column', tablet: 'row' }} width="full" flex="1">
              {tertiary1Button && typeof tertiary1Button === 'object' ? (
                <Button {...requiredActionProps['tertiary1Button']} {...tertiary1Button} />
              ) : (
                tertiary1Button?.({ ...requiredActionProps['tertiary1Button'], disclosure })
              )}
              {tertiary2Button && typeof tertiary2Button === 'object' ? (
                <Button {...requiredActionProps['tertiary2Button']} {...tertiary2Button} />
              ) : (
                tertiary2Button?.({ ...requiredActionProps['tertiary2Button'], disclosure })
              )}
            </Flex>
            <Flex
              gap="2"
              borderRadius="none"
              direction={{ mobile: 'column-reverse', tablet: 'row' }}
              justifyContent="flex-end"
              flex="1"
              width="full"
            >
              {secondaryButton && typeof secondaryButton === 'object' ? (
                <Button {...requiredActionProps['secondaryButton']} {...secondaryButton} />
              ) : (
                secondaryButton?.({ ...requiredActionProps['secondaryButton'], disclosure })
              )}
              {primaryButton && typeof primaryButton === 'object' ? (
                <Button {...requiredActionProps['primaryButton']} {...primaryButton} />
              ) : (
                primaryButton?.({ ...requiredActionProps['primaryButton'], disclosure })
              )}
            </Flex>
          </>
        )}
      </Flex>
    );
  }
);

// @ts-expect-error Property 'includeDisclosures' does not exist on type 'ForwardRefExoticComponent<ModalFooterProps & RefAttributes<HTMLDivElement | null>>'
ModalFooterImpl.includeDisclosures = true;
ModalFooterImpl.displayName = 'ModalFooter';

export const ModalFooter = ModalFooterImpl;
