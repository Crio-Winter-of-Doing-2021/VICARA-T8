import React, { useEffect, useState } from 'react';
import SideNav from '../sidenav/SideNav';
import FileIcon, { ColorScheme, IconStyle } from 'react-fileicons';
import { useDispatch, useSelector } from 'react-redux';
import { loadFiles } from '../../../actions/fileAction';
import dateFormat from 'dateformat';
import componentConstant from '../../../constants/componentConsants';

const Home = ({ component, search }) => {
  const [sortByName, setSortByName] = useState(true);
  const [page, setPage] = useState(1);
  //const [sortByDate, setSortByDate] = useState(true);
  const pagination = useSelector((state) => state.files);
  //const { length, data } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  useEffect(() => {
    let options = { sortByName: 'desc', page: page, limit: 1 };
    if (component === componentConstant.FAVOURITES) options.fav = true;

    if (sortByName) {
      options.sortByName = 'asc';
    }

    if (search.length > 0) {
      options.s = search;
      delete options.sortByName;
    }

    dispatch(loadFiles(options));
  }, [component, search, sortByName, page]);

  const onClickPreviousPage = (e) => {
    e.preventDefault();
    if (pagination.hasPrevious) setPage(pagination.previousPage);
  };
  const onClickNextPage = (e) => {
    e.preventDefault();
    console.log('hagsjdh');
    if (pagination.hasNext) setPage(pagination.nextPage);
  };
  return (
    <div className="">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center w-full ">
          <div className="w-2/5 p-2">
            <button
              className="p-2 w-full h-full flex flex-row items-center hover:bg-gray-100 rounded-sm focus:outline-none"
              onClick={() => setSortByName((prev) => !prev)}
            >
              {' '}
              Name{' '}
              {sortByName ? (
                <i class="fas fa-caret-up pl-2 text-sm text-gray-700"></i>
              ) : (
                <i class="fas fa-caret-down pl-2 text-sm text-gray-700"></i>
              )}
            </button>
          </div>
          <div className="w-2/5 p-2">
            {' '}
            <button className="p-2 w-full h-full flex flex-row items-center hover:bg-gray-100 rounded-sm focus:outline-none">
              {' '}
              Uploaded Date{' '}
              {/* {sortByDate ? (
                <i class="fas fa-caret-up pl-2 text-sm text-gray-700"></i>
              ) : (
                <i class="fas fa-caret-down pl-2 text-sm text-gray-700"></i>
              )} */}
            </button>
          </div>
          <div className="w-1/5 p-2 flex flex-row">
            <button
              disabled={!pagination.hasPrevious}
              onClick={(e) => onClickPreviousPage(e)}
              className="focus:outline-none mr-2"
            >
              <i class="fas fa-chevron-left  w-10 h-10 rounded-full bg-gray-200  flex justify-center items-center hover:bg-blue-200 transition ease-linear hover:text-white"></i>
            </button>
            <button
              disabled={!pagination.hasNext}
              onClick={(e) => onClickNextPage(e)}
              className="focus:outline-none ml-2"
            >
              <i class="fas fa-chevron-right  w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center hover:bg-blue-200 transition ease-linear hover:text-white"></i>
            </button>
          </div>
        </div>
        {pagination.length > 0
          ? pagination.data.map((file) => (
              <div className="flex flex-row items-center w-full  border ">
                <div className="w-2/5 ">
                  <div className="w-full h-full flex flex-row items-center ">
                    <div className=" pl-2 focus:outline-none">
                      <FileIcon
                        extension={file.metadata.mimetype}
                        colorScheme={ColorScheme.blue}
                        iconStyle={IconStyle.gradient}
                        size={32}
                      />
                    </div>
                    <span className="ml-2 truncate">{file.name}</span>
                  </div>
                </div>
                <div className="w-2/5">
                  <div className="w-full h-full flex flex-row items-center ">
                    <span className="ml-4">
                      {dateFormat(file.createdAt, 'mediumDate')}
                    </span>
                  </div>
                </div>
                <div className="w-1/5">
                  <div className="w-full h-full flex flex-row items-center ">
                    <button className="rounded-full h-10 w-10 bg-gray-50 hover:bg-gray-100 focus:outline-none hover:ring-gray-200 hover:ring-1 flex justify-center items-center">
                      ...
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
