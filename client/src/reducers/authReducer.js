import authConstants from '../constants/authConstants';

const intialState = {
  tokens: localStorage.getItem('tokens'),
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
        user: action.payload.user,
      };
    case authConstants.LOGIN_REQUEST:
    case authConstants.REGISTER_REQUEST:
      return {
        tokens: null,
        isAuthenticated: false,
        isLoading: true,
        user: null,
      };
    case authConstants.LOGIN_SUCCESS:
    case authConstants.REGISTER_SUCCESS:
      localStorage.setItem('tokens', action.payload.tokens);
      return {
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        user: null,
      };
    case authConstants.AUTH_ERROR:
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGOUT:
    case authConstants.REGISTER_FAILURE:
      localStorage.removeItem('tokens');
      return {
        ...state,
        tokens: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
