import uploadFileConstants from '../constants/uploadFileConstants';
import url from '../constants/BaseURL';
import axios from 'axios';
import authHeader from '../helpers/authHeader';
import { loadUser } from './authAction';

export const setUploadFile = (data) => ({
  type: uploadFileConstants.SET_UPLOAD_FILE,
  payload: data,
});

export const setUploadProgress = (id, progress) => ({
  type: uploadFileConstants.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
});

export const successUploadFile = (id) => ({
  type: uploadFileConstants.SUCCESS_UPLOAD_FILE,
  payload: id,
});

export const failureUploadFile = (id) => ({
  type: uploadFileConstants.FAILURE_UPLOAD_FILE,
  payload: id,
});

export const removeUploadedFile = (id) => (dispatch) => {
  setTimeout(
    () =>
      dispatch({
        type: uploadFileConstants.REMOVE_UPLOADED_FILE,
        payload: id,
      }),
    3000
  );
};

export const uploadFile = (files) => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: authHeader(getState).Authorization,
      'Content-Type': 'multipart/form-data',
    },
  };
  console.log(config);
  if (files.length) {
    files.forEach(async (file) => {
      const formPayload = new FormData();
      formPayload.append('size', file.size);
      formPayload.append('file', file.file);
      console.log(formPayload);
      try {
        await axios({
          method: 'post',
          url: `${url}/files/upload`,
          data: formPayload,
          headers: config.headers,
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadProgress(file.id, percentageProgress));
          },
        });
        dispatch(loadUser());
        dispatch(successUploadFile(file.id));
        dispatch(removeUploadedFile(file.id));
      } catch (error) {
        dispatch(failureUploadFile(file.id));
      }
    });
  }
};
