import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../pages/general/login/Login';
import Register from '../../pages/general/register/Register';

import Admin from '../../routes/admin/BaseRoute';
import Student from '../../routes/student/BaseStudentRoute';

const BaseRoute = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route path="/student" component={Student} />
    <Route path="/admin" component={Admin} />
  </Switch>
);

export default BaseRoute;
