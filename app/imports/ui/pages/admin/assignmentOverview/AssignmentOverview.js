import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import assignments from '../../../../api/collections/assignments';
import AssignmentTable from '../../../components/admin/assignmentTable/AssignmentTable';
import FilterBar from '../../../components/general/filterBar/FilterBar';

import './Style.scss';

class AssignmentOverview extends Component {
  constructor(props) {
    super(props);

    this.sort = this.sort.bind(this);

    this.state = {
      name: [
        {
          name: 'A-Z',
          value: 1,
        },
        {
          name: 'Z-A',
          value: -1,
        },
      ],
    };
  }

  componentDidMount() {
    this.props.updateTitleType(true);
    this.props.updateTitle('Lessen');
  }

  sort(event) {
    this.setState({
      order: parseInt(event.target.value),
      orderBy: event.target.name,
    });
  }

  render() {
    return (
      <div className="layout layout--1-col">
        <div className="block block--admin layout layout--3-col">
          <Link to="/admin/lessen/toevoegen" className="button button--primary">
            Nieuwe les
          </Link>
          <FilterBar
            name={this.state.name}
            onChange={this.sort}
          />
          {/* <span className="paragraph paragraph--right">0 Geselecteerd</span> */}
        </div>
        <AssignmentTable sort={{ orderBy: this.state.orderBy, order: this.state.order }} />
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe('assignments.get');

  return {
    assignments: assignments.find({}).fetch(),
  };
})(AssignmentOverview);
