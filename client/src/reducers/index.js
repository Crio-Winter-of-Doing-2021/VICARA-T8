import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uploadFileReducer from './uploadFileReducer';
export default combineReducers({
  auth: authReducer,
  uploadFile: uploadFileReducer,
});
