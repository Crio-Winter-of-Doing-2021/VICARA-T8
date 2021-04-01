import React, { useState } from 'react';
import FileIcon, { ColorScheme, IconStyle } from 'react-fileicons';
import dateFormat from 'dateformat';
const FileCard = ({ file }) => {
  const [toggle, setToggle] = useState(false);
  const fileOptions = ['Share', 'Delete'];
  const addToFav = (e) => {
    e.preventDefault();
  };

  const removeFromFav = (e) => {
    e.preventDefault();
  };

  const onClickMenu = (e, operation) => {
    e.preventDefault();
    switch (operation) {
      case fileOptions[0]:

      case fileOptions[1]:
    }
  };
  return (
    <div>
      <div className="flex flex-row items-center w-full  border ">
        <div className="w-2/5 ">
          <div className="w-full h-full flex flex-row items-center ">
            <div className=" pl-2 focus:outline-none">
              <FileIcon
                extension={file.metadata.mimetype}
                colorScheme={ColorScheme.blue}
                iconStyle={IconStyle.gradient}
                size={32}
              />
            </div>
            <span className="ml-2 truncate">{file.name}</span>
          </div>
        </div>
        <div className="w-2/5">
          <div className="w-full h-full flex flex-row items-center ">
            <span className="ml-4">
              {dateFormat(file.createdAt, 'mediumDate')}
            </span>
          </div>
        </div>
        <div className="w-1/5 ">
          <div className="w-full h-full flex flex-row-reverse items-center relative ">
            <button
              className="focus:outline-none mr-36 "
              onClick={() => setToggle((prev) => !prev)}
            >
              <i class="fas fa-ellipsis-v w-10 h-10 rounded-full text-gray-600 flex justify-center items-center hover:text-gray-800 transition ease-linear "></i>
            </button>
            {toggle && (
              <div class="origin-top-right absolute left-16 top-0 mt-2 w-42 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div
                  class="py-1 divide-y divide-gray-100"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {!file.isFavourite ? (
                    <button
                      onClick={addToFav}
                      class="flex items-center w-full  px-4 p-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <span class="flex flex-col ">
                        <span>Add to Fav</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={removeFromFav}
                      class="flex items-center w-full  px-4 p-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <span class="flex flex-col ">
                        <span>Remove from Fav</span>
                      </span>
                    </button>
                  )}

                  {fileOptions.map((option) => (
                    <button
                      onClick={(e) => onClickMenu(e, option)}
                      class="flex items-center w-full  px-4 p-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <span class="flex flex-col ">
                        <span>{option}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
