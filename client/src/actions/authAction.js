import axios from 'axios';
import authConstants from '../constants/authConstants';
import authHeader from '../helpers/authHeader';
import { returnErrors } from './errorAction';
import url from '../constants/BaseURL';

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({ type: authConstants.REGISTER_REQUEST });
    const body = JSON.parse(JSON.stringify({ name, email, password }));
    console.log(body);
    const { data } = await axios.post(`${url}/auth/register`, body);
    console.log(data);

    dispatch({ type: authConstants.REGISTER_SUCCESS, payload: data });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    dispatch(
      returnErrors(
        err.response.data.message,
        err.response.status,
        'REGISTER_FAILURE'
      )
    );
    dispatch({
      type: authConstants.REGISTER_FAILURE,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: authConstants.USER_LOADING });
    const config = authHeader(getState);
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
