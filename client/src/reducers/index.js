import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fileReducer from './fileReducer';
import uploadFileReducer from './uploadFileReducer';
export default combineReducers({
  auth: authReducer,
  uploadFile: uploadFileReducer,
  files: fileReducer,
});
