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
  } catch (err) {
    console.log(err.response.data);
    // dispatch(
    //   returnErrors(
    //     err.response.data.message,
    //     err.response.status,
    //     'REGISTER_FAILURE'
    //   )
    // );
    dispatch({
      type: authConstants.REGISTER_FAILURE,
      payload: err.response.data,
    });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const body = JSON.parse(JSON.stringify({ email, password }));
    console.log(body);
    const { data } = await axios.post(`${url}/auth/login`, body);
    console.log(data);

    dispatch({ type: authConstants.LOGIN_SUCCESS, payload: data });
  } catch (err) {
    console.log(err.response.data);
    // dispatch(
    //   returnErrors(
    //     err.response.data.message,
    //     err.response.status,
    //     'LOGIN_FAILURE'
    //   )
    // );
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: err.response.data,
    });
  }
};

// OAuth User
export const googleOAuth = (user, token) => async (dispatch) => {
  try {
    dispatch({ type: authConstants.OAUTH_REQUEST });
    const body = JSON.parse(JSON.stringify({ user, token }));
    const { data } = await axios.post(`${url}/auth/oauth/google`, body);
    dispatch({ type: authConstants.OAUTH_SUCCESS, payload: data });
  } catch (err) {
    console.log(err.response.data);
    // dispatch(
    //   returnErrors(
    //     err.response.data.message,
    //     err.response.status,
    //     'OAUTH_FAILURE'
    //   )
    // );
    dispatch({
      type: authConstants.OAUTH_FAILURE,
      payload: err.response.data,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: authConstants.USER_LOADING });
    const config = { headers: authHeader(getState) };
    console.log(config);
    const { data } = await axios.get(`${url}/auth/user`, config);
    console.log(data);

    dispatch({
      type: authConstants.USER_LOADED,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data.message, err.response.status));
    dispatch({
      type: authConstants.AUTH_ERROR,
      payload: err.response.data,
    });
  }
};
