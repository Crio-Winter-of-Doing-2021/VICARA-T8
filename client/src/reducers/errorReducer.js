import { errorConstants } from '../constants/errorConstants';

const intialState = {
  message: {},
  status: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case errorConstants.GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
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
