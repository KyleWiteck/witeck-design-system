import { Component, ComponentProps, ErrorInfo, FunctionComponent, PropsWithChildren, ReactNode } from 'react';

export type ErrorCatcherComponent<E extends Error> = FunctionComponent<
  {
    error: E | null;
    children: ReactNode;
  } & Partial<Record<string, unknown>>
>;

type ShouldCatch<E extends Error> = (error: E, info: ErrorInfo) => boolean;

type ErrorHandler<E extends Error> = (error: E, info: ErrorInfo) => void;

type BoudaryProps<E extends Error> = {
  ComponentCatcher: ErrorCatcherComponent<E>;
  shouldCatch?: ShouldCatch<E>;
  onError?: ErrorHandler<E>;
  children: ReactNode;
};

type BoudaryState<E extends Error> = { error: E | null };

/**
 * ErrorBoundary class component
 */
class ErrorBoundary<ErrorType extends Error> extends Component<BoudaryProps<ErrorType>, BoudaryState<ErrorType>> {
  constructor(props: BoudaryProps<ErrorType>) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentDidCatch(error: ErrorType, info: ErrorInfo) {
    // Validate if the error should be caught by this boundary, otherwise re-throw.
    if (this?.props.shouldCatch && !this?.props.shouldCatch(error, info)) {
      throw error;
    }
    // Handle Error
    if (this?.props.onError) {
      this.props.onError(error, info);
    }
    this.setState({ error });
  }

  render() {
    const { ComponentCatcher, ...otherProps } = this.props;
    return <ComponentCatcher error={this.state.error} {...otherProps} />;
  }
}

/**
 * Functional react components as Error Boundaries.
 *
 * @param Component Functional error boundary component.
 *
 * @param shouldCatch
 * Function that validates if a given error should be caught by the current error boundary.
 * If no callback is provided the boundary will catch all errors.
 *
 * @param onError An optional callback that is executed when an error is caught.
 *
 * @example
 *
 * ```tsx
  // Only catch not found errors in this component.
  const shouldCatch = (error: Error) => error instanceof NotFound;

  const NotFoundRateCard = withErrorCatch(({ error, children }) => {
    if (error) {
      return (
        <Text color="error">{error.message}</Text>
      );
    }
    return children;
  }, shouldCatch);
  ```
 */
export function withErrorCatch<ErrorType extends Error, C extends ErrorCatcherComponent<ErrorType>>(
  Component: C,
  shouldCatch?: ShouldCatch<ErrorType>,
  onError?: ErrorHandler<ErrorType>
) {
  /**
   *
   */
  function ErrorBoundaryFn(props: Omit<PropsWithChildren<ComponentProps<C>>, 'error'>) {
    return <ErrorBoundary ComponentCatcher={Component} shouldCatch={shouldCatch} onError={onError} {...props} />;
  }

  return ErrorBoundaryFn;
}
