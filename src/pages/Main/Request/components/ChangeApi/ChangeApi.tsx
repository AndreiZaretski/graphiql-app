import { setBaseUrl } from '@store/features/requestDataSlice';
import { AppState } from '@store/store';
import { isValidUrl } from '@utils/validationUrl';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ChangeApi = () => {
  const { baseUrl } = useSelector((state: AppState) => state.request);

  const [inputBaseUrl, setInputBaseUrl] = useState(baseUrl);

  const dispatch = useDispatch();

  const handleChangeBaseUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBaseUrl(e.target.value);
  };

  const handleClickBaseUrl = () => {
    if (isValidUrl(inputBaseUrl)) {
      dispatch(setBaseUrl(inputBaseUrl));
    } else {
      //Replace this method
      alert('Please enter a valid URL');
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputBaseUrl}
        onChange={handleChangeBaseUrl}
        placeholder="Enter baseUrl"
      />
      <button type="button" onClick={handleClickBaseUrl}>
        {'Change Api'}
      </button>
    </>
  );
};

export default ChangeApi;
