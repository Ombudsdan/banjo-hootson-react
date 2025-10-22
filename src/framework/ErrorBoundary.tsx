import { Component, PropsWithChildren, ReactNode } from "react";

export default class ErrorBoundary extends Component<
  IErrorBoundary,
  IErrorBoundaryState
> {
  state: IErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error } as IErrorBoundaryState;
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

interface IErrorBoundary extends PropsWithChildren {
  fallback?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error?: unknown;
}
