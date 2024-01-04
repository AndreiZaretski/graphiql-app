import { LanguageContext, LanguageContextType } from '@context/LanguageContext';
import { ChangeApi } from './ChangeApi';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { setBaseUrl } from '@store/features/requestDataSlice';
import { mockValueEn } from '@utils/test/mockLanguageContext';

const renderChangeApi = (valueLang: LanguageContextType) => {
  render(
    <LanguageContext.Provider value={valueLang}>
      <Provider store={store}>
        <ChangeApi />
      </Provider>
    </LanguageContext.Provider>
  );
};

describe('ChangeApi', () => {
  it('should change the base URL and show success message if the input URL is valid', () => {
    renderChangeApi(mockValueEn);
    const mockDispatch = vi.spyOn(store, 'dispatch');

    const toggleButton = screen.getByTestId('toggleButton');

    fireEvent.click(toggleButton);

    const inputElement = screen.getByTestId('inputUrl');
    const buttonElement = screen.getByTestId('changeUrl');
    fireEvent.change(inputElement, {
      target: { value: 'https://example.com/api' },
    });

    fireEvent.click(buttonElement);
    const messageElement = screen.getByRole('message');
    expect(mockDispatch).toHaveBeenCalledWith(
      setBaseUrl('https://example.com/api')
    );

    expect(messageElement).toHaveTextContent(
      /The api was successfully changed/i
    );
  });

  it('should show error message if the input URL is invalid', () => {
    renderChangeApi(mockValueEn);

    const mockDispatch = vi.spyOn(store, 'dispatch');
    const toggleButton = screen.getByTestId('toggleButton');
    fireEvent.click(toggleButton);

    const inputElement = screen.getByTestId('inputUrl');
    const buttonElement = screen.getByTestId('changeUrl');

    fireEvent.change(inputElement, { target: { value: 'not a valid url' } });

    fireEvent.click(buttonElement);
    const messageElement = screen.getByRole('message');

    expect(mockDispatch).not.toHaveBeenCalledWith(
      setBaseUrl('not a valid url')
    );
    expect(messageElement).toHaveTextContent(/Please enter valid Url/i);
  });
});
