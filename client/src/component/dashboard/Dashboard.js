import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Home from './sections/Home';
import SideNav from './sidenav/SideNav';
import UploadProgress from './cards/UploadProgress';
import componentConstant from '../../constants/componentConsants';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../actions/authAction';

const Dashboard = () => {
  const [component, setComponent] = useState(componentConstant.HOME);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const profile = useSelector((state) => state.auth);
  return (
    <div className="h-screen flex flex-col">
      <Header setSearch={setSearch} profile={profile.user}></Header>
      <div className="flex flex-row h-full ">
        <div className="w-1/6 h-full">
          <SideNav
            setComponent={setComponent}
            component={component}
            profile={profile.user}
          ></SideNav>
        </div>
        <div className="w-5/6">
          <Home component={component} search={search}></Home>
          <UploadProgress></UploadProgress>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
