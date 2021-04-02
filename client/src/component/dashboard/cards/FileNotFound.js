import React from 'react';

const FileNotFound = () => {
  return (
    <div className=" w-full ">
      <div className="m-2 h-72 border-4 border-dashed border-gray-500 flex flex-row justify-center items-center">
        {' '}
        <div className=" text-bold  text-gray-800 dark:text-white font-black text-xl lg:text-2xl">
          No Files Found.
        </div>
      </div>
    </div>
  );
};

export default FileNotFound;
