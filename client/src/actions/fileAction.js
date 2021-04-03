import axios from 'axios';
import url from '../constants/BaseURL';
import authHeader from '../helpers/authHeader';
import { WritableStream } from 'web-streams-polyfill/ponyfill';
import streamSaver from 'streamsaver';
import fileConstants from '../constants/fileConstants';

export const loadFiles = (options) => async (dispatch, getState) => {
  try {
    if (options.hasOwnProperty('isMobile')) {
      if (options.isMobile) options.limit = 10;
      else options.limit = 10;
      options.sortByName = 'desc';
      delete options.isMobile;
    }
    dispatch({ type: fileConstants.FILES_REQUEST });
    const interceptor = attachInterceptorForTokenChecks(dispatch, getState);
    const config = { headers: authHeader(getState), params: options };
    const { data } = await axios.get(`${url}/files`, config);
    dispatch({ type: fileConstants.FILES_SUCCESS, payload: data });
    axios.interceptors.request.eject(interceptor);
  } catch (err) {
    //console.log(err);
  }
};

export const addToFavourites = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.ADD_TO_FAV_REQUEST });
    const interceptor = attachInterceptorForTokenChecks(dispatch, getState);
    const config = { headers: authHeader(getState) };
    const body = { isFavourite: true };
    const { data } = await axios.put(`${url}/files/${id}`, body, config);
    axios.interceptors.request.eject(interceptor);
    dispatch({
      type: fileConstants.ADD_TO_FAV_SUCCESS,
      payload: {
        data: data,
        message: 'Added to Favourites',
        type: 'ADD_TO_FAV_SUCCESS',
      },
    });
    dispatch(loadFiles());
    setTimeout(() => {
      dispatch({ type: 'CLEAR_TOAST_MENU' });
    }, 5000);
  } catch (err) {
    dispatch({
      type: fileConstants.ADD_TO_FAV_FAILURE,
      payload: { error: err.response.data, type: 'ADD_TO_FAV_ERROR' },
    });
    //console.log(err.response.data);
  }
};

export const removeFromFavourites = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.REMOVE_FROM_FAV_REQUEST });
    const interceptor = attachInterceptorForTokenChecks(dispatch, getState);
    const config = { headers: authHeader(getState) };
    const body = { isFavourite: false };
    const { data } = await axios.put(`${url}/files/${id}`, body, config);
    axios.interceptors.request.eject(interceptor);
    dispatch({
      type: fileConstants.REMOVE_FROM_FAV_SUCCESS,
      payload: {
        data: data,
        message: 'Removed from favourites.',
        type: 'REMOVE_FROM_FAV_SUCCESS',
      },
    });
    dispatch(loadFiles());
    setTimeout(() => {
      dispatch({ type: 'CLEAR_TOAST_MENU' });
    }, 5000);
  } catch (err) {
    dispatch({
      type: fileConstants.REMOVE_FROM_FAV_FAILURE,
      payload: { error: err.response.data, type: 'REMOVE_FROM_FAV_FAILURE' },
    });
    //console.log(err);
  }
};

export const deleteFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.DELETE_REQUEST });
    const interceptor = attachInterceptorForTokenChecks(dispatch, getState);
    const config = { headers: authHeader(getState) };

    const { data } = await axios.delete(`${url}/files/${id}`, config);
    dispatch({
      type: fileConstants.DELETE_SUCCESS,
      payload: {
        data: data,
        message: 'File deleted successfully.',
        type: 'DELETE_SUCCESS',
      },
    });
    dispatch(loadFiles());
    setTimeout(() => {
      dispatch({ type: 'CLEAR_TOAST_MENU' });
    }, 5000);
    axios.interceptors.request.eject(interceptor);
  } catch (err) {
    dispatch({
      type: fileConstants.DELETE_FAILURE,
      payload: { data: err.response.data, type: 'DELETE_FAILURE' },
    });
    //console.log(err);
  }
};

export const getPublicShareableLink = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: fileConstants.PUBLIC_SHAREABLE_LINK_REQUEST });
    const interceptor = attachInterceptorForTokenChecks(dispatch, getState);
    const config = { headers: authHeader(getState) };

    const { data } = await axios.get(`${url}/files/${id}/public`, config);
    dispatch({
      type: fileConstants.PUBLIC_SHAREABLE_LINK_SUCCESS,
      payload: {
        data,
        message: 'Public link',
        type: 'PUBLIC_SHAREABLE_LINK_SUCCESS',
      },
    });
    axios.interceptors.request.eject(interceptor);
  } catch (err) {
    dispatch({
      type: fileConstants.PUBLIC_SHAREABLE_LINK_FAILURE,
      payload: {
        data: err.response.data,
        type: 'PUBLIC_SHAREABLE_LINK_FAILURE',
      },
    });
    //console.log(err);
  }
};

export const downloadFile = (file) => (dispatch, getState) => {
  try {
    //const extension = file.metadata.mimetype.split('/');
    const config = {
      method: 'GET',
      headers: authHeader(getState),
    };
    console.log(config);
    fetch(`${url}/files/${file.metadata.fileId}/download`, config).then(
      (response) => {
        // let contentDisposition = response.headers.get('Content-Disposition');
        // console.log(response);
        // let fileName = contentDisposition.substring(
        //   contentDisposition.lastIndexOf('=') + 1
        // );

        // These code section is adapted from an example of the StreamSaver.js
        // https://jimmywarting.github.io/StreamSaver.js/examples/fetch.html

        // If the WritableStream is not available (Firefox, Safari), take it from the ponyfill
        if (!window.WritableStream) {
          streamSaver.WritableStream = WritableStream;
          window.WritableStream = WritableStream;
        }

        const fileStream = streamSaver.createWriteStream(`${file.name}`);
        const readableStream = response.body;

        // More optimized
        if (readableStream.pipeTo) {
          return readableStream.pipeTo(fileStream);
        }

        window.writer = fileStream.getWriter();

        const reader = response.body.getReader();
        const pump = () =>
          reader
            .read()
            .then((res) =>
              res.done
                ? window.writer.close()
                : window.writer.write(res.value).then(pump)
            );

        pump();
      }
    );
  } catch (err) {
    console.log(err);
  }
};

function attachInterceptorForTokenChecks(dispatch, getState) {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      //const dispatch = useDispatch();
      const originalRequest = error.config;
      if (!getState().auth.tokens) return;
      let refreshToken = getState().auth.tokens.refreshToken;
      if (
        refreshToken &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return axios
          .post(`${url}/auth/refresh-token`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              const tokens = JSON.stringify({
                accessToken: res.data.tokens.accessToken,
                refreshToken,
              });
              localStorage.setItem('tokens', tokens);
              console.log(originalRequest);
              originalRequest.headers.Authorization =
                'Bearer ' + res.data.tokens.accessToken;
              dispatch({ type: 'REFRESH_TOKENS', payload: JSON.parse(tokens) });

              return axios(originalRequest);
            }
          });
      }
      console.log('error');
      return Promise.reject(new Error('Something went wrong'));
    }
  );

  return axios;
}
