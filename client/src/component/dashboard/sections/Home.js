import React from 'react';
import SideNav from '../sidenav/SideNav';

const Home = () => {
  return (
    <div className="flex flex-row bg-gray-800">
      <div className="w-1/6">
        <SideNav></SideNav>
      </div>
      <div className="w-5/6"></div>
    </div>
  );
};

export default Home;
