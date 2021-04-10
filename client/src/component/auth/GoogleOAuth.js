import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { googleOAuth } from '../../actions/authAction';

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(googleOAuth(result, token));
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = async (err) => {
    console.log(err);
  };

  return (
    <div className="flex flex-col space-y-4">
      <GoogleLogin
        clientId="1086132226878-7lmuo2095ogm6ede5t732fr6mrstclbk.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="flex items-center justify-center px-2 py-3 space-x-2 transition-colors duration-300 border bg-gray-800 rounded-md group hover:bg-red-600 focus:outline-none bg-opacity-90"
          >
            <span>
              <svg
                width="20"
                height="20"
                fill="#ffffff"
                className="mr-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
              </svg>
            </span>
            <span className="text-sm font-medium text-white group-hover:text-white">
              Google
            </span>
          </button>
        )}
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleOAuth;
