import { forwardRef } from 'react';

import { Box, BoxProps } from '../Box';
import { Center } from '../Center';
import { SpinnerVariants, spinnerRecipe } from './spinner.css';

export interface SpinnerSpecificProps {}

export type SpinnerProps = SpinnerVariants & Omit<BoxProps<'div'>, 'element'> & SpinnerSpecificProps;

export const Spinner = forwardRef<HTMLDivElement | null, SpinnerProps>(({ size, color = 'primary', ...props }, ref) => {
  const className = spinnerRecipe({ size });

  return (
    <Center color={color} width="auto" height="full">
      <Box ref={ref} className={className} {...props} />
    </Center>
  );
});
