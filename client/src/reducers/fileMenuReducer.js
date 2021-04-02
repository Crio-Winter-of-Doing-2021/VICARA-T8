import fileConstants from '../constants/fileConstants';
const INTIAL_STATE = {
  isLoading: false,
  status: 'faliure',
};

export default function fileMenuReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case fileConstants.ADD_TO_FAV_REQUEST:
    case fileConstants.REMOVE_FROM_FAV_REQUEST:
    case fileConstants.DELETE_REQUEST:
    case fileConstants.PUBLIC_SHAREABLE_LINK_REQUEST:
      return {
        ...state,
        isLoading: true,
        status: 'faliure',
      };
    case fileConstants.ADD_TO_FAV_SUCCESS:
    case fileConstants.REMOVE_FROM_FAV_SUCCESS:
    case fileConstants.DELETE_SUCCESS:
    case fileConstants.PUBLIC_SHAREABLE_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
        status: 'success',
      };

    case fileConstants.ADD_TO_FAV_FAILURE:
    case fileConstants.REMOVE_FROM_FAV_FAILURE:
    case fileConstants.DELETE_FAILURE:
    case fileConstants.PUBLIC_SHAREABLE_LINK_FAILURE:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
        status: 'faliure',
      };
    case fileConstants.CLEAR_TOAST_MENU:
      return {
        isLoading: false,
        status: 'faliure',
      };
    default:
      return state;
  }
}
