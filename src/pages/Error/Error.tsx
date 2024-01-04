import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './Error.module.scss';
import { Layout } from '@layout/Layout';
import { LanguageContext } from '@context/LanguageContext';

interface ErrorProps {
  children?: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <div className={styles.error_page}>
            <LanguageContext.Consumer>
              {({ data }) => <h1>{data.error}</h1>}
            </LanguageContext.Consumer>
            <h2>{this.state.message}</h2>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
