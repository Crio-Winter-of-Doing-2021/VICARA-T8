import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Home from './sections/Home';
import SideNav from './sidenav/SideNav';
import UploadProgress from './cards/UploadProgress';
import componentConstant from '../../constants/componentConsants';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../actions/authAction';
import Toast from './cards/Toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [component, setComponent] = useState(componentConstant.HOME);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const profile = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const menuStatus = useSelector((state) => state.menu);

  return !profile.user ? null : (
    <div className="h-screen flex flex-col">
      {menuStatus.status && <Toast item={menuStatus}></Toast>}
      <Header
        setSearch={setSearch}
        profile={profile.user}
        setPage={setPage}
      ></Header>

      <div className="flex flex-row h-full ">
        <div className="w-1/6 h-full">
          <SideNav
            setComponent={setComponent}
            component={component}
            setPage={setPage}
          ></SideNav>
        </div>
        <div className="w-5/6">
          <Home
            component={component}
            search={search}
            page={page}
            setPage={setPage}
          ></Home>
          <UploadProgress></UploadProgress>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
