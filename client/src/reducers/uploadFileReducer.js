import uploadFileConstants from '../constants/uploadFileConstants';
import { modifyFiles } from '../utils/modiyFiles';
const INITIAL_STATE = {
  fileProgress: {},
};

const fileProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uploadFileConstants.SET_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        },
      };

    case uploadFileConstants.SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };

    case uploadFileConstants.SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 1,
          },
        },
      };

    case uploadFileConstants.FAILURE_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case uploadFileConstants.REMOVE_UPLOADED_FILE:
      delete state.fileProgress[action.payload];
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
        },
      };

    default:
      return state;
  }
};

export default fileProgressReducer;
