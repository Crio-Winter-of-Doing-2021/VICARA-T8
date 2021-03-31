import React, { useState } from 'react';
import SideNav from '../sidenav/SideNav';
import FileIcon, { ColorScheme, IconStyle } from 'react-fileicons';

const Home = () => {
  const [sortByName, setSortByName] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const obj = {};
  return (
    <div className="">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center w-full ">
          <div className="w-2/5 ">
            <button
              className="p-2 w-full h-full flex flex-row items-center hover:bg-gray-100 rounded-sm focus:outline-none"
              onClick={() => setSortByName((prev) => !prev)}
            >
              {' '}
              Name{' '}
              {sortByName ? (
                <i class="fas fa-caret-up pl-2 text-sm text-gray-700"></i>
              ) : (
                <i class="fas fa-caret-down pl-2 text-sm text-gray-700"></i>
              )}
            </button>
          </div>
          <div className="w-2/5 p-2">
            {' '}
            <button
              className="p-2 w-full h-full flex flex-row items-center hover:bg-gray-100 rounded-sm focus:outline-none"
              onClick={() => setSortByDate((prev) => !prev)}
            >
              {' '}
              Uploaded Date{' '}
              {sortByDate ? (
                <i class="fas fa-caret-up pl-2 text-sm text-gray-700"></i>
              ) : (
                <i class="fas fa-caret-down pl-2 text-sm text-gray-700"></i>
              )}
            </button>
          </div>
          <div className="w-1/5"></div>
        </div>

        <div className="flex flex-row items-center w-full  border ">
          <div className="w-2/5 ">
            <div className="w-full h-full flex flex-row items-center ">
              <div className=" pl-2 focus:outline-none">
                <FileIcon
                  extension="docx"
                  colorScheme={ColorScheme.blue}
                  iconStyle={IconStyle.gradient}
                  size={32}
                />
              </div>
              <span className="ml-2">Name</span>
            </div>
          </div>
          <div className="w-2/5">
            <div className="w-full h-full flex flex-row items-center ">
              <span className="ml-4">12 December 2002</span>
            </div>
          </div>
          <div className="w-1/5">
            <div className="w-full h-full flex flex-row items-center ">
              <button className="rounded-full h-10 w-10 bg-gray-50 hover:bg-gray-100 focus:outline-none hover:ring-gray-200 hover:ring-1 flex justify-center items-center">
                ...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
