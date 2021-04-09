import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../component/header/Header';

const PublicRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <div className="h-screen">
      <Header isAuth={isAuth}></Header>
      <Route {...rest} component={Component}></Route>
    </div>
  );
};

export default PublicRoute;
