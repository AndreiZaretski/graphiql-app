import { render, screen } from '@testing-library/react';
import Response from './Response';
import { succesAnswer } from '@utils/test/mockData';

const renderResponse = () => {
  return render(<Response data={succesAnswer} />);
};

describe('Response', () => {
  it('renders Response component with props', () => {
    renderResponse();
    const editor = screen.getByTestId('response');
    expect(editor).toBeInTheDocument();
  });
});
