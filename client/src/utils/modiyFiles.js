import { size } from 'lodash';

export const modifyFiles = (existingFiles, files) => {
  let fileToUpload = {};
  for (let i = 0; i < files.length; i++) {
    const sz = size(existingFiles);
    const id = sz + i + 1;
    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        size: files[i].size,
        file: files[i],
        progress: 0,
      },
    };
  }

  return fileToUpload;
};
