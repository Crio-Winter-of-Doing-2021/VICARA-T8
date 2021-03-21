import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/favicon.ico';

const Header = () => {
  return (
    <div>
      <header class="h-20 sm:h-20 flex items-center z-30 w-full bg-blue-200 ">
        <div class="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} className="p-2"></img>
            </Link>
            <div class="uppercase text-gray-800 dark:text-white font-black text-2xl md:text-3xl">
              <Link to="/">Storage Drive</Link>
            </div>
          </div>
          <div class="flex items-center">
            <nav class="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden ">
              <Link to="/login" class="py-2 px-6 flex">
                Log In
              </Link>
              <Link to="/docs" class="py-2 px-6 flex">
                Documentation
              </Link>
            </nav>
            <button class="lg:hidden flex flex-col ml-4">
              <span class="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span class="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span class="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
