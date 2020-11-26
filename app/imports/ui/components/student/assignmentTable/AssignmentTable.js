import React from 'react';
import { Link } from 'react-router-dom';
import Questions from '../questions/Questions';
import _ from 'lodash';


import assignments from '../../../../api/collections/assignments';

import { withTracker } from 'meteor/react-meteor-data';

import './style.scss';

const AssignmentTable = (props) => {
  // console.log(typeof order);
  // console.log(order);


  const renderDifficultyDots = (difficulty) => {
    const dots = [];

    for (let i = 0; i < difficulty; i += 1) {
      dots.push(<div key={i} className="difficulty-dots" />);
    }

    return dots;
  };

  const sortArray = _.orderBy(props.assignments, [props.sort.orderBy], [props.sort.order === 1 ? 'asc' : 'desc']);

  const filteredItems = props.sort.order === 0 ? props.assignments : sortArray;

  const renderTableItems = filteredItems.map(data => (
    <tr key={data._id}>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>{renderDifficultyDots(data.niveau)}</td>
      <td><Link to={`/student/lessen/maken/${data._id}`}>Link</Link></td>

    </tr>
  ));

  return (
    <table className="student-assignment-table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Beschrijving</th>
          <th>Niveau</th>
          <th>Maken</th>
        </tr>
      </thead>
      <tbody>{renderTableItems}</tbody>
    </table>
  );
};

export default withTracker(() => {
  Meteor.subscribe('assignments.get');
  return {
    assignments: assignments.find({}).fetch(),
  };
})(AssignmentTable);
