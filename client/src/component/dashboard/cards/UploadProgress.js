import React from 'react';
import UploadCard from './UploadCard';
const UploadProgress = () => {
  return (
    <div className="fixed bottom-5 right-10 bg-white-200 rounded-md ">
      <div className="flex flex-col justify-center items-center pb-4">
        <div className="w-full border text-center p-2 bg-gray-300 text-gray-800 font-bold">
          Uploading Files ...
        </div>
        <div className="border border-t-0 pb-2">
          <UploadCard></UploadCard>
        </div>
        <div className="border border-t-0 pb-2">
          <UploadCard></UploadCard>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
