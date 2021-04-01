import fileConstants from '../constants/fileConstants';
const INTIAL_STATE = {
  isLoading: false,
};

export default function fileMenuReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case fileConstants.ADD_TO_FAV_REQUEST:
    case fileConstants.REMOVE_FROM_FAV_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case fileConstants.ADD_TO_FAV_SUCCESS:
    case fileConstants.REMOVE_FROM_FAV_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };

    case fileConstants.ADD_TO_FAV_FAILURE:
    case fileConstants.REMOVE_FROM_FAV_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
