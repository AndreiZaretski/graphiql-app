import { LanguageContextType, LanguageContext } from '@context/LanguageContext';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { EditorVariablesHeaders } from './EditorVariablesHeaders';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockValueEn } from '@utils/test/mockLanguageContext';

const renderEditorVariablesHeaders = (valueLang: LanguageContextType) => {
  render(
    <LanguageContext.Provider value={valueLang}>
      <Provider store={store}>
        <EditorVariablesHeaders />
      </Provider>
    </LanguageContext.Provider>
  );
};

describe('EditorVariablesHeaders', () => {
  it('should to be in the document', () => {
    renderEditorVariablesHeaders(mockValueEn);
    const div = screen.getByRole('editorVariable');
    expect(div).toBeInTheDocument();
  });

  it('should to be variables in the document', () => {
    renderEditorVariablesHeaders(mockValueEn);
    const buttonShowVariables = screen.getByTestId('showVariables');
    fireEvent.click(buttonShowVariables);
    const changeVariables = screen.getByTestId('codeMirror');
    expect(changeVariables).toBeInTheDocument();
  });

  it('should to be headers in the document', () => {
    renderEditorVariablesHeaders(mockValueEn);

    const buttonShowHeaders = screen.getByTestId('showHeaders');

    fireEvent.click(buttonShowHeaders);

    const changeVariables = screen.getByTestId('codeMirror');

    expect(changeVariables).toBeInTheDocument();
  });

  it('should to work toggle button', () => {
    renderEditorVariablesHeaders(mockValueEn);

    const buttonToggle = screen.getByTestId('toggleButtonEditor');
    fireEvent.click(buttonToggle);
    const changeVariables = screen.getByTestId('codeMirror');
    expect(changeVariables).toBeInTheDocument();
    fireEvent.click(buttonToggle);
    expect(changeVariables).not.toBeInTheDocument();
  });
});
