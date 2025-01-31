import { ElementType, ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { HeightCSSProperties, OverflowCSSPropertiesUnion, OverridableComponent, PolymorphicProps } from '../../types';
import { SprinklesProps } from '../Box';
import { Container, ContainerProps } from '../Container';
import { Stack, StackProps } from '../Stack';

type Props = Omit<SprinklesProps, HeightCSSProperties | OverflowCSSPropertiesUnion> & {
  /**
   * Used to pass in a footer.
   */
  footer?: ReactNode;
  wrapperStackProps?: Omit<StackProps, 'gap' | 'minHeight' | 'width' | 'backgroundColor'>;
} & Pick<ContainerProps, 'size'>;

type PageContainerContainerTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type PageContainerContainerProps<Root extends ElementType = PageContainerContainerTypeMap['defaultComponent']> =
  PolymorphicProps<PageContainerContainerTypeMap, Root>;

function PageContainerImpl(props: PageContainerContainerProps, forwardedRef: ForwardedRef<Element>) {
  const { backgroundColor, children, footer, wrapperStackProps, ...remainingProps } = props;

  return (
    <Stack
      {...wrapperStackProps}
      gap="0"
      minHeight="full"
      width="full"
      borderRadius="none"
      backgroundColor={backgroundColor}
      ref={forwardedRef}
    >
      <Container
        paddingY={{ mobile: '14', tablet: '16', desktop: '18' }}
        width="full"
        maxWidth="fullVH"
        flex="1"
        height="fitContent"
        borderRadius="none"
        justifyContent="flex-start"
        {...remainingProps}
      >
        {children}
      </Container>
      {footer}
    </Stack>
  );
}

export const PageContainer = memo(forwardRef(PageContainerImpl)) as OverridableComponent<PageContainerContainerTypeMap>;
