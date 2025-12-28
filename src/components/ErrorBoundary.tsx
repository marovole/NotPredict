'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
          <h2 className="text-lg font-semibold text-white mb-2">出错了</h2>
          <p className="text-sm text-slate-400 mb-4">
            {this.state.error?.message || '发生了意外错误'}
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
