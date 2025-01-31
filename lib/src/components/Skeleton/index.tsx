import { ForwardedRef, forwardRef, memo } from 'react';

import { ImagePlaceholderIcon } from '../../icons';
import { DefaultComponentProps, OverridableComponent, Overwrite, Simplify } from '../../types';
import { HeightCSSProperties, WidthCSSProperties } from '../../types/globalTypes';
import { SprinklesProps } from '../Box';
import { Center } from '../Center';
import { SkeletonVariants, skeletonRecipe } from './skeleton.css';

type SkeletonSprinklesProps = Simplify<Overwrite<SprinklesProps, SkeletonVariants>>;

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Overwrite<SkeletonSprinklesProps, {}>;

type SkeletonTypeMap = {
  props: Props;
  defaultComponent: 'div';
};

export type SkeletonProps = Pick<
  DefaultComponentProps<SkeletonTypeMap>,
  'variant' | 'shade' | HeightCSSProperties | WidthCSSProperties | 'boxSize' | 'borderRadius'
>;

export function SkeletonImpl(props: SkeletonProps, forwardedRef: ForwardedRef<HTMLDivElement>) {
  const { variant, shade = 'light', ...otherProps } = props;
  const skeletonClass = skeletonRecipe({ variant, shade });
  const ImageColor = shade === 'light' ? 'neutral200' : 'neutral100';

  return (
    <Center className={skeletonClass} {...otherProps} ref={forwardedRef} cursor="wait" aria-busy="true">
      {variant === 'image' && (
        <ImagePlaceholderIcon maxWidth="13" maxHeight="13" boxSize="full" color={ImageColor} aspectRatio="1:1" />
      )}
    </Center>
  );
}

export const Skeleton = memo(forwardRef(SkeletonImpl)) as OverridableComponent<SkeletonTypeMap>;
