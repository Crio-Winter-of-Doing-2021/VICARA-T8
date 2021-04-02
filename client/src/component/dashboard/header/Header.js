import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/favicon.ico';

const Header = ({
  setSearch,
  profile,
  setPage,
  logoutUser,
  isMobile,
  setmobileToggle,
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <header className=" h-12 lg:h-16 flex items-center z-30 w-full bg-blue-200  ">
        <div className=" container mx-auto px-3 lg:px-6 flex items-center justify-between">
          <div className="flex items-center w-3/12 ">
            {isMobile && (
              <i
                onClick={() => setmobileToggle((prev) => !prev)}
                className="fas fa-bars text-gray-800 "
              ></i>
            )}
            {!isMobile && (
              <Link to="/drive">
                <img src={logo} alt="Img" className=" h-12"></img>
              </Link>
            )}
            <div className="pl-2 uppercase text-gray-800 dark:text-white font-black text-1xl lg:text-3xl">
              <Link to="/drive">Drive</Link>
            </div>
          </div>
          <div className="flex items-center w-7/12 ">
            <div className="relative mx-auto text-gray-600 w-full">
              <input
                className="border-2 border-blue-200 bg-gray-50 h-8 lg:h-10 px-5 w-full rounded-md text-md focus:bg-white focus:outline-none placeholder-gray-400"
                type="text"
                name="search"
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute lg:right-0 lg:top-0 mt-2 mr-3 right-0 bottom-1"
              >
                <i className="fa fa-search text-gray-400 "></i>
              </button>
            </div>
          </div>
          <div className="flex items-center flex-row-reverse w-2/12 ">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={() => setToggle((prev) => !prev)}
                  className="rounded-full border border-gray-300 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center w-full p-1 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200 focus:ring-blue-200"
                  id="options-menu"
                >
                  <img
                    src="https://i.ibb.co/r6bzz1Z/batman-by-funky23-d6q1yq3-fullview.jpg"
                    alt="https://i.ibb.co/r6bzz1Z/batman-by-funky23-d6q1yq3-fullview.jpg"
                    className="rounded-full w-7 lg:w-10 p-0"
                  />
                </button>
              </div>
              {toggle && (
                <div className=" absolute right-0 mt-2 w-24 lg:w-25 z-10 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 divide-y divide-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    onFocus={() => setToggle(true)}
                    onBlur={() => setToggle(false)}
                  >
                    <div
                      className="flex items-center cursor-pointer  px-2 py-1 text-sm lg:text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      role="menuitem"
                    >
                      <span className="flex flex-row items-center truncate">
                        <i className="fas fa-user mr-1 text-sm "></i>
                        <span className="">{profile.name}</span>
                      </span>
                    </div>

                    <div
                      className="flex items-center cursor-pointer  px-2 py-1 text-sm lg:text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                      role="menuitem"
                      onClick={logoutUser}
                    >
                      <span className="flex flex-row items-center w-full truncate ">
                        <i className="fas fa-sign-out-alt mr-1 text-sm"></i>
                        <span className="truncate">Logout</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-1 bg-gray-50 w-full"></div>
    </div>
  );
};

export default Header;
