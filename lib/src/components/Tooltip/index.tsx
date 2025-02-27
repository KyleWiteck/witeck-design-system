// Tooltip.tsx
// TODO: flush out the rest of the functionality later based on https://www.figma.com/file/ypU12lwDF5IzUQsC2GUryd/Magnit-Design-System-1.0?node-id=4307%3A39055&mode=dev
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { TooltipProps as RadixTooltipProps } from '@radix-ui/react-tooltip';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { InfoIcon } from '../../icons';
import { BorderCSSProperties } from '../../types';
import { classJoin, themeValues, useRefValue } from '../../utils';
import { Box, BoxProps, SprinklesProps } from '../Box';
import { Center } from '../Center';
import { ReactNodeStringHandler } from '../ReactNodeStringHandler';

type Shades = 'light' | 'dark';

export interface TooltipProps extends Omit<RadixTooltipProps, 'delayDuration'> {
  boxSize?: SprinklesProps['boxSize'];
  zIndex?: SprinklesProps['zIndex'];
  content: ReactNode;
  /** @deprecated Radix generates IDs internally */
  ariaDescribedby?: string;
  shade?: Shades;
  contentContainerProps?: Omit<
    BoxProps<'span'>,
    'element' | 'children' | 'color' | 'backgroundColor' | 'id' | BorderCSSProperties
  >;
}

export function Tooltip(props: TooltipProps) {
  const {
    content,
    shade = 'dark',
    children,
    boxSize,
    zIndex,
    contentContainerProps,
    ariaDescribedby: _,
    ...rootProps
  } = props;
  const popoverRef = useRef<HTMLSpanElement | null>(null);
  const modalRef = useRefValue<HTMLDivElement | null>();
  const [calculatedZIndex, setCalculatedZIndex] = useState<number>(0);

  const backgroundColor: SprinklesProps['backgroundColor'] = shade === 'light' ? 'neutral100' : 'neutral700';

  const shadeHandler: Record<Shades, SprinklesProps> = {
    light: { backgroundColor: backgroundColor, borderColor: 'border2', color: 'black' },
    dark: { backgroundColor: backgroundColor, borderColor: 'neutral800', color: 'neutral100' }
  };
  const shadeStyles = shadeHandler[shade];

  useEffect(() => {
    if (modalRef?.current) {
      const parentZIndex = window.getComputedStyle(modalRef.current).zIndex;

      setCalculatedZIndex((Number(parentZIndex) || 0) + 10);
    }
  }, [modalRef]);

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={200} {...rootProps}>
        <RadixTooltip.Trigger>
          {children ?? (
            <Center width="fitContent" height="fitContent">
              <InfoIcon boxSize={boxSize} color="primary" />
            </Center>
          )}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content className="TooltipContent" sideOffset={3} asChild>
            <Box
              marginRight="4"
              display="block"
              height="fitContent"
              width="auto"
              padding="2"
              {...contentContainerProps}
              style={{ zIndex: !zIndex ? calculatedZIndex : undefined }}
              className={classJoin('tooltip', contentContainerProps?.className)}
              element="span"
              border="1px"
              borderRadius="base"
              zIndex={zIndex}
              {...shadeStyles}
              role="tooltip"
              ref={popoverRef}
            >
              <ReactNodeStringHandler color="inherit" variant="caption" width="full">
                {content}
              </ReactNodeStringHandler>
              <Box style={{ fill: themeValues.color[backgroundColor] }} element={RadixTooltip.Arrow} />
            </Box>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
