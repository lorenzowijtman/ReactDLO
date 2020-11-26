import React from 'react';
import { Link } from 'react-router-dom';

import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import assignments from '../../../../api/collections/assignments';

import './style.scss';

const ResultTable = (props) => {
  const sortArray = _.orderBy(
    props.assignments,
    [props.sort.orderBy],
    [props.sort.order === 1 ? 'asc' : 'desc'],
  );

  const filteredItems = props.sort.order === 0 ? props.assignments : sortArray;

  // For each loop for looping through testdata and put it in a variable
  const renderTableItems = filteredItems.map(data => (
    <tr key={data._id}>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td className="resultPercentage">{data.result}%</td>
      <td>
        <Link to="/student/resultaten/les">Link!</Link>
      </td>
    </tr>
  ));

  // Return and render the result table
  return (
    <table className="student-result-table">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Beschrijving</th>
          <th>Resultaat</th>
          <th>Bekijken</th>
        </tr>
      </thead>
      <tbody>{renderTableItems}</tbody>
    </table>
  );
};

export default withTracker(() => {
  Meteor.subscribe('assignments.get');

  return {
    assignments: assignments.find({}).fetch({}),
  };
})(ResultTable);
