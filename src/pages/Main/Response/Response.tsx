import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

const Request = (props: Record<'data', string>) => {
  const { data } = props;

  const prettifyData = (data: string) => {
    return data.split('{').join('\t{').split('},').join('},\n');
  };

  return (
    <section>
      <CodeMirror
        height="500px"
        value={data ? prettifyData(data) : ''}
        editable={false}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
      />
    </section>
  );
};

export default Request;
