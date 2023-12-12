import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { RequestProps } from '@type/interfaces/props.interface';
import {
  prettifyData,
  removeTrailingSpacesEnterComments,
} from '@utils/prettify/prettify';

const Request = (props: RequestProps) => {
  const { getResponse } = props;
  const [value, setValue] = useState(`query Query {
    characters(page: 2, filter: { name: "Morty" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }`);

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getResponse(value);
  };

  const handlePrettify = () => {
    setValue(prettifyData(removeTrailingSpacesEnterComments(value)));
  };

  return (
    <section>
      <CodeMirror
        height="500px"
        value={value}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        {'>'}
      </button>
      <button type="button" onClick={handlePrettify}>
        {'Prettify'}
      </button>
    </section>
  );
};

export default Request;
