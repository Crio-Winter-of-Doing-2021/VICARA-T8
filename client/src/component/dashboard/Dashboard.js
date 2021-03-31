import React, { useState } from 'react';
import Header from './header/Header';
import Home from './sections/Home';
import SideNav from './sidenav/SideNav';
import UploadProgress from './cards/UploadProgress';
import componentConstant from '../../constants/componentConsants';

const Dashboard = () => {
  const [component, setComponent] = useState(componentConstant.HOME);
  const [search, setsearch] = useState('');
  return (
    <div className="h-screen flex flex-col">
      <Header></Header>
      <div className="flex flex-row h-full ">
        <div className="w-1/6 h-full">
          <SideNav setComponent={setComponent} component={component}></SideNav>
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
