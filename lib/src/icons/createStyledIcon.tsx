import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box, BoxProps } from '../components/Box';
import { OverridableComponent } from '../types/components';

export interface CreateStyledIconParams {
  name: string;
  svg: ElementType;
}

export type IconProps = Omit<BoxProps<'svg'>, 'element'>;

type IconTypeMap = {
  props: IconProps;
  defaultComponent: 'input';
};

export const createStyledIcon = ({ name, svg }: CreateStyledIconParams) => {
  const component = forwardRef((props: IconProps, forwardedRef: ForwardedRef<SVGSVGElement>) => {
    const { height, boxSize, width, ...otherProps } = props;
    const Element = svg ?? 'svg';
    return (
      <Box
        element={Element}
        height={boxSize ?? height ?? '5'}
        width={boxSize ?? width ?? '5'}
        {...otherProps}
        ref={forwardedRef}
      />
    );
  });

  component.displayName = name;
  return component as OverridableComponent<IconTypeMap>;
};

export type Icon = ReturnType<typeof createStyledIcon>;
