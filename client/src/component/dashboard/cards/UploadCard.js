import React from 'react';

const UploadCard = (props) => {
  // const file = props.file?.file?.name;
  // const progress = props.file?.progress;
  const { file, progress } = props.file;
  return (
    <div>
      <div className="w-72 rounded-md px-2 bg-white dark:bg-gray-800 relative overflow-hidden pb-2">
        <div className="w-full h-full block px-2">
          <div className="w-full flex-row flex items-center">
            <div className="w-full flex  items-center my-2 ">
              <p className="w-full flex flex-row justify-between items-center">
                <span className="text-gray-800 text-sm text-left dark:text-white truncate pr-4">
                  {file?.name}
                </span>
                <span className="text-gray-800 text-sm text-left dark:text-white font-bold ">
                  {' '}
                  {progress}%
                </span>
              </p>
            </div>
          </div>

          <div className="w-full h-1 bg-green-200 rounded-full">
            <div
              className=" h-full text-center text-xs text-white bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
