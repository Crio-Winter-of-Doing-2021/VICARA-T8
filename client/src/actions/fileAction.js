import axios from 'axios';

const { default: fileConstants } = require('../constants/fileConstants');

export const loadFiles = () => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.FILES_REQUEST });
    const config = { headers: authHeader(getState) };
    const { data } = await axios.get(`${url}/files`, config);
    dispatch({ type: fileConstants.FILES_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
};
