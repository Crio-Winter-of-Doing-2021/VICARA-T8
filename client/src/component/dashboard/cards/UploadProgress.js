import React from 'react';
import { useSelector } from 'react-redux';
import UploadCard from './UploadCard';
import { size, toArray } from 'lodash';
const UploadProgress = () => {
  const fileProgress = useSelector((state) => state.upload.fileProgress);
  const uploadedFileAmount = size(fileProgress);
  return uploadedFileAmount > 0 ? (
    <div className="fixed bottom-5 right-10 bg-white-200 rounded-md ">
      <div className="flex flex-col justify-center items-center pb-4">
        <div className="w-full border text-center p-2 bg-gray-300 text-gray-800 font-bold">
          Uploading Files ...
        </div>
        {size(fileProgress)
          ? toArray(fileProgress).map((file) => (
              <div className="border border-t-0 pb-2">
                <UploadCard
                  key={file.id}
                  file={file.name}
                  progress={file.progress}
                ></UploadCard>
              </div>
            ))
          : null}
      </div>
    </div>
  ) : null;
};

export default UploadProgress;
