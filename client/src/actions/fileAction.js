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

export const addToFavourites = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.ADD_TO_FAV_REQUEST });
    const config = { headers: authHeader(getState) };
    const body = { isFavourite: true };
    const { data } = await axios.put(`${url}/files/${id}`, body, config);
    dispatch({ type: fileConstants.ADD_TO_FAV_SUCCESS });
  } catch (err) {
    dispatch({ type: fileConstants.ADD_TO_FAV_FAILURE });
    console.log(err);
  }
};

export const removeFromFavourites = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.REMOVE_FROM_FAV_REQUEST });
    const config = { headers: authHeader(getState) };
    const body = { isFavourite: false };
    const { data } = await axios.put(`${url}/files/${id}`, body, config);
    dispatch({ type: fileConstants.REMOVE_FROM_FAV_SUCCESS });
  } catch (err) {
    dispatch({ type: fileConstants.REMOVE_FROM_FAV_FAILURE });
    console.log(err);
  }
};
