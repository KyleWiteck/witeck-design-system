import { ForwardedRef, ReactNode, forwardRef } from 'react';

import { Overwrite } from '../../types';
import { SprinklesProps } from '../Box';
import { Card, CardProps } from '../Card';
import { Flex } from '../Flex';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';
import { Skeleton } from '../Skeleton';
import { Stack } from '../Stack';
import { Text, TextProps } from '../Text';

export type CardSectionProps = Overwrite<
  CardProps,
  {
    title?: ReactNode | null;
    variant?: 'row' | 'column';
    subtitle?: ReactNode;
    actions?: ReactNode;
    secondaryActions?: ReactNode;
    titleVariant?: TextProps['variant'];
    subtitleVariant?: TextProps['variant'];
    isLoading?: boolean;
    titleElement?: TextProps['element'];
  }
>;

function CardSectionImpl(props: CardSectionProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const {
    title,
    subtitle,
    actions = null,
    secondaryActions = null,
    children,
    width = 'full',
    variant = 'column',
    titleVariant = 'h2',
    titleElement = 'h1',
    subtitleVariant = 'caption',
    isLoading = false,
    element = 'section',
    ...cardProps
  } = props;

  const Heading = variant === 'row' ? Flex : Stack;

  const headingProps: SprinklesProps = {
    gap: variant === 'row' || isLoading ? '2' : '0',
    alignItems: variant === 'row' ? 'center' : 'stretch'
  };

  // Overwriting props
  cardProps.display = 'flex';
  cardProps.flexDirection = 'column';
  cardProps.flexWrap = 'wrap';
  cardProps.position = 'relative';
  cardProps.gap ||= '6';

  if (variant === 'column') {
    cardProps.paddingX = '4';
    cardProps.paddingY = '4';
  }

  if (isLoading)
    return (
      <Card element={element} width={width} {...cardProps}>
        <Flex element="header" justifyContent="space-between" flex="1" maxWidth="full">
          <Heading {...headingProps}>
            <Skeleton height="6" shade="dark" width="60" />
            <Skeleton height="3" shade="dark" width={variant === 'row' ? '24' : '80'} />
          </Heading>
        </Flex>
        <Skeleton height="52" width="full" />
      </Card>
    );

  return (
    <Card element={element} width={width} {...cardProps} ref={forwardedRef}>
      {(title || subtitle || actions) && (
        <Stack element="header" gap="2">
          <Flex flexWrap="wrap" gap="4" justifyContent="space-between" flex="1" maxWidth="full">
            <Heading {...headingProps}>
              {title && (
                <Text element={titleElement} variant={titleVariant} fontWeight="medium">
                  {title}
                </Text>
              )}
              {subtitle && (
                <ReactNodeStringHandler element="span" variant={subtitleVariant}>
                  {variant === 'row' && typeof subtitle === 'string' ? `(${subtitle})` : subtitle}
                </ReactNodeStringHandler>
              )}
            </Heading>
            {actions}
          </Flex>
          {secondaryActions}
        </Stack>
      )}
      {children}
    </Card>
  );
}

export const CardSection = forwardRef(CardSectionImpl);
