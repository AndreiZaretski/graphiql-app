import { LanguageContextType, LanguageContext } from '@context/LanguageContext';
import { store } from '@store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Request } from './Request';
import { mockValueRu } from '@utils/test/mockLanguageContext';
import configureStore from 'redux-mock-store';
import { IsJsonString } from '@utils/isJsonString';
import {
  setHeaders,
  setQuery,
  setValidHeaderJson,
  setValidVariableJson,
  setVariables,
} from '@store/features/requestDataSlice';
import {
  prettifyData,
  removeTrailingSpacesEnterComments,
} from '@utils/prettify/prettify';
import '@uiw/codemirror-themes-all';

const renderRequest = (valueLang: LanguageContextType) => {
  render(
    <LanguageContext.Provider value={valueLang}>
      <Provider store={store}>
        <Request getResponse={vi.fn()} />
      </Provider>
    </LanguageContext.Provider>
  );
};

describe('Request', () => {
  console.error = vi.fn();
  it('components should be render', () => {
    renderRequest(mockValueRu);
    const request = screen.getByTestId('request');
    expect(request).toBeInTheDocument();
  });

  it('calls getResponse function with correct params on submit button click', async () => {
    const intialState = {
      request: {
        query: '{query: "Hello"}',
        variables: '{ "variables": "World" }',
        headers: '{ "headers": "Content-Type: application/json" }',
        baseUrl: 'http://localhost:3000',
        validHeaderJson: false,
        validVariableJson: false,
      },
    };
    const mockStore = configureStore();
    const storeTest = mockStore(intialState);
    const renderRequest = (valueLang: LanguageContextType) => {
      const getResponse = vi.fn();

      render(
        <LanguageContext.Provider value={valueLang}>
          <Provider store={storeTest}>
            <Request getResponse={getResponse} />
          </Provider>
        </LanguageContext.Provider>
      );

      return getResponse;
    };
    const getResponse = renderRequest(mockValueRu);

    const submitButton = screen.getByTestId('submitButton');

    await waitFor(() => fireEvent.click(submitButton));

    expect(IsJsonString(intialState.request.variables)).toBeTruthy();
    expect(IsJsonString(intialState.request.headers)).toBeTruthy();

    expect(getResponse).toHaveBeenCalledTimes(1);
    expect(getResponse).toHaveBeenCalledWith({
      query: '{query: "Hello"}',
      variables: { variables: 'World' },
      headers: new Headers({ headers: 'Content-Type: application/json' }),
      baseUrl: 'http://localhost:3000',
    });
  });

  it('should be calls dispatch method', async () => {
    const mockDispatch = vi.spyOn(store, 'dispatch');

    renderRequest(mockValueRu);

    const submitButton = screen.getByTestId('submitButton');

    await waitFor(() => fireEvent.click(submitButton));

    expect(mockDispatch).toHaveBeenCalledWith(
      setValidVariableJson(IsJsonString(''))
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setValidHeaderJson(IsJsonString(''))
    );
  });

  it('not calls getResponse function with incorrect params on submit button click', async () => {
    const intialState = {
      request: {
        query: '{query: "Hello"}',
        variables: 'varr',
        headers: 'badd',
        baseUrl: 'http://localhost:3000',
        validHeaderJson: false,
        validVariableJson: false,
      },
    };
    const mockStore = configureStore();
    const storeTest = mockStore(intialState);
    const renderRequest = (valueLang: LanguageContextType) => {
      const getResponse = vi.fn();

      render(
        <LanguageContext.Provider value={valueLang}>
          <Provider store={storeTest}>
            <Request getResponse={getResponse} />
          </Provider>
        </LanguageContext.Provider>
      );

      return getResponse;
    };
    const getResponse = renderRequest(mockValueRu);

    const submitButton = screen.getByTestId('submitButton');

    await waitFor(() => fireEvent.click(submitButton));

    expect(IsJsonString(intialState.request.variables)).toBeFalsy();
    expect(IsJsonString(intialState.request.headers)).toBeFalsy();

    expect(getResponse).not.toHaveBeenCalled();
  });

  it('should call prettify after click button', async () => {
    const mockDispatch = vi.spyOn(store, 'dispatch');

    const { query, variables, headers } = store.getState().request;

    renderRequest(mockValueRu);
    const prettify = screen.getByTestId('prettifyButton');
    await waitFor(() => fireEvent.click(prettify));
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith(
      setQuery(prettifyData(removeTrailingSpacesEnterComments(query)))
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setVariables(prettifyData(removeTrailingSpacesEnterComments(variables)))
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      setHeaders(prettifyData(removeTrailingSpacesEnterComments(headers)))
    );
  });
});
