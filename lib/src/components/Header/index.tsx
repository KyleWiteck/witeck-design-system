import { ForwardedRef, ReactNode, forwardRef, memo } from 'react';

import { useDisclosure } from '../../hooks';
import { MenuIcon } from '../../icons';
import { OverridableComponent } from '../../types';
import { Button } from '../Button';
import { Center } from '../Center';
import { Flex, FlexProps } from '../Flex';
import { Stack } from '../Stack';

export interface HeaderProps extends Omit<FlexProps<'header'>, 'width' | 'height' | 'element'> {
  headerHeight?: string;
  onMenuToggle?: ReturnType<typeof useDisclosure>['onToggle'];
  menuIsOpen?: ReturnType<typeof useDisclosure>['isOpen'];
  hideMenuButton?: boolean;
  logo?: ReactNode;
}

type HeaderTypeMap = {
  props: HeaderProps;
  defaultComponent: 'header';
};

function HeaderImpl(props: HeaderProps, forwardedRef: ForwardedRef<HTMLHeadElement>) {
  const {
    headerHeight = '72px',
    onMenuToggle,
    menuIsOpen,
    hideMenuButton = false,
    logo,
    children,
    ...boxProps
  } = props;

  return (
    <>
      <Flex
        element="header"
        position="fixed"
        width="full"
        top="0px"
        borderBottom="1px"
        borderColor="border"
        zIndex="header"
        paddingY="2"
        gap="2"
        paddingX={{ mobile: '3', tablet: '6', desktop: '8' }}
        backgroundColor="white"
        alignItems="center"
        {...boxProps}
        style={{ ...boxProps.style, height: headerHeight }}
        ref={forwardedRef}
      >
        {!hideMenuButton && onMenuToggle && (
          <Button
            variant="text"
            size="square"
            boxSize="10"
            onClick={onMenuToggle}
            aria-label="Show Navigation Menu"
            aria-expanded={menuIsOpen}
            paddingTop="1"
            style={{ marginLeft: '-3px' }}
          >
            <MenuIcon boxSize="7" />
          </Button>
        )}

        {(logo || children) && (
          <Flex align="center" justify="space-between" flex="1">
            {logo && <Center>{logo}</Center>}

            {children && (
              <Stack direction="row" align="center" justifyContent="flex-end" flex="1">
                {children}
              </Stack>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
}

export const Header = memo(forwardRef(HeaderImpl)) as OverridableComponent<HeaderTypeMap>;
