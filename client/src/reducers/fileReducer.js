import fileConstants from '../constants/fileConstants';
const INTIAL_STATE = {
  isLoading: false,
};

export default function fileReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case fileConstants.FILES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case fileConstants.FILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };

    case fileConstants.FILES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
