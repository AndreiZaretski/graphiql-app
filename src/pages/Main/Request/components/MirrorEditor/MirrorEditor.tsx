import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-themes-all';
import { MirrorProps } from '@type/interfaces/props.interface';
import styles from './MirrorEditor.module.scss';

const MirrorEditor = ({ height, value, onChange, editable }: MirrorProps) => {
  return (
    <CodeMirror
      className={
        editable ? `${styles.editor_request} ${styles.editor}` : styles.editor
      }
      height={height}
      value={value}
      theme={tokyoNight}
      editable={editable}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default MirrorEditor;
