import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Tasks from '../pages/Tasks';
import Users from '../pages/Users';
import Teams from '../pages/Teams';
import TeamTasks from '../pages/TeamsTasks';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Login} exact />
    <Route path="/signup" component={SignUp} exact />
    <Route path="/tasks" component={Tasks} exact />
    <Route path="/users" component={Users} exact />
    <Route path="/teams" component={Teams} exact />
    <Route path="/teamtasks/:user_id" component={TeamTasks} exact />
  </Switch>
);

export default Routes;
