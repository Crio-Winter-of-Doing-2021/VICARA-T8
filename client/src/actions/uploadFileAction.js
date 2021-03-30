import uploadFileConstants from '../constants/uploadFileConstants';

export const setUploadFile = (data) => ({
  type: uploadFileConstants.SET_UPLOAD_FILE,
  payload: data,
});
