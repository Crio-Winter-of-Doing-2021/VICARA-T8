import authConstants from '../constants/authConstants';

const intialState = {
  tokens: JSON.parse(localStorage.getItem('tokens')),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  error: { message: {} },
  success: false,
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
        user: action.payload.user,
        success: true,
      };
    case authConstants.LOGIN_REQUEST:
    case authConstants.REGISTER_REQUEST:
    case authConstants.OAUTH_REQUEST:
      return {
        ...state,
        tokens: null,
        isAuthenticated: false,
        isLoading: true,
        user: null,
      };
    case authConstants.LOGIN_SUCCESS:
    case authConstants.REGISTER_SUCCESS:
    case authConstants.OAUTH_SUCCESS:
      localStorage.setItem('tokens', JSON.stringify(action.payload.tokens));
      return {
        ...state,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        user: null,
        success: true,
      };
    case authConstants.AUTH_ERROR:
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGOUT:
    case authConstants.REGISTER_FAILURE:
    case authConstants.OAUTH_FAILURE:
      localStorage.removeItem('tokens');
      return {
        ...state,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: { message: action.payload.message },
        success: false,
      };
    case authConstants.AUTH_CLEAR_ERRORS:
      return {
        ...state,
        error: { message: {} },
        success: false,
      };
    default:
      return state;
  }
}
