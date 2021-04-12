import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/favicon.ico';

const Header = ({ isAuth }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <div>
      <header className="h-20 sm:h-20 flex items-center z-30 w-full bg-blue-200  ">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Img" className="p-2"></img>
            </Link>
            <div className="uppercase text-gray-800 dark:text-white font-black text-2xl md:text-3xl">
              <Link to="/">Storage Drive</Link>
            </div>
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden ">
              {isAuth ? (
                <Link to="/drive">
                  <div className=" border-2 border-white transition ease-linear rounded-md hover:bg-white p-2">
                    Go to Drive
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="py-2 px-6 flex">
                  Log In
                </Link>
              )}
              <a
                href="https://github.com/Crio-Winter-of-Doing-2021/VICARA-T8/wiki/Installation-Instructions"
                className="py-2 px-6 flex"
              >
                Docs
              </a>
            </nav>
            <button
              onClick={handleToggle}
              className=" w-6 h-3 flex items-center lg:hidden focus:outline-none"
            >
              {!navbarOpen ? (
                <div className="lg:hidden flex flex-col ">
                  {' '}
                  <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1 "></span>
                  <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1  "></span>
                  <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1 "></span>
                </div>
              ) : (
                <div className="lg:hidden relative">
                  <span className="w-6 h-1 bg-gray-800 dark:bg-white origin-center transform rotate-45 position absolute transition ease-linear "></span>
                  <span className="w-6 h-1 bg-gray-800 dark:bg-white origin-center transform -rotate-45 position absolute transition ease-linear "></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>
      {navbarOpen && (
        <div className="flex flex-col bg-blue-200 ">
          {' '}
          <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center ">
            {isAuth ? (
              <Link to="/drive">
                <div className="w-2/6 px-5">
                  <span className=" flex border-2 border-white transition ease-linear rounded-md hover:bg-white p-2">
                    Go to Drive
                  </span>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="py-2 px-6 flex">
                Log In
              </Link>
            )}
            <Link to="/docs" className="py-2 px-6 flex">
              Documentation
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
