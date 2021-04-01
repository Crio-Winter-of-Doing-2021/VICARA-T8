import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadCard from './UploadCard';
import { size, toArray } from 'lodash';
import { uploadFile } from '../../../actions/uploadFileAction';
const UploadProgress = () => {
  const dispatch = useDispatch();
  const fileProgress = useSelector((state) => state.uploadFile.fileProgress);
  const uploadedFileAmount = size(fileProgress);
  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(
      (file) => file.progress === 0
    );
    if (size(fileToUpload) > 0) dispatch(uploadFile(fileToUpload));
  }, [uploadedFileAmount, dispatch, fileProgress]);
  return uploadedFileAmount > 0 ? (
    <div className="fixed bottom-5 right-10 bg-white-200 rounded-md ">
      <div className="flex flex-col justify-center items-center pb-4">
        <div className="w-full border text-center p-2 bg-gray-300 text-gray-800 font-bold">
          Uploading Files ...
        </div>
        {uploadedFileAmount > 0
          ? toArray(fileProgress).map((file) => (
              <div className="border border-t-0 pb-2">
                <UploadCard key={file.id} file={file}></UploadCard>
              </div>
            ))
          : null}
      </div>
    </div>
  ) : null;
};

export default UploadProgress;
