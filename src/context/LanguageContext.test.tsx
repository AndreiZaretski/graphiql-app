import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import { Welcome } from '@pages/Welcome/Welcome';
import { BrowserRouter } from 'react-router-dom';
import { LocalStorageServise } from '@services/localStorageService';
import { LanguageKey } from '@type/enums/language.enum';

describe('LanguageProvider', () => {
  afterEach(() => LocalStorageServise.clear());
  it('renders default language', () => {
    render(
      <LanguageProvider>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </LanguageProvider>
    );

    const textField = screen.getByTestId('developer');
    const languageKey = LocalStorageServise.get('lang');
    expect(languageKey).toBe(LanguageKey.En);
    expect(textField).toHaveTextContent(/Developer Team/i);
  });

  it('renders en language', () => {
    LocalStorageServise.set('lang', LanguageKey.En);
    render(
      <LanguageProvider>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </LanguageProvider>
    );

    const textField = screen.getByTestId('developer');

    expect(textField).toHaveTextContent(/Developer Team/i);
  });

  it('renders ru language', () => {
    LocalStorageServise.set('lang', LanguageKey.Ru);
    render(
      <LanguageProvider>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </LanguageProvider>
    );

    const textField = screen.getByTestId('developer');

    expect(textField).toHaveTextContent(/Команда разработчиков/i);
  });

  it('check default case if we have another state', () => {
    const spyLocalStorage = vi.spyOn(LocalStorageServise, 'set');
    LocalStorageServise.set('lang', 'Fr');
    render(
      <LanguageProvider>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </LanguageProvider>
    );

    const textField = screen.getByTestId('developer');
    const languageKey = LocalStorageServise.get('lang');
    expect(languageKey).toBe(LanguageKey.En);
    expect(spyLocalStorage).toHaveBeenCalledWith('lang', LanguageKey.En);
    expect(textField).toHaveTextContent(/Developer Team/i);
  });
});
