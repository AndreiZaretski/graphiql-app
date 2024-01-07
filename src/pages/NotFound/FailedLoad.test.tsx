import { LanguageContext } from '@context/LanguageContext';
import { render, screen } from '@testing-library/react';
import { mockValueRu } from '@utils/test/mockLanguageContext';
import { FailedLoad } from './FailedLoad';
import { MemoryRouter } from 'react-router-dom';

describe('FailedLoad', () => {
  it('Should have text', async () => {
    render(
      <LanguageContext.Provider value={mockValueRu}>
        <MemoryRouter initialEntries={['/somepath']}>
          <FailedLoad />
        </MemoryRouter>
      </LanguageContext.Provider>
    );

    const text = screen.getByTestId('failedLoad');
    expect(text).toHaveTextContent('Не удалось загрузить страницу /somepath');
  });
});
