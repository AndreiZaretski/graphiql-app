import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { mockValueRu } from '@utils/test/mockLanguageContext';
import { LanguageContext } from '@context/LanguageContext';

describe('<App />', () => {
  it('renders App component', async () => {
    render(
      <LanguageContext.Provider value={mockValueRu}>
        <App />
      </LanguageContext.Provider>
    );
    await waitFor(() =>
      expect(screen.getByText(/О проектe/i)).toBeInTheDocument()
    );
  });
});
