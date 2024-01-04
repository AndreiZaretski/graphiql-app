import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './Error';
import { LanguageContext } from '@context/LanguageContext';
import { mockValueEn } from '@utils/test/mockLanguageContext';

describe('<ErrorPage />', () => {
  it('renders ErrorPage component when error occurs', () => {
    console.error = vi.fn();
    const ThrowError = () => {
      throw new Error('Test error');
    };
    render(
      <LanguageContext.Provider value={mockValueEn}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </LanguageContext.Provider>
    );
    expect(
      screen.getByText(
        /Something went wrong, but we are working to fix the problem/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});
