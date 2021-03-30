import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uploadFileReducer from './uploadFileReducer';
export default combineReducers({
  auth: authReducer,
  upload: uploadFileReducer,
});
