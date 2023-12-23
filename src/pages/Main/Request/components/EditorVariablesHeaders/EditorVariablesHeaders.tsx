import { setVariables, setHeaders } from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MirrorEditor from '../MirrorEditor/MirrorEditor';

const EditorVariablesHeaders = () => {
  const { variables, headers } = useSelector(
    (state: AppState) => state.request
  );

  const dispatch = useDispatch();
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

  const [showVariables, setShowVariables] = useState(true);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const toggleEditor = (prev: boolean) => {
    setShowEditor(!prev);
  };

  const showVariablesEditor = () => {
    setShowVariables(true);
    setShowHeaders(false);
    setShowEditor(true);
  };

  const showHeadersEditor = () => {
    setShowVariables(false);
    setShowHeaders(true);
    setShowEditor(true);
  };

  return (
    <div className="mirror_panel">
      <div className="mirror_panel_header">
        <button onClick={showVariablesEditor}>1</button>
        <button onClick={showHeadersEditor}>2</button>
        <button onClick={() => toggleEditor(showEditor)}>3</button>
      </div>
      {showEditor && (
        <div className="mirror_panel_block">
          {showVariables && (
            <MirrorEditor
              height="250px"
              value={variables}
              onChange={onChangeVariables}
            />
          )}

          {showHeaders && (
            <MirrorEditor
              height="250px"
              value={headers}
              onChange={onChangeHeaders}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditorVariablesHeaders;
