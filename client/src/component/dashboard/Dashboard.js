import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Home from './sections/Home';
import SideNav from './sidenav/SideNav';
import UploadProgress from './cards/UploadProgress';
import componentConstant from '../../constants/componentConsants';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../../actions/authAction';

import Toast from './cards/Toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState(componentConstant.HOME);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileToggle, setmobileToggle] = useState(false);
  const updateDimensions = () => {
    const width = window.innerWidth;
    if (width < 1024) setIsMobile(true);
  };
  const profile = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [dispatch]);
  const menuStatus = useSelector((state) => state.menu);
  const logoutUser = () => {
    dispatch(logout());
  };

  return !profile.user ? null : (
    <div className="h-screen flex flex-col relative">
      {menuStatus.status && <Toast item={menuStatus}></Toast>}
      <Header
        setSearch={setSearch}
        profile={profile.user}
        setPage={setPage}
        logoutUser={logoutUser}
        isMobile={isMobile}
        setmobileToggle={setmobileToggle}
      ></Header>
      {isMobile && (
        <div
          className={` ${
            mobileToggle
              ? 'w-full flex flex-row absolute t-0 l-0 h-full z-10 transition duration-150 ease-in-out'
              : 'hidden  transition duration-150 ease-in-out'
          }`}
        >
          <div className={` w-4/6 h-full`}>
            <SideNav
              setComponent={setComponent}
              component={component}
              setPage={setPage}
            ></SideNav>
          </div>
          <div
            className="w-2/6 h-full "
            onClick={() => setmobileToggle(false)}
          ></div>
        </div>
      )}
      <div className={`h-full flex flex-row`}>
        {!isMobile && (
          <div className={` w-1/6 h-full `}>
            <SideNav
              setComponent={setComponent}
              component={component}
              setPage={setPage}
            ></SideNav>
          </div>
        )}
        <div className={`h-full ${isMobile ? 'w-full' : 'w-5/6'}`}>
          <Home
            component={component}
            search={search}
            page={page}
            setPage={setPage}
            isMobile={isMobile}
          ></Home>
        </div>
        <UploadProgress isMobile={isMobile}></UploadProgress>
      </div>
    </div>
  );
};

export default Dashboard;
