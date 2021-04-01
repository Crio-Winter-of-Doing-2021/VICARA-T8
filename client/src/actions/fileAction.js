import axios from 'axios';
import url from '../constants/BaseURL';
import authHeader from '../helpers/authHeader';
import streamSaver from 'streamsaver';
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
    dispatch({ type: fileConstants.ADD_TO_FAV_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: fileConstants.ADD_TO_FAV_FAILURE,
      payload: err.response.data,
    });
    console.log(err.response.data);
  }
};

export const removeFromFavourites = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.REMOVE_FROM_FAV_REQUEST });
    const config = { headers: authHeader(getState) };
    const body = { isFavourite: false };
    const { data } = await axios.put(`${url}/files/${id}`, body, config);
    dispatch({ type: fileConstants.REMOVE_FROM_FAV_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: fileConstants.REMOVE_FROM_FAV_FAILURE,
      payload: err.response.data,
    });
    console.log(err);
  }
};

export const deleteFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.DELETE_REQUEST });
    const config = { headers: authHeader(getState) };

    const { data } = await axios.delete(`${url}/files/${id}`, config);
    dispatch({ type: fileConstants.DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: fileConstants.DELETE_FAILURE,
      payload: err.response.data,
    });
    console.log(err);
  }
};

export const getPublicShareableLink = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.PUBLIC_SHAREABLE_LINK_REQUEST });
    const config = { headers: authHeader(getState) };

    const { data } = await axios.get(`${url}/files/${id}/public`, config);
    dispatch({
      type: fileConstants.PUBLIC_SHAREABLE_LINK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: fileConstants.PUBLIC_SHAREABLE_LINK_FAILURE,
      payload: err.response.data,
    });
    console.log(err);
  }
};

export const downloadFile = async (file) => {
  try {
    const extension = file.metadata.mimetype.split('/');
    const fileStream = streamSaver.createWriteStream(`${file.name}`);

    fetch(`${url}/${file.metadata.fileId}/public`).then((res) => {
      const readableStream = res.body;

      // more optimized
      if (window.WritableStream && readableStream.pipeTo) {
        return readableStream
          .pipeTo(fileStream)
          .then(() => console.log('done writing'));
      }

      // window.writer = fileStream.getWriter();

      // const reader = res.body.getReader();
      // const pump = () =>
      //   reader
      //     .read()
      //     .then((res) =>
      //       res.done ? writer.close() : writer.write(res.value).then(pump)
      //     );

      // pump();
    });
  } catch (err) {
    console.log(err);
  }
};
