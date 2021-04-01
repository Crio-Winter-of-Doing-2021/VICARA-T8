import React, { useState } from 'react';
import fileConstants from '../../../constants/fileConstants';

const Toast = ({ item }) => {
  //const [text, setText] = useState('');
  let message = '';
  let type = 'INTIAL';
  if (
    item.type === fileConstants.ADD_TO_FAV_SUCCESS ||
    item.type === fileConstants.REMOVE_FROM_FAV_SUCCESS ||
    item.type === fileConstants.DELETE_SUCCESS
  ) {
    message = item.message;
    type = 'SUCCESS';
  } else if (item.type === fileConstants.PUBLIC_SHAREABLE_LINK_SUCCESS) {
    message = item.data.data.url;
    type = 'INFO';
  }
  const TYPE = {
    SUCCESS: (
      <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-green-500">
          <svg
            class="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <span class="font-semibold text-green-500 dark:text-green-400">
              Success
            </span>
            <p class="text-sm text-gray-600 dark:text-gray-200">{message}</p>
          </div>
        </div>
      </div>
    ),
    FAILURE: (
      <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-red-500">
          <svg
            class="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <span class="font-semibold text-red-500 dark:text-red-400">
              Error
            </span>
            <p class="text-sm text-gray-600 dark:text-gray-200">
              Your email is already used!
            </p>
          </div>
        </div>
      </div>
    ),
    INFO: (
      <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <span class="font-semibold text-blue-500 dark:text-blue-400">
              Shareable Public URL
            </span>
            <p class="text-md text-gray-800 dark:text-gray-200">
              <input
                type="text"
                className="border rounded-sm focus:border-gray-500 focus:outline-none bg-gray-50 px-1"
                value={message}
                readOnly
              ></input>
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center w-12 bg-blue-500">
          <i
            class="text-2xl fas fa-clipboard text-white fill-current cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(message);
            }}
          ></i>
        </div>
      </div>
    ),
    INTIAL: null,
  };
  return (
    <div className="z-10 relative flex justify-center items-center border">
      <div className="fixed bottom-20">{TYPE[type]}</div>
    </div>
  );
};

export default Toast;
