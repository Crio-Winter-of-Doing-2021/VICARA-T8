import axios from 'axios';
import authConstants from '../constants/authConstants';
import authHeader from '../helpers/authHeader';
import url from '../constants/BaseURL';
//import customAxios from '../helpers/Interceptor';

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({ type: authConstants.REGISTER_REQUEST });
    const body = JSON.parse(JSON.stringify({ name, email, password }));
    //console.log(body);
    const { data } = await axios.post(`${url}/auth/register`, body);
    //console.log(data);

    dispatch({ type: authConstants.REGISTER_SUCCESS, payload: data });
  } catch (err) {
    //console.log(err.response.data);
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
    //console.log(body);
    const { data } = await axios.post(`${url}/auth/login`, body);
    //console.log(data);

    dispatch({ type: authConstants.LOGIN_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
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
    //console.log(err.response.data);
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

    const interceptor = attachInterceptorForTokenChecks(dispatch, getState);

    const config = { headers: authHeader(getState) };

    //console.log(config);
    const { data } = await axios.get(`${url}/auth/user`, config);
    //console.log(data);
    //const { data } = await customAxios.get(`${url}/auth/user`);
    dispatch({
      type: authConstants.USER_LOADED,
      payload: data,
    });

    axios.interceptors.request.eject(interceptor);
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data.message, err.response.status));
    dispatch({
      type: authConstants.AUTH_ERROR,
      payload: err.response.data,
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: authConstants.LOGOUT });
  } catch (err) {}
};

function attachInterceptorForTokenChecks(dispatch, getState) {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      //const dispatch = useDispatch();
      const originalRequest = error.config;

      let refreshToken = getState().auth.tokens.refreshToken;
      if (
        refreshToken &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return axios
          .post(`${url}/auth/refresh-token`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              const tokens = JSON.stringify({
                accessToken: res.data.tokens.accessToken,
                refreshToken,
              });
              localStorage.setItem('tokens', tokens);
              console.log(originalRequest);
              originalRequest.headers.Authorization =
                'Bearer ' + res.data.tokens.accessToken;
              dispatch({ type: 'REFRESH_TOKENS', payload: JSON.parse(tokens) });

              return axios(originalRequest);
            }
          });
      }
      console.log('error');
      return Promise.reject(new Error('Something went wrong'));
    }
  );

  return axios;
}
