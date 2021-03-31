import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/authAction';
import authConstants from '../../constants/authConstants';
import GoogleOAuth from './GoogleOAuth';
import Loader from '../styles/Loader';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { isLoading, isError, error } = useSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.email && user.password) {
      dispatch(login(user));
    }

    setTimeout(() => {
      setSubmitted(false);
      dispatch({ type: authConstants.AUTH_CLEAR_ERRORS });
    }, 3000);
  }

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
        <div className="md:py-16 py-2 w-full lg:w-4/6 relative flex justify-center items-center bg-white border">
          <div className="    flex justify-center items-center sm:max-w-md w-full">
            <div className="flex flex-col overflow-hidden  max md:flex-row md:flex-1 w-full">
              <div className="p-5 bg-white md:flex-1">
                <h3 className="my-4 text-2xl font-semibold text-gray-700 text-center">
                  Login
                </h3>
                <form action="#" className="flex flex-col space-y-5">
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    {submitted && !user.email && (
                      <div className="text-red-500">Email is required</div>
                    )}
                    {submitted && isError && error.message && (
                      <div className="text-red-500"> {error.message}</div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Password
                      </label>
                      {/* <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                      >
                        Forgot Password?
                      </a> */}
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    {submitted && !user.password && (
                      <div className="text-red-500">Password is required</div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      onClick={handleSubmit}
                      className="flex justify-center items-center w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      {isLoading && <Loader></Loader>}
                      Log in
                    </button>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <span className="flex items-center justify-center space-x-2">
                      <span className="h-px bg-gray-400 w-14"></span>
                      <span className="font-normal text-gray-500">
                        or login with
                      </span>
                      <span className="h-px bg-gray-400 w-14"></span>
                    </span>
                    <div>
                      <GoogleOAuth></GoogleOAuth>
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
