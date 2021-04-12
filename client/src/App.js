import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './component/landing/Main';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Documentation from './component/documentation/Documentation';
import { useSelector } from 'react-redux';
import Dashboard from './component/dashboard/Dashboard';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthRoute from './routes/AuthRoute';
const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute
            component={Main}
            isAuth={isAuth}
            path="/"
            exact
          ></PublicRoute>
          <AuthRoute
            component={Login}
            isAuth={isAuth}
            path="/login"
            exact
          ></AuthRoute>
          <AuthRoute
            component={Register}
            path="/register"
            isAuth={isAuth}
            exact
          ></AuthRoute>
          <ProtectedRoute
            component={Dashboard}
            path="/drive"
            isAuth={isAuth}
            exact
          ></ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
