// RETURN ERRORS
export const returnErrors = (message, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
