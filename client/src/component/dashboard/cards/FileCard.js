import React, { useState } from 'react';
import FileThumbnail from './FileThmbnail';
import dateFormat from 'dateformat';
import {
  addToFavourites,
  deleteFile,
  getPublicShareableLink,
  removeFromFavourites,
  downloadFile,
} from '../../../actions/fileAction';
import { useDispatch } from 'react-redux';
const FileCard = ({ file }) => {
  const [toggle, setToggle] = useState(false);
  const fileOptions = ['Share', 'Delete', 'Download'];
  const dispatch = useDispatch();
  const addToFav = (e, id) => {
    e.preventDefault();
    dispatch(addToFavourites(id));
  };

  const removeFromFav = (e, id) => {
    e.preventDefault();
    dispatch(removeFromFavourites(id));
  };

  const onClickMenu = (e, operation, file) => {
    e.preventDefault();
    switch (operation) {
      case fileOptions[0]:
        dispatch(getPublicShareableLink(file.metadata.fileId));
        break;
      case fileOptions[1]:
        dispatch(deleteFile(file.metadata.fileId));
        break;
      case fileOptions[2]:
        downloadFile(file);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full border-b p-1 hover:bg-gray-100 transition ease-linear ">
        <div className="w-2/5 ">
          <div className="w-full h-full flex flex-row items-center ">
            <div className="pl-2 flex flex-row items-center  focus:outline-none ">
              <FileThumbnail ext={file.metadata.mimetype.split('/')[0]} />
            </div>
            <span className="ml-2 truncate">{file.name}</span>
          </div>
        </div>
        <div className="w-2/5 ">
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
              <i className="fas fa-ellipsis-v w-10 h-10 rounded-full text-gray-600 flex justify-center items-center hover:text-gray-800 transition ease-linear "></i>
            </button>
            {toggle && (
              <div className="z-30 origin-top-right absolute left-16 top-0 mt-2 w-42 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 divide-y divide-gray-100"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {!file.isFavourite ? (
                    <button
                      onClick={(e) => addToFav(e, file.metadata.fileId)}
                      className=" focus:outline-none flex items-center w-full  px-4 p-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <span className="flex flex-col ">
                        <span>Add to Fav</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => removeFromFav(e, file.metadata.fileId)}
                      className=" flex items-center w-full  px-4 p-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 focus:outline-none"
                    >
                      <span className="flex flex-col ">
                        <span>Remove from Fav</span>
                      </span>
                    </button>
                  )}

                  {fileOptions.map((option) => (
                    <button
                      onClick={(e) => onClickMenu(e, option, file)}
                      className="flex items-center w-full  px-4 p-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 focus:outline-none"
                    >
                      <span className="flex flex-col ">
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
