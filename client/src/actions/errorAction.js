import errorConstants from '../constants/errorConstants';
// RETURN ERRORS
export const returnErrors = (message, status, id = null) => {
  return {
    type: errorConstants.GET_ERRORS,
    payload: { message, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: errorConstants.CLEAR_ERRORS,
  };
};
