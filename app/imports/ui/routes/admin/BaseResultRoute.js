import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ResultOverview from '../../pages/admin/resultOverview/ResultOverview';
import AssignmentStatistics from '../../pages/admin/resultAssignmentStatistics/ResultAssignmentStatistics';

class BaseResultRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/resultaten"
          render={props => (
            <ResultOverview
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
            />
          )}
        />
        <Route
          exact
          path="/admin/resultaten/les/:id"
          render={props => (
            <AssignmentStatistics
              {...props}
              updateTitle={this.props.updateTitle}
              updateTitleType={this.props.updateTitleType}
            />
          )}
        />
      </Switch>
    );
  }
}

export default BaseResultRoute;
