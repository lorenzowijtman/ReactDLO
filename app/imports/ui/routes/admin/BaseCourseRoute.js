import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CourseSubjectOverview from '../../pages/admin/courseOverview/CourseSubjectOverview';
import CourseSingle from '../../pages/admin/courseSingle/CourseSingle';

class BaseCourseRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/cursussen/"
          render={props => (
            <CourseSubjectOverview
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
            />
          )}
        />
        <Route
          exact
          path="/admin/cursussen/toevoegen/"
          render={props => (
            <CourseSingle
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
              getTitle={this.props.getTitle}
            />
          )}
        />
        <Route
          exact
          path="/admin/cursussen/:id"
          render={props => (
            <CourseSingle
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
              getTitle={this.props.getTitle}
            />
          )}
        />
      </Switch>
    );
  }
}

export default BaseCourseRoute;
