import { fireEvent, screen, render } from '@testing-library/react';
import { mockValueEn, mockValueRu } from '@utils/test/mockLanguageContext';
import { ChangeLanguage } from './ChangeLanguage';
import { LanguageContext, LanguageContextType } from '@context/LanguageContext';
import { LanguageKey } from '@type/enums/language.enum';

const renderComponent = (value: LanguageContextType) => {
  render(
    <LanguageContext.Provider value={value}>
      <ChangeLanguage />
    </LanguageContext.Provider>
  );
};

describe('ChangeLanguage', () => {
  it('Should have text', async () => {
    renderComponent(mockValueEn);
    const span = screen.getByText('en');
    expect(span).toBeInTheDocument();
  });

  it('Should have checkbox', async () => {
    renderComponent(mockValueEn);
    const input = screen.getByTestId('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(input).not.toBeChecked();
  });

  it('Should call handleChange ru', async () => {
    renderComponent(mockValueEn);
    const input = screen.getByTestId('checkbox');
    fireEvent.click(input);
    expect(mockValueEn.setLanguage).toHaveBeenCalledWith(LanguageKey.Ru);
  });

  it('Should call handleChange en', async () => {
    renderComponent(mockValueRu);
    const input = screen.getByTestId('checkbox');
    fireEvent.click(input);
    expect(mockValueRu.setLanguage).toHaveBeenCalledWith(LanguageKey.En);
  });
});
