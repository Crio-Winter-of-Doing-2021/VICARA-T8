import axios from 'axios';
import authConstants from '../constants/authConstants';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: authConstants.USER_LOADING });
};
