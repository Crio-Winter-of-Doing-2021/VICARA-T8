import authConstants from '../constants/authConstants';

const intialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function authReducer(state = intialState, action) {
  switch (action.type) {
    case authConstants.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case authConstants.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case authConstants.LOGIN_SUCCESS:
    case authConstants.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case authConstants.AUTH_ERROR:
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGOUT:
    case authConstants.REGISTER_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
