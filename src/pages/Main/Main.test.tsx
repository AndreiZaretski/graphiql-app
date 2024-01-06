import { LanguageContext, LanguageContextType } from '@context/LanguageContext';
import { store } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Main } from './Main';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import * as graphiqlApi from '@store/api/graphiqlApi';
import { MemoryRouter } from 'react-router-dom';

const renderMain = (valueLang: LanguageContextType) => {
  render(
    <LanguageContext.Provider value={valueLang}>
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    </LanguageContext.Provider>
  );
};

describe('Main', () => {
  console.error = vi.fn();
  it('Should call api after click doc button', async () => {
    const spyApiDoc = vi.spyOn(graphiqlApi, 'useGetDocumentationMutation');
    renderMain(mockValueEn);
    const button = screen.getByTestId('buttonDoc');
    await waitFor(() => fireEvent.click(button));
    expect(spyApiDoc).toHaveBeenCalled();
  });
});
