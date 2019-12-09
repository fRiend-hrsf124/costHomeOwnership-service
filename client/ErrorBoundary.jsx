/* eslint-disable no-console */
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      err: null,
      errInfo: null,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(err) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(err, errInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(err, errInfo);
    this.setState({ err, errInfo });
  }

  render() {
    const { hasError, err, errInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {err && err.toString()}
            <br />
            {errInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
