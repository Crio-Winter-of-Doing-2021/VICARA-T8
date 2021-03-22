import { errorConstants } from '../constants/errorConstants';

const intialState = {
  message: {},
  status: null,
  id: null,
};

export default function errorReducer(state = intialState, action) {
  switch (action.type) {
    case errorConstants.GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case errorConstants.CLEAR_ERRORS:
      return {
        message: {},
        status: null,
      };
    default:
      return intialState;
  }
}
