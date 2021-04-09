import React, { useEffect, useState } from 'react';
import FileCard from '../cards/FileCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadFiles } from '../../../actions/fileAction';

import componentConstant from '../../../constants/componentConsants';
import FileCardLoader from '../cards/FileCardLoader';
import FileNotFound from '../cards/FileNotFound';

const Home = ({ component, search, page, setPage, isMobile }) => {
  const [sortByName, setSortByName] = useState(true);

  //const [sortByDate, setSortByDate] = useState(true);
  const pagination = useSelector((state) => state.files);

  //const { length, data } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  useEffect(() => {
    let options = { sortByName: 'desc', page: page, limit: 10 };
    if (isMobile) options.limit = 10;
    if (component === componentConstant.FAVOURITES) options.fav = true;

    if (sortByName) {
      options.sortByName = 'asc';
    }
    if (component === componentConstant.RECENT) {
      options = { sortByDate: 'desc' };
    }
    if (search.length > 0) {
      options.s = search;
      delete options.sortByName;
    }

    dispatch(loadFiles(options));
  }, [component, search, sortByName, page, dispatch, isMobile]);

  const onClickPreviousPage = (e) => {
    e.preventDefault();
    if (pagination.hasPrevious) setPage(pagination.previousPage);
  };
  const onClickNextPage = (e) => {
    e.preventDefault();
    //console.log('hagsjdh');
    if (pagination.hasNext) setPage(pagination.nextPage);
  };

  return (
    <div className=" w-full ">
      <div className="flex flex-col w-full ">
        <div className="flex flex-row items-center w-full border-b">
          <div className="w-5/12 pl-1 lg:pl-2 lg:p-2  hover:bg-gray-100 rounded-sm ">
            <button
              className="p-2 w-full h-full flex flex-row items-center lg:text-sm text-md focus:outline-none "
              onClick={() => setSortByName((prev) => !prev)}
            >
              {' '}
              Name{' '}
              {sortByName ? (
                <i className="fas fa-caret-up pl-2 text-sm text-gray-700"></i>
              ) : (
                <i className="fas fa-caret-down pl-2 text-sm text-gray-700"></i>
              )}
            </button>
          </div>
          <div className="w-4/12  lg:pt-2 lg:pb-2 hover:bg-gray-100 rounded-sm">
            {' '}
            <button className="p-2 w-full h-full flex flex-row items-center truncate lg:text-md text-sm  focus:outline-none">
              {' '}
              Uploaded Date{' '}
              {/* {sortByDate ? (
                <i className="fas fa-caret-up pl-2 text-sm text-gray-700"></i>
              ) : (
                <i className="fas fa-caret-down pl-2 text-sm text-gray-700"></i>
              )} */}
            </button>
          </div>
          <div className="w-3/12  flex flex-row ">
            <button
              disabled={!pagination.hasPrevious}
              onClick={(e) => onClickPreviousPage(e)}
              className={` focus:outline-none mr-1 ${
                pagination.hasPrevious ? '' : 'cursor-default'
              }`}
            >
              <i
                className={`text-xs lg:text-md ${
                  pagination.hasPrevious
                    ? 'hover:bg-blue-200 hover:text-white bg-gray-200 '
                    : 'bg-gray-50'
                } fas fa-chevron-left w-8 h-8  lg:w-10 lg:h-10 rounded-full  flex justify-center items-center  transition ease-linear `}
              ></i>
            </button>
            <button
              disabled={!pagination.hasNext}
              onClick={(e) => onClickNextPage(e)}
              className={`focus:outline-none  ${
                pagination.hasNext ? '' : 'cursor-default '
              }`}
            >
              <i
                className={` text-xs lg:text-md ${
                  pagination.hasNext
                    ? 'hover:bg-blue-200 hover:text-white bg-gray-200 '
                    : 'bg-gray-50'
                } fas fa-chevron-right  w-8 h-8  lg:w-10 lg:h-10 rounded-full flex justify-center items-center  transition ease-linear `}
              ></i>
            </button>
          </div>
        </div>
        {pagination.isLoading ? (
          Array(isMobile ? 5 : 10)
            .fill('')
            .map((e, i) => <FileCardLoader key={i}></FileCardLoader>)
        ) : pagination.length > 0 ? (
          pagination.data.map((file) => (
            <FileCard key={file.metadata.fileId} file={file}></FileCard>
          ))
        ) : (
          <FileNotFound />
        )}
      </div>
    </div>
  );
};

export default Home;
