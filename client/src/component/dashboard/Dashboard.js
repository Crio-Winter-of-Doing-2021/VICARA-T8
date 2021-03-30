import React from 'react';
import Header from './header/Header';
import Home from './sections/Home';
import SideNav from './sidenav/SideNav';
import UploadProgress from './cards/UploadProgress';

const Dashboard = () => {
  return (
    <div>
      <Header></Header>
      <div className="flex flex-row ">
        <div className="w-1/6 ">
          <SideNav></SideNav>
        </div>
        <div className="w-5/6">
          <Home></Home>
          <UploadProgress></UploadProgress>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
