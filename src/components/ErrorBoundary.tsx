import React from "react";

// Props for the ErrorBoundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// State for the ErrorBoundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ErrorBoundary component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p className="text-lg text-gray-600 mb-6">
            {this.state.error?.message || "Unknown error"}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
