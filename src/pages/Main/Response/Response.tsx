import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { prettifyData } from '@utils/prettify/prettify';

// comment for test commit

const Request = (props: Record<'data', Record<string, string>>) => {
  const { data } = props;

  return (
    <section>
      <CodeMirror
        height="500px"
        value={data ? prettifyData(JSON.stringify(data)) : ''}
        editable={false}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
      />
    </section>
  );
};

export default Request;
