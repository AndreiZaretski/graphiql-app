import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-themes-all';
import { MirrorProps } from '@type/interfaces/props.interface';
import styles from './MirrorEditor.module.scss';
import { langs } from '@uiw/codemirror-extensions-langs';

const MirrorEditor = ({ height, value, onChange, editable }: MirrorProps) => {
  return (
    <CodeMirror
      className={
        editable ? `${styles.editor_request} ${styles.editor}` : styles.editor
      }
      data-testid="codeMirror"
      height={height}
      value={value}
      theme={tokyoNight}
      editable={editable}
      extensions={[langs.javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export { MirrorEditor };
