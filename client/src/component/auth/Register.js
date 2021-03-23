import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/authAction';
import authConstants from '../../constants/authConstants';
import errorConstants from '../../constants/errorConstants';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.name && user.email && user.password) {
      dispatch(register(user));
    }

    setTimeout(() => {
      setSubmitted(false);
      dispatch({ type: errorConstants.CLEAR_ERRORS });
    }, 3000);
  }

  return (
    <div className=" bg-blue-200">
      <div className=" mx-auto flex items-center relative">
        <div className="hidden md:block lg:w-3/6 px-10 py-16">
          <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-5"></span>
          <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
            Let's Get
            <span className="text-5xl sm:text-7xl"> Started.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 dark:text-white">
            Already have an account?
          </p>
          <div className="flex mt-2">
            <Link
              to="/login"
              className="uppercase py-2 px-4 rounded-lg bg-gray-900 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-700"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="py-16 w-full  lg:w-4/6 relative flex justify-center items-center bg-white">
          <div className="    flex justify-center items-center sm:max-w-md  w-full">
            <div class="flex flex-col overflow-hidden  max md:flex-row md:flex-1 ">
              <div class="p-5 bg-white md:flex-1">
                <h3 class="my-4 text-2xl font-semibold text-gray-700 text-center">
                  Register
                </h3>
                <form onSubmit={handleSubmit} class="flex flex-col space-y-5">
                  <div class="flex flex-col space-y-1">
                    <label
                      htmlFor="name"
                      class="text-sm font-semibold text-gray-500"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      autofocus
                      autoComplete="off"
                      class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    {submitted && !user.name && (
                      <div className="text-red-500"> Name is required</div>
                    )}
                    {submitted &&
                      error.id === authConstants.REGISTER_FAILURE &&
                      error.message.name && (
                        <div className="text-red-500">
                          {' '}
                          {error.message.name}
                        </div>
                      )}
                  </div>
                  <div class="flex flex-col space-y-1">
                    <label
                      htmlFor="email"
                      class="text-sm font-semibold text-gray-500"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      autofocus
                      class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    {submitted && !user.email && (
                      <div className="text-red-500">Email is required</div>
                    )}
                    {submitted &&
                      error.id === authConstants.REGISTER_FAILURE &&
                      error.message.email && (
                        <div className="text-red-500">
                          {' '}
                          {error.message.email}
                        </div>
                      )}
                    {submitted &&
                      error.id === authConstants.REGISTER_FAILURE &&
                      error.status === 403 &&
                      error.message && (
                        <div className="text-red-500"> {error.message}</div>
                      )}
                  </div>
                  <div class="flex flex-col space-y-1">
                    <div class="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        class="text-sm font-semibold text-gray-500"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    {submitted && !user.password && (
                      <div className="text-red-500">Password is required</div>
                    )}
                    {submitted &&
                      error.id == 'REGISTER_FAILURE' &&
                      error.message.password && (
                        <div className="text-red-500">
                          {' '}
                          {error.message.password}
                        </div>
                      )}
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                    />
                    <label
                      htmlFor="remember"
                      class="text-sm font-semibold text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      class="flex justify-center items-center w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      {isLoading && (
                        <div class="loader mr-3" title="0">
                          <svg
                            version="1.1"
                            id="loader-1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 40 40"
                            enable-background="new 0 0 40 40"
                            xmlSpace="preserve"
                          >
                            <path
                              opacity="0.2"
                              fill="#fff"
                              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                            />
                            <path
                              fill="#fff"
                              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
                            >
                              <animateTransform
                                attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 20 20"
                                to="360 20 20"
                                dur="0.5s"
                                repeatCount="indefinite"
                              />
                            </path>
                          </svg>
                        </div>
                      )}
                      <span>Register</span>
                    </button>
                  </div>
                  <div class="flex flex-col space-y-5">
                    <span class="flex items-center justify-center space-x-2">
                      <span class="h-px bg-gray-400 w-14"></span>
                      <span class="font-normal text-gray-500">
                        or Register with
                      </span>
                      <span class="h-px bg-gray-400 w-14"></span>
                    </span>
                    <div class="flex flex-col space-y-4 ">
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

export default Register;
