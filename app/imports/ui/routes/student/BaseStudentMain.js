import React from "react";
import { Switch, Route } from "react-router-dom";

import Menu from '../../components/student/menu/Menu';
import PageContainer from '../../layouts/student/pageContainer/PageContainer';
import AssignmentOverview from '../../pages/student/assignmentOverview/AssignmentOverview';
import ResultOverview from '../../pages/student/resultOverview/ResultOverview';
import SingleAssignment from '../../pages/student/singleAssignment/SingleAssignment';
import Landingspage from '../../pages/student/landingspage/Landingspage';
import UserSettings from '../../pages/student/userSettings/UserSettings';

const Student = () => (
  <div className="student-dashboard-bg">
    <Switch>
      <Route exact path="/student" component={Landingspage} />
      <Route exact path="/student/lessen" component={AssignmentOverview} />
      <Route exact path="/student/resultaten" component={ResultOverview} />
      <Route exact path="/student/resultaten/les/:id" component={SingleAssignment} />
      <Route exact path="/student/instellingen" component={UserSettings} />
    </Switch>
  </div>
);

export default Student;
