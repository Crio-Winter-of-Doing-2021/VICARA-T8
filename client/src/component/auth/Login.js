import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className=" bg-blue-200  ">
      <div className=" mx-auto flex items-center relative ">
        <div className="hidden md:block lg:w-3/6 px-10 py-16">
          <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-5"></span>
          <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
            A little
            <span className="text-5xl sm:text-7xl"> sign here.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 dark:text-white">
            Don't have an account?
          </p>
          <div className="flex mt-2">
            <Link
              to="/register"
              className="uppercase py-2 px-4 rounded-lg bg-gray-900 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-700"
            >
              Create One
            </Link>
          </div>
        </div>
        <div className="py-16 w-full  lg:w-4/6 relative flex justify-center items-center bg-white">
          <div className="    flex justify-center items-center sm:max-w-md w-full">
            <div class="flex flex-col overflow-hidden  max md:flex-row md:flex-1 ">
              <div class="p-5 bg-white md:flex-1">
                <h3 class="my-4 text-2xl font-semibold text-gray-700 text-center">
                  Login
                </h3>
                <form action="#" class="flex flex-col space-y-5">
                  <div class="flex flex-col space-y-1">
                    <label
                      for="email"
                      class="text-sm font-semibold text-gray-500"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      autofocus
                      class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div class="flex flex-col space-y-1">
                    <div class="flex items-center justify-between">
                      <label
                        for="password"
                        class="text-sm font-semibold text-gray-500"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        class="text-sm text-blue-600 hover:underline focus:text-blue-800"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                    />
                    <label
                      for="remember"
                      class="text-sm font-semibold text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      Log in
                    </button>
                  </div>
                  <div class="flex flex-col space-y-5">
                    <span class="flex items-center justify-center space-x-2">
                      <span class="h-px bg-gray-400 w-14"></span>
                      <span class="font-normal text-gray-500">
                        or login with
                      </span>
                      <span class="h-px bg-gray-400 w-14"></span>
                    </span>
                    <div class="flex flex-col space-y-4">
                      <a
                        href="#"
                        class="flex items-center justify-center px-2 py-3 space-x-2 transition-colors duration-300 border bg-gray-800 rounded-md group hover:bg-red-600 focus:outline-none bg-opacity-90"
                      >
                        <span>
                          <svg
                            width="20"
                            height="20"
                            fill="#ffffff"
                            class="mr-2"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                          </svg>
                        </span>
                        <span class="text-sm font-medium text-white group-hover:text-white">
                          Google
                        </span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
