import { setVariables, setHeaders } from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { useCallback, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MirrorEditor from '../MirrorEditor/MirrorEditor';
import { LanguageContext } from '@context/LanguageContext';

const EditorVariablesHeaders = () => {
  const { variables, headers } = useSelector(
    (state: AppState) => state.request
  );

  const {
    data: {
      mainPage: { headersName, variableName, show, hide },
    },
  } = useContext(LanguageContext);

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

  const showHideText = () => {
    return showEditor ? hide : show;
  };

  return (
    <div className="mirror_panel">
      <div className="mirror_panel_header">
        <button onClick={showVariablesEditor}>{variableName}</button>
        <button onClick={showHeadersEditor}>{headersName}</button>
        <button onClick={() => toggleEditor(showEditor)}>
          {showHideText()}
        </button>
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
