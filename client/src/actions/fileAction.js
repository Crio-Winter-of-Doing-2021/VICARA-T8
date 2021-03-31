import axios from 'axios';
import url from '../constants/BaseURL';
import authHeader from '../helpers/authHeader';

import fileConstants from '../constants/fileConstants';

export const loadFiles = (options) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.FILES_REQUEST });
    const config = { headers: authHeader(getState), params: options };
    const { data } = await axios.get(`${url}/files`, config);
    dispatch({ type: fileConstants.FILES_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
};
