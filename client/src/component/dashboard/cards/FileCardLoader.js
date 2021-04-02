import React from 'react';

const FileCardLoader = (props) => {
  return (
    <div>
      <div className="wrapper w-full flex flex-row items-center justify-items-center p-2">
        <div className="w-10 h-9 rounded-sm animate "></div>
        <div className="ml-2 rounded-sm w-full h-5 animate "></div>
      </div>
      <span className="relative flex flex-row border-b"></span>
    </div>
  );
};

export default FileCardLoader;
