import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import ErrorBoundare from '@pages/Error/Error.tsx';
import { LanguageProvider } from '@context/LanguageContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ErrorBoundare>
        <App />
      </ErrorBoundare>
    </LanguageProvider>
  </React.StrictMode>
);
