import { Component, PropsWithChildren } from 'react';
import ErrorPage from '../pages/ErrorPage';

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private static instance: ErrorBoundary | null = null;

  static report(error: unknown) {
    if (ErrorBoundary.instance) {
      ErrorBoundary.instance.setState({ hasError: true, error });
    } else {
      // Fallback: create an unhandled rejection so the boundary listener still catches it
      Promise.reject(error);
    }
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('[ErrorBoundary] Uncaught error', error, errorInfo);
  }

  onWindowError = (event: ErrorEvent) => {
    this.setState({ hasError: true, error: event.error || event.message });
  };

  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.setState({ hasError: true, error: event.reason });
  };

  componentDidMount(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.onWindowError);
      window.addEventListener('unhandledrejection', this.onUnhandledRejection);
    }
    ErrorBoundary.instance = this;
  }

  componentWillUnmount(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('error', this.onWindowError);
      window.removeEventListener('unhandledrejection', this.onUnhandledRejection);
    }
    ErrorBoundary.instance = null;
  }

  handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Allow non-React async code to surface errors in the boundary without throwing uncaught exceptions.
export function reportAppError(error: unknown) {
  ErrorBoundary.report(error);
}

type ErrorBoundaryProps = PropsWithChildren<object>;

interface ErrorBoundaryState {
  hasError: boolean;
  error?: unknown;
}
