import React from 'react';
import { Redirect, Route } from 'react-router';
import Header from '../component/header/Header';
const AuthRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Redirect to="/drive" />
        ) : (
          <div>
            <Header></Header>
            <Component {...props} />
          </div>
        )
      }
    />
  );
};

export default AuthRoute;
