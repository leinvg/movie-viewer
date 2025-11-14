// Error boundary para capturar errores en componentes

"use client";

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary para capturar errores no controlados en componentes
 * Proporciona graceful degradation en lugar de crashes
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error captured by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!) || (
          <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-lg">
            <h2 className="text-xl font-bold text-red-400 mb-2">Oops! Algo salió mal</h2>
            <p className="text-gray-300 text-sm mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
            >
              Reintentar
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
