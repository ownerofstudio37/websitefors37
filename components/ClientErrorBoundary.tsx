"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  label?: string;
};

type State = { hasError: boolean; error?: any };

export default class ClientErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // Log errors in development, but keep production logs minimal to avoid PII
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ErrorBoundary: ${this.props.label || 'component'}]`, error, info);
    } else {
      // Production: minimal logging
      console.warn(`[ErrorBoundary: ${this.props.label || 'component'}] Error caught`);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 my-4 border border-red-200 bg-red-50 rounded text-red-800 text-sm">
            Something went wrong loading this section.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
