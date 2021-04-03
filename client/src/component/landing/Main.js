import React from 'react';
import logo from '../../assets/logo512.png';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="flex flex-col ">
      <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden ">
        <div className="container mx-auto px-6 flex relative py-12">
          <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
              Want to own
              <span className="text-5xl sm:text-7xl"> the Storage ?</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
              A Storage Drive which you own. This Application provides
              integrating different cloud storage options like AWS Storage,
              Google Storage in market out there and perform all types of
              operations like store, delete and view.
            </p>
            <div className="flex mt-8">
              <Link
                to="/register"
                className="uppercase py-2 px-4 rounded-lg bg-gray-900 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-700  transition ease-linear"
              >
                Get started
              </Link>
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/3 lg:w-2/5 relative ">
            <div className="flex content-center h-full">
              <img
                src={logo}
                className="w-70 md:max-w-xs m-auto mt-auto"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
