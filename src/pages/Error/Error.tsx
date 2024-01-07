import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './Error.module.scss';
import { LanguageContext } from '@context/LanguageContext';

interface ErrorProps {
  children?: ReactNode;
}

interface ErrorState {
  message: string;
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorState {
    return {
      message: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      message: `Uncaught error: ${error.message} ${JSON.stringify(errorInfo)}`,
    });
  }

  public render() {
    if (this.state.message) {
      return (
        <div className={styles.error_page}>
          <LanguageContext.Consumer>
            {({ data }) => <h1>{data.error}</h1>}
          </LanguageContext.Consumer>
          <h2>{this.state.message}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
