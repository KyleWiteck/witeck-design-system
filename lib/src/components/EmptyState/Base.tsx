import { ReactNode } from 'react';

import { Icon } from '../../icons';
import { Button, ButtonProps } from '../Button';
import { Center, CenterProps } from '../Center';
import { Flex } from '../Flex';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { Stack } from '../Stack';
import { Text } from '../Text';

export type RequiredActionButtonProps = {
  variant: ButtonProps<'button'>['variant'];
  size: ButtonProps<'button'>['size'];
};

export type NoVariantButtonProps =
  | Omit<ButtonProps<'button'>, 'variant'>
  | ((requireProps: RequiredActionButtonProps) => ReactNode);

export interface EmptyStateProps {
  icon: Icon;
  headline: string;
  message?: ReactNode;
  noMessage?: boolean;
  containerProps?: CenterProps;
  noActions?: boolean;
  primaryAction?: NoVariantButtonProps;
  secondaryAction?: NoVariantButtonProps;
  variant?: 'base' | 'small';
}

export function EmptyState(props: EmptyStateProps) {
  const {
    message,
    icon: IconComponent,
    headline,
    containerProps = {},
    primaryAction,
    secondaryAction,
    noActions = false,
    noMessage = false,
    variant = 'base'
  } = props;

  const Wrapper = variant === 'base' ? Stack : Flex;
  const textAlign = variant === 'base' ? 'center' : 'left';

  return (
    <Center
      flex="1"
      padding={variant === 'base' ? '8' : '2'}
      height={variant === 'base' ? '10/12' : 'fitContent'}
      {...containerProps}
    >
      <Wrapper gap={variant === 'base' ? '6' : '4'} maxWidth="125" margin="auto" alignItems="center" justify="center">
        <IconComponent boxSize={variant === 'base' ? '20' : '12'} color="neutral500" />
        <Stack gap="0" alignItems={variant === 'base' ? 'center' : 'stretch'} width="fitContent" color="neutral500">
          <Text
            variant={variant === 'base' ? 'subtitle1' : 'caption'}
            element="h3"
            fontWeight="semibold"
            textAlign={textAlign}
            color="inherit"
          >
            {headline}
          </Text>
          {!noMessage && message && (
            <ReactNodeStringHandler
              element="p"
              variant={variant === 'base' ? 'body2' : 'caption'}
              textAlign={textAlign}
              color="inherit"
            >
              {message}
            </ReactNodeStringHandler>
          )}
        </Stack>

        {noActions ? null : (
          <Flex alignItems="center" justify="center" gap="2">
            {secondaryAction && typeof secondaryAction === 'object' && (
              <Button {...secondaryAction} variant="outlined" size="sm" />
            )}

            {typeof secondaryAction === 'function' && secondaryAction({ variant: 'outlined', size: 'sm' })}

            {primaryAction && typeof primaryAction === 'object' && (
              <Button {...primaryAction} variant="primary" size="sm" />
            )}

            {typeof primaryAction === 'function' && primaryAction({ variant: 'primary', size: 'sm' })}

            {!primaryAction && (
              <Button size="sm" onClick={() => window.location.reload()}>
                Reload
              </Button>
            )}
          </Flex>
        )}
      </Wrapper>
    </Center>
  );
}
