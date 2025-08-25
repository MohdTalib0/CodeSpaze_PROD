import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props & { navigate: (path: string) => void }, State> {
  constructor(props: Props & { navigate: (path: string) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // If it's a routing error, try to recover
    if (error.message.includes('routing') || error.message.includes('navigation')) {
      // Clear any corrupted route state
      localStorage.removeItem('codespaze_current_route');
      
      // Navigate to home page as fallback
      setTimeout(() => {
        this.props.navigate('/');
      }, 100);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-300 mb-6">
              We encountered an error while loading the page. Please try refreshing.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                this.props.navigate('/');
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide navigation function
const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  return <ErrorBoundaryClass navigate={navigate}>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
