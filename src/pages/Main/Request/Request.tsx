import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { RequestProps } from '@type/interfaces/props.interface';
import {
  prettifyData,
  removeTrailingSpacesEnterComments,
} from '@utils/prettify/prettify';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHeaders,
  setQuery,
  setVariables,
} from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { isValidFormat } from '@utils/checkString';
import { parseHeaders } from '@utils/parseString';

const Request = (props: RequestProps) => {
  const { getResponse } = props;

  const { query, variables, headers, baseUrl } = useSelector(
    (state: AppState) => state.request
  );

  const dispatch = useDispatch();

  const onChangeQuery = useCallback(
    (value: string) => {
      dispatch(setQuery(value));
    },
    [dispatch]
  );

  const onChangeVariables = useCallback(
    (value: string) => {
      dispatch(setVariables(value));
    },
    [dispatch]
  );

  const onChangeHeaders = useCallback(
    (value: string) => {
      dispatch(setHeaders(value));
    },
    [dispatch]
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isValidFormat(variables) && isValidFormat(headers)) {
      const newHeaders = parseHeaders(headers);
      getResponse({ query, variables, headers: newHeaders, baseUrl });
    }
  };

  const handlePrettify = () => {
    dispatch(setQuery(prettifyData(removeTrailingSpacesEnterComments(query))));
    dispatch(
      setVariables(prettifyData(removeTrailingSpacesEnterComments(variables)))
    );
    dispatch(
      setHeaders(prettifyData(removeTrailingSpacesEnterComments(headers)))
    );
  };

  return (
    <section>
      <CodeMirror
        height="500px"
        value={query}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
        onChange={onChangeQuery}
      />

      <CodeMirror
        height="500px"
        value={variables}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
        onChange={onChangeVariables}
      />

      <CodeMirror
        height="500px"
        value={headers}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
        onChange={onChangeHeaders}
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
