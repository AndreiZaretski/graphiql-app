import { fireEvent, screen, render } from '@testing-library/react';
import { mockValueEn } from '@utils/test/mockLanguageContext';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import Documentation from './Documentation';
import { mockSchema } from '@utils/test/mockSchema';
import { LanguageContext, LanguageContextType } from '@context/LanguageContext';
import { IntrospectionSchema } from 'graphql';

Element.prototype.scrollIntoView = vi.fn();

const renderComponent = (value: LanguageContextType) => {
  render(
    <LanguageContext.Provider value={value}>
      <Provider store={store}>
        <Documentation schema={mockSchema as IntrospectionSchema} />
      </Provider>
    </LanguageContext.Provider>
  );
};

describe('Documentation', () => {
  it('Should correctly show Query section', async () => {
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('Query'));
    expect(
      screen.getByText('Get the list of all characters')
    ).toBeInTheDocument();
  });

  it('Should correctly set selectType', async () => {
    const mockDispatch = vi.spyOn(store, 'dispatch');
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('Nested-1-1-btn'));
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 'Nested-1-1-btn',
      type: 'documentation/setSelectedType',
    });
  });

  it('Click all buttons to test function onClick', async () => {
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('Query'));
    fireEvent.click(screen.getByText('Nested-2-2-btn'));
    fireEvent.click(screen.getByText('Query'));
    fireEvent.click(screen.getByText('Nested-2-btn'));
    fireEvent.click(screen.getByText('Query'));
    fireEvent.click(screen.getByText('Nested-3-3-btn'));
    fireEvent.click(screen.getByText('Query'));
    fireEvent.click(screen.getByText('Nested-3-btn'));
    fireEvent.click(screen.getByText('Query'));
    fireEvent.click(screen.getByText('Nested-1-1-btn'));
    fireEvent.click(screen.getByText('Query'));
    fireEvent.click(screen.getByText('Nested-1-btn'));
    fireEvent.click(screen.getByText('Query'));
  });

  it('Should open Type section and close Query section after clicking on Return type', () => {
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('Characters'));
    expect(
      screen.queryByText('Get the list of all characters')
    ).not.toBeInTheDocument();
    expect(screen.getByText(/info/)).toBeInTheDocument();
    expect(screen.getByText(/results/)).toBeInTheDocument();
  });

  it('Should switch to other type and close previous type', async () => {
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('ID'));
    expect(screen.queryByText(/info/)).not.toBeInTheDocument();
    expect(
      screen.getByText(/The `ID` scalar type represents a unique identifier/)
    ).toBeInTheDocument();
  });

  it('Should switch to Enum type and display information correctly ', async () => {
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('CacheControlScope'));
    expect(screen.getByText('PUBLIC')).toBeInTheDocument();
    expect(screen.getByText('PRIVATE')).toBeInTheDocument();
  });

  it('Should switch to Input object type and display information correctly ', async () => {
    renderComponent(mockValueEn);
    fireEvent.click(screen.getByText('Input object'));
    expect(screen.getByText(/input field/)).toBeInTheDocument();
    expect(screen.getByText('Input return type')).toBeInTheDocument();
  });
});
