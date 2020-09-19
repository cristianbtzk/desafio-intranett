import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Tasks from '../pages/Tasks';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Login} exact />
    <Route path="/signup" component={SignUp} exact />
    <Route path="/tasks" component={Tasks} exact />
  </Switch>
);

export default Routes;
