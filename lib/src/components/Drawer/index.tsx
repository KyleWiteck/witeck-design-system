import { ElementType, ForwardedRef, Fragment, MouseEvent, forwardRef, memo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useDisclosure } from '../../hooks';
import { composeRefs } from '../../hooks/useComposeRefs';
import { useOverlayUtils } from '../../hooks/useOverlayUtils';
import { DoubleForwardArrowIcon } from '../../icons';
import { rotate180Recipe } from '../../theme';
import { Sprinkles } from '../../theme/sprinkles.css';
import { OverridableComponent, PolymorphicProps } from '../../types';
import { classJoin, collapse, expand, themeValues } from '../../utils';
import { Box, BoxProps } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { drawerContainerOverlayRecipe, drawerOverlayRecipe } from './drawer.css';

export interface Props
  extends Omit<
      BoxProps<'div'>,
      'width' | 'minWidth' | 'style' | 'backgroundColor' | 'borderColor' | 'borderRadius' | 'borderRight' | 'element'
    >,
    Partial<ReturnType<typeof useDisclosure>> {
  variant?: 'overlaySlideIn' | 'inlineNavExpand' | 'inlinePageExpandToggle';
  width?: number;
  minWidth?: keyof typeof themeValues.space;
  headerHeight?: string;
  childrenContainerProps?: BoxProps;
}

type DrawerTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type DrawerProps<Root extends ElementType = DrawerTypeMap['defaultComponent']> = PolymorphicProps<
  DrawerTypeMap,
  Root
>;

const TOGGLE_BUTTON_SIZE = 20;
const DRAWER_ANIMATION_SPEED = 500;
const DEFAULT_DRAWER_WIDTH = 270;
const DEFAULT_HEADER_HEIGHT = '72px';

const handleDrawerAnimation = async (
  drawer: HTMLDivElement,
  toggleButton: HTMLButtonElement | null,
  isOpen: boolean,
  width: number,
  isPageExpandToggle: boolean
) => {
  const generator = isOpen ? expand(width, DRAWER_ANIMATION_SPEED) : collapse(width, DRAWER_ANIMATION_SPEED);

  for await (const pixels of generator) {
    if (!drawer) return;

    drawer.style.width = `${pixels}px`;

    if (isPageExpandToggle && toggleButton) {
      toggleButton.style.left = isOpen ? `${pixels - TOGGLE_BUTTON_SIZE}px` : `${pixels + 6}px`;
    }
  }
};

function DrawerImpl(props: DrawerProps, forwardedRef: ForwardedRef<Element>) {
  {
    const {
      element,
      isOpen = false,
      onOpen,
      onClose,
      onToggle,
      children,
      variant = 'overlaySlideIn',
      width = DEFAULT_DRAWER_WIDTH,
      height,
      display = 'block',
      headerHeight = DEFAULT_HEADER_HEIGHT,
      padding,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      paddingX,
      childrenContainerProps,
      ...boxProps
    } = props;

    const isInlineExpand = variant === 'inlineNavExpand';
    const isInPageExpandToggle = variant === 'inlinePageExpandToggle';
    const isInline = isInlineExpand || isInPageExpandToggle;
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
    const isAnimatingRef = useRef(false);
    const prevIsOpenRef = useRef(isOpen);

    const onInternalToggle = onToggle ? onToggle : isOpen ? onClose : onOpen;

    // If isOpen changed externally, trigger animation
    if (prevIsOpenRef.current !== isOpen && !isAnimatingRef.current && drawerRef.current) {
      isAnimatingRef.current = true;
      const drawer = drawerRef.current;

      if (isInline) {
        handleDrawerAnimation(drawer, toggleButtonRef.current, isOpen, width, isInPageExpandToggle).finally(() => {
          isAnimatingRef.current = false;
        });
      } else {
        // Overlay variant animation
        drawer.style.transform = isOpen ? 'translate(0px)' : `translate(-${width}px)`;
        drawer.style.transition = `transform ${DRAWER_ANIMATION_SPEED}ms ease-in-out`;

        drawer.addEventListener('transitionend', function onEnd() {
          isAnimatingRef.current = false;
          drawer.removeEventListener('transitionend', onEnd);
        });
      }
    }
    // Update the ref after checking
    prevIsOpenRef.current = isOpen;

    const sharedStyles: BoxProps<'div'> = {
      ...boxProps,
      backgroundColor: 'white',
      borderColor: 'border',
      borderRadius: 'none',
      borderRight: isOpen ? '1px' : 'none'
    };

    const sharedPadding: BoxProps<'div'> = {
      paddingY: padding ?? '6',
      paddingX: paddingX ?? padding ?? '6',
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom
    };

    const { bodyRef, renderPortal } = useOverlayUtils({ isOpen: !isInline && isOpen });

    if (isInline) {
      return (
        <InlineDrawer
          element={element}
          display={display}
          height={height}
          isOpen={isOpen}
          width={width}
          drawerRef={drawerRef}
          forwardedRef={forwardedRef}
          toggleButtonRef={toggleButtonRef}
          isPageExpandToggle={isInPageExpandToggle}
          onInternalToggle={onInternalToggle}
          sharedStyles={sharedStyles}
          paddingStyles={sharedPadding}
          childrenContainerProps={childrenContainerProps}
        >
          {children}
        </InlineDrawer>
      );
    }

    const drawerOverlayClassName = drawerOverlayRecipe();
    const drawerContainerOverlayClassName = drawerContainerOverlayRecipe({
      isOpen: isOpen
    });

    if (!bodyRef.current && !renderPortal) return;

    const calcHeight = headerHeight ? `calc(100vh - ${headerHeight ?? DEFAULT_HEADER_HEIGHT})` : undefined;

    return (
      <Fragment>
        {createPortal(
          <Box
            element={element}
            display={display}
            className={drawerContainerOverlayClassName}
            style={{
              height: calcHeight
            }}
          >
            <Flex
              height="full"
              position="relative"
              borderRadius="none"
              alignItems="stretch"
              backdropFilter="base"
              zIndex="drawer"
              backgroundColor="overlay"
              className={drawerOverlayClassName}
              style={{
                marginTop: headerHeight ?? DEFAULT_HEADER_HEIGHT,
                height: calcHeight
              }}
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                if (e.target === e.currentTarget) {
                  onClose?.();
                }
              }}
            >
              <Box
                ref={composeRefs<Element | null>(forwardedRef, drawerRef)}
                {...sharedStyles}
                position="relative"
                backgroundColor="white"
                borderRadius="none"
                overflow="hidden"
                style={{
                  ...sharedStyles.style,
                  width: width,
                  height: calcHeight,
                  transform: isOpen ? 'translateX(0)' : `translateX(-${width}px)`,
                  transition: `transform ${DRAWER_ANIMATION_SPEED}ms ease-in-out`
                }}
              >
                <Box
                  {...sharedPadding}
                  {...childrenContainerProps}
                  width="full"
                  height="full"
                  borderRadius="none"
                  overflowY="scroll"
                >
                  {children}
                </Box>
              </Box>
            </Flex>
          </Box>,
          bodyRef.current as Element
        )}
      </Fragment>
    );
  }
}

export const Drawer = memo(forwardRef(DrawerImpl)) as OverridableComponent<DrawerTypeMap>;

interface InlineDrawerProps {
  element?: ElementType;
  width: number;
  display: Sprinkles['display'];
  height?: Sprinkles['height'];
  isOpen: boolean;
  drawerRef: React.RefObject<HTMLDivElement>;
  forwardedRef: ForwardedRef<Element>;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
  isPageExpandToggle: boolean;
  onInternalToggle?: () => void;
  sharedStyles: BoxProps<'div'>;
  paddingStyles: BoxProps<'div'>;
  childrenContainerProps?: BoxProps;
  children: React.ReactNode;
}

const InlineDrawer = ({
  element,
  display,
  height,
  isOpen,
  width,
  drawerRef,
  forwardedRef,
  toggleButtonRef,
  isPageExpandToggle,
  onInternalToggle,
  sharedStyles,
  paddingStyles,
  childrenContainerProps,
  children
}: InlineDrawerProps) => (
  <Box
    element={element}
    display={display}
    height={height ?? 'full'}
    position="relative"
    {...sharedStyles}
    overflowY="visible"
    overflowX="visible"
    style={{
      width: drawerRef.current?.style.width || (isOpen ? width : 0),
      ...sharedStyles.style
    }}
    ref={composeRefs<Element | null>(forwardedRef, drawerRef)}
  >
    {isPageExpandToggle && (
      <DrawerFloatingToggleButton
        ref={toggleButtonRef}
        isOpen={isOpen}
        style={{
          top: 6,
          left: toggleButtonRef.current?.style.left || (isOpen ? width - TOGGLE_BUTTON_SIZE : 6),
          borderRadius: '100%',
          height: TOGGLE_BUTTON_SIZE * 2,
          width: TOGGLE_BUTTON_SIZE * 2,
          transition: 'unset'
        }}
        onClick={onInternalToggle}
      />
    )}
    <Box height="full" width="full" overflow="hidden" style={{ ...sharedStyles.style }}>
      <Box
        maxHeight="full"
        overflowY="auto"
        {...paddingStyles}
        {...childrenContainerProps}
        style={{ width, ...sharedStyles.style }}
      >
        {children}
      </Box>
    </Box>
  </Box>
);

export interface DrawerFloatingToggleButtonProps extends ButtonProps {
  isOpen?: boolean;
}

export const DrawerFloatingToggleButton = forwardRef<HTMLButtonElement, DrawerFloatingToggleButtonProps>(
  ({ isOpen, className, ...props }, ref) => {
    const toggleButtonRotateClass = rotate180Recipe({ isOpen });

    return (
      <Button
        ref={ref}
        variant="round"
        size="square"
        border="1px"
        height="12"
        width="12"
        boxSize="12"
        borderColor="border"
        borderRadius="full"
        boxShadow="base"
        position="absolute"
        zIndex="barely"
        backgroundColor="white"
        className={classJoin('drawer-floating-toggle-button', className)}
        {...props}
        icon={
          <DoubleForwardArrowIcon
            borderRadius="full"
            marginRight={isOpen ? '0.5' : undefined}
            marginLeft={isOpen ? undefined : '0.5'}
            className={toggleButtonRotateClass}
          />
        }
      />
    );
  }
);
