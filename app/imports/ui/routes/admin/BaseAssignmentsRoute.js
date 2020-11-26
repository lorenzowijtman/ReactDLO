import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AssignmentOverview from '../../pages/admin/assignmentOverview/AssignmentOverview';
import AssignmentSingle from '../../pages/admin/assignmentSingle/AssignmentSingle';

class BaseAssignmentRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/lessen/"
          render={props => (
            <AssignmentOverview
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
            />
          )}
        />
        <Route
          exact
          path="/admin/lessen/toevoegen"
          render={props => (
            <AssignmentSingle
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
              getTitle={this.props.getTitle}
            />
          )}
        />
        <Route
          exact
          path="/admin/lessen/:id"
          render={props => (
            <AssignmentSingle
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

export default BaseAssignmentRoute;
