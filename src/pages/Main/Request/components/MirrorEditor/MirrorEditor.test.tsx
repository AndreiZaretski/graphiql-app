import { render, screen } from '@testing-library/react';
import { MirrorEditor } from './MirrorEditor';
import { MirrorProps } from '@type/interfaces/props.interface';

const renderMirrorEditor = ({
  height,
  value,
  onChange,
  editable,
}: MirrorProps) => {
  return render(
    <MirrorEditor
      height={height}
      value={value}
      onChange={onChange}
      editable={editable}
    />
  );
};

describe('MirrorEditor', () => {
  it('renders MirrorEditor component with props', () => {
    renderMirrorEditor({
      height: '300px',
      value: 'console.log("Hello, world!");',
      onChange: vi.fn(),
      editable: true,
    });
    const editor = screen.getByTestId('codeMirror');
    expect(editor).toBeInTheDocument();
  });
});
