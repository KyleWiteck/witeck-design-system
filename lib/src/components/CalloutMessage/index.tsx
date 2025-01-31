import { ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { CloseIcon, ErrorIcon, IconProps, InfoIcon, SuccessIcon, WarningIcon } from '../../icons';
import { OverridableComponent } from '../../types';
import { PaddingCSSPropertiesUnion } from '../../types/globalTypes';
import { classJoin } from '../../utils';
import { Box, BoxProps } from '../Box';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { calloutMessageHover } from './calloutMessage.css';

export interface CalloutMessageProps
  extends Omit<
    BoxProps<'div'>,
    'backgroundColor' | 'color' | 'borderRadius' | 'children' | 'onClick' | 'cursor' | PaddingCSSPropertiesUnion
  > {
  variant?: 'error' | 'warning' | 'info' | 'success';
  children: ReactNode | ReactNode[];
  iconProps?: Omit<IconProps, 'color'>;
  onCloseClick?: () => void;
}

type CalloutMessageTypeMap = {
  props: CalloutMessageProps;
  defaultComponent: 'div';
};

function CalloutMessageImpl(props: CalloutMessageProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const { children, variant = 'info', iconProps, onCloseClick, className, ...boxProps } = props;
  const status = {
    error: { Icon: <ErrorIcon color="error" {...iconProps} />, background: 'errorTint' },
    warning: { Icon: <WarningIcon color="warning" {...iconProps} />, background: 'warningTint' },
    info: { Icon: <InfoIcon color="primary" {...iconProps} />, background: 'primary100' },
    success: { Icon: <SuccessIcon color="success" {...iconProps} />, background: 'successTint' }
  } satisfies Record<
    string,
    {
      Icon: ReactNode;
      background: BoxProps<'div'>['backgroundColor'];
    }
  >;

  const StatusIcon = () => status[variant].Icon;

  return (
    <Box
      paddingX="3.5"
      paddingY="3"
      width="fitContent"
      fontSize="xs"
      backgroundColor={status[variant].background}
      fontWeight="medium"
      display="flex"
      alignItems="center"
      flexDirection="row"
      gap="3"
      minWidth="4"
      position="relative"
      onClick={onCloseClick}
      {...boxProps}
      cursor={onCloseClick ? 'pointer' : 'default'}
      className={classJoin(onCloseClick ? calloutMessageHover : '', className, 'callout')}
      ref={forwardedRef}
    >
      {onCloseClick && (
        <Box
          aria-label="Close"
          position="absolute"
          top="0px"
          right="0px"
          paddingTop="1.25"
          paddingRight="1.25"
          minWidth="5"
          minHeight="5"
          fontSize="base"
        >
          <CloseIcon width="full" height="auto" />
        </Box>
      )}
      <StatusIcon />
      <ReactNodeStringHandler element="div" role="alert" aria-live="assertive" aria-label={variant} flex="1">
        {children}
      </ReactNodeStringHandler>
    </Box>
  );
}

export const CalloutMessage = memo(forwardRef(CalloutMessageImpl)) as OverridableComponent<CalloutMessageTypeMap>;
