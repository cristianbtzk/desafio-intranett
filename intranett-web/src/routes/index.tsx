import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Login} exact />
    <Route path="/signup" component={SignUp} exact />
  </Switch>
);

export default Routes;
