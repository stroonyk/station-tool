import * as React from 'react';

export type ErrorBoundaryProps = Record<string, unknown> | Readonly<Record<string, unknown>>;
export interface IErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): IErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
