import React, { useState } from 'react';
import SideNav from '../sidenav/SideNav';

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
          <div className="w-3/5 p-2">
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
        </div>
        <div className="w-full">
          <span className="relative flex flex-row  h-0.5 bg-gray-200"></span>
        </div>
      </div>
    </div>
  );
};

export default Home;
