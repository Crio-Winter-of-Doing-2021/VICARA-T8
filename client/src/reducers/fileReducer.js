const { default: fileConstants } = require('../constants/fileConstants');

const INTIAL_STATE = {
  isLoading: false,
  length: 0,
  data: [],
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
        length: action.payload.length,
        data: action.payload.data,
      };

    case fileConstants.FILES_FAILURE:
      return {
        ...state,
        isLoading: false,
        length: 0,
        data: [],
      };
    default:
      return state;
  }
}
