import axios from 'axios';
import authConstants from '../constants/authConstants';
import authHeader from '../helpers/authHeader';
import { returnErrors } from './errorAction';
import url from '../constants/BaseURL';

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: authConstants.USER_LOADING });
    const token = getState().auth.token;
    const config = { headers: authHeader() };
    const { data } = await axios.get(`${url}/auth/user`, config);
    console.log(data);

    dispatch({
      type: authConstants.USER_LOADED,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response.data.message, err.response.status));
    dispatch({
      type: authConstants.AUTH_ERROR,
      payload: err,
    });
  }
};
