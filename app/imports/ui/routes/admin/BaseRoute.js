import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../../components/admin/header/Header';
import Menu from '../../components/admin/menu/Menu';
import PageContainer from '../../layouts/admin/pageContainer/PageContainer';
import Dashboard from '../../pages/admin/dashboard/Dashboard';
import UserSettings from '../../pages/admin/userSettings/UserSettings';

import BaseCourseRoute from './BaseCourseRoute';
import BaseAssignmentRoute from './BaseAssignmentsRoute';
import BaseResultRoute from './BaseResultRoute';

class BaseAdminRoute extends Component {
  constructor(props) {
    super(props);

    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.updatePageTitleInput = this.updatePageTitleInput.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.getPageTitle = this.getPageTitle.bind(this);

    this.state = {
      isTitle: true,
      title: '',
    };
  }

  componentWillMount() {
    if (Meteor.user() === undefined) {
      this.props.history.push('/');
    }
  }

  updatePageTitle(title) {
    this.setState({
      title,
    });
  }

  updatePageTitleInput(isTitle) {
    this.setState({
      isTitle,
    });
  }

  handleTitleUpdate(e) {
    this.setState({
      title: e.target.value,
    });
  }

  getPageTitle() {
    return this.state.title;
  }

  render() {
    return (
      <div className="layout layout--admin">
        <Menu />
        <div className="page page--admin">
          <Header
            title={this.state.title}
            isTitle={this.state.isTitle}
            handleTitleUpdate={this.handleTitleUpdate}
            {...this.props}
          />
          <PageContainer>
            <Switch>
              <Route
                exact
                path="/admin"
                render={props => (
                  <Dashboard
                    {...props}
                    updateTitle={this.updatePageTitle}
                    updateTitleType={this.updatePageTitleInput}
                  />
                )}
              />
              <Route
                path="/admin/cursussen"
                render={props => (
                  <BaseCourseRoute
                    {...props}
                    updateTitle={this.updatePageTitle}
                    updateTitleType={this.updatePageTitleInput}
                    getTitle={this.getPageTitle}
                  />
                )}
              />
              <Route
                path="/admin/lessen"
                render={props => (
                  <BaseAssignmentRoute
                    {...props}
                    updateTitle={this.updatePageTitle}
                    updateTitleType={this.updatePageTitleInput}
                    getTitle={this.getPageTitle}
                  />
                )}
              />
              <Route
                path="/admin/resultaten"
                render={props => (
                  <BaseResultRoute
                    {...props}
                    updateTitle={this.updatePageTitle}
                    updateTitleType={this.updatePageTitleInput}
                  />
                )}
              />
              <Route
                path="/admin/instellingen"
                render={props => (
                  <UserSettings
                    {...props}
                    updateTitle={this.updatePageTitle}
                    updateTitleType={this.updatePageTitleInput}
                  />
                )}
              />
            </Switch>
          </PageContainer>
        </div>
      </div>
    );
  }
}

export default BaseAdminRoute;
