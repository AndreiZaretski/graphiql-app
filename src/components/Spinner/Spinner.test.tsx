import Spinner from './Spinner';
import { screen, render } from '@testing-library/react';

describe('ChangeLanguage', () => {
  it('Spinnr should to be', async () => {
    render(<Spinner />);
    const spiner = screen.getByTestId('spiner');
    expect(spiner).toBeInTheDocument();
  });
});
