import React from 'react';

const StorageCard = ({ profile }) => {
  // const size = (profile.storage?.size / 1073741824).toFixed(2);
  // const limit = (profile.storage?.limit / 1073741824).toFixed(2);
  const size = 1;
  const limit = 1;
  const progress = (size * 100) / limit;
  return (
    <div>
      <div class=" rounded-md w-full px-2 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div class="w-full h-full block">
          <div class="w-full flex-row flex items-center">
            <div className="w-full flex justify-center items-center my-2">
              <p className="">
                <span className="text-gray-800 text-md text-left dark:text-white  ">
                  {size} GB{' Used '}
                </span>
                <span className="text-gray-800 text-xl text-left dark:text-white font-bold ">
                  {' of '}
                  {limit} GB
                </span>
              </p>
            </div>
          </div>

          <div class="w-full h-1 bg-blue-200 rounded-full">
            <div
              class=" h-full text-center text-xs text-white bg-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageCard;
