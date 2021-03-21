import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './component/header/Header';
import Main from './component/landing/Main';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header></Header>
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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
