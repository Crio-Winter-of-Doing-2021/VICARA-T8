import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/header/Header';
import Main from './component/landing/Main';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Documentation from './component/documentation/Documentation';
import Dashboard from './component/dashboard/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <Header></Header> */}
        <Switch>
          <Route exact path="/">
            <Main></Main>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/docs">
            <Documentation></Documentation>
          </Route>
          <Route exact path="/drive">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
