import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ResultAssignment from '../../../components/student/resultAssignment/ResultAssignment';
import AssignmentResult from '../../../components/student/resultAssignment/AssignmentResult';

import './style.scss';

class SingleAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjectname: 'Rekenen oefentoets',

    };
  }

  render() {
    return (
      <div className="student-single-assignment">
        <AssignmentResult lessonname={this.state.subjectname} id={this.props.match.params.id} />
      </div>
    );
  }
}

export default SingleAssignment;
