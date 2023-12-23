import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-themes-all';
import { MirrorProps } from '@type/interfaces/props.interface';

const MirrorEditor = ({ height, value, onChange }: MirrorProps) => {
  return (
    <CodeMirror
      height={height}
      value={value}
      theme={tokyoNight}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default MirrorEditor;