import React from 'react';
import logo from '../../assets/favicon.ico';

const Header = () => {
  return (
    <div>
      <header class="h-20 sm:h-20 flex items-center z-30 w-full bg-blue-200 shadow-sm rounded-b-lg">
        <div class="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#">
              <img src={logo} className="p-2"></img>
            </a>
            <div class="uppercase text-gray-800 dark:text-white font-black text-2xl md:text-3xl">
              <a href="#">Storage Drive</a>
            </div>
          </div>
          <div class="flex items-center">
            <nav class="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden ">
              <a href="#" class="py-2 px-6 flex">
                Log In
              </a>
              <a href="#" class="py-2 px-6 flex">
                Documentation
              </a>
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
