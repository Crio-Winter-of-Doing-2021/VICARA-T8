import uploadFileConstants from '../constants/uploadFileConstants';
import url from '../constants/BaseURL';
import axios from 'axios';
import authHeader from '../helpers/authHeader';

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

export const uploadFile = (files) => (dispatch) => {
  const config = { headers: authHeader(getState) };
  if (files.length) {
    files.forEach(async (file) => {
      const formPayload = new FormData();
      formPayload.append('file', file.file);
      try {
        await axios({
          baseURL: url,
          url: '/file',
          method: 'post',
          data: formPayload,
          config,
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadProgress(file.id, percentageProgress));
          },
        });
        dispatch(successUploadFile(file.id));
      } catch (error) {
        dispatch(failureUploadFile(file.id));
      }
    });
  }
};
