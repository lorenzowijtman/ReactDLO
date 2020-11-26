import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import assignments from '../../../../api/collections/assignments';
import QuickLink from '../../../components/admin/quickLink/QuickLink';
import DashboardTable from '../../../components/admin/dashboardTable/DashboardTable';
import './style.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentCount: 0,
      assignmentCount: 0,
      resultCount: 0,
    };
  }
  componentDidMount() {
    this.props.updateTitleType(true);
    this.props.updateTitle('Dashboard');

    const methodArray = [
      { name: 'users.countStudents', state: 'studentCount' },
      { name: 'assignment.count', state: 'assignmentCount' },
      { name: 'results.count', state: 'resultCount' },
    ];

    methodArray.map((method) => {
      Meteor.call(method.name, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }

        this.setState({
          [method.state]: result,
        });
      });
    });
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="quick-link-container">
          <QuickLink number={this.state.studentCount} text="Studenten" />
          <QuickLink number={this.state.assignmentCount} text="Lessen" />
          <QuickLink number={this.state.resultCount} text="Resultaten" />
        </div>
        <h3>Niet gepubliceerde lessen</h3>
        <DashboardTable dataList={this.props.assignments} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('assignments.get');

  return {
    assignments: assignments.find({ status: false }).fetch(),
  };
})(Dashboard);
