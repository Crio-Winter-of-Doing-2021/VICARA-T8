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

    default:
      return state;
  }
};

export default fileProgressReducer;
