import React from 'react';
import StorageCard from '../cards/StorageCard';
import { setUploadFile } from '../../../actions/uploadFileAction';
import { useDispatch } from 'react-redux';

const SideNav = ({ component, setComponent, profile, setPage }) => {
  const objects = ['Home', 'Favourites'];
  const dispatch = useDispatch();
  const handleAttachFile = (e) => {
    e.preventDefault();
    dispatch(setUploadFile(e.target.files));
    e.target.value = '';
  };

  const onHandleClick = (e, value) => {
    e.preventDefault();
    setPage(1);
    setComponent(value);
  };

  return (
    <div className="h-full rounded-sm ">
      <div className="h-full flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-white">
        <div className=" flex flex-colleft-0 bg-wite h-full border-r">
          <div className="overflow-y-d overflow-x-hidden flex-grow">
            <ul className="flex flex-col  space-y-1">
              <li className="p-1 ">
                <input
                  type="file"
                  id="actual-btn"
                  multiple
                  onChange={handleAttachFile}
                  hidden
                />
                <label
                  htmlFor="actual-btn"
                  className="flex justify-center items-center  bg-gray-200 hover:bg-blue-200 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold  focus:ring-2 focus:ring-offset-2  rounded-sm  relative  flex-row  h-11 focus:outline-none    pr-6 cursor-pointer"
                >
                  {' '}
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-upload text-gray-800 hover:text-white"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Upload
                  </span>
                </label>
                {/* <button className="flex justify-center items-center  bg-gray-200 hover:bg-blue-200 focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold  focus:ring-2 focus:ring-offset-2  rounded-sm  relative  flex-row  h-11 focus:outline-none    pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-upload text-gray-800 hover:text-white"></i>
                  </span>

                  <span className="ml-2 text-sm tracking-wide truncate">
                    Upload
                  </span>
                </button> */}
              </li>
              <li>
                <span className="relative flex flex-row border-b"></span>
              </li>
              {objects.map((value) => (
                <li key={value}>
                  <button
                    onClick={(e) => onHandleClick(e, value)}
                    className={`w-full transition ease-linear  relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ${
                      component === value ? 'bg-gray-100 border-blue-500' : ''
                    }`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <i
                        className={`fas ${
                          value === 'Home' ? 'fa-home' : 'fa-star'
                        }`}
                      ></i>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      {value}
                    </span>
                  </button>
                </li>
              ))}

              <li>
                <span className="relative flex flex-row border-b"></span>
              </li>
              <li className="">
                <div className="relative flex flex-row items-center h-11  text-gray-600 hover:text-gray-800  pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <i className="fas fa-database"></i>
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Storage
                  </span>
                </div>
                <StorageCard profile={profile}></StorageCard>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
