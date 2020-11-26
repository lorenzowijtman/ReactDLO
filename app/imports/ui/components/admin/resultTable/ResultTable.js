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

  const renderDifficultyDots = (difficulty) => {
    const dots = [];

    for (let i = 0; i < difficulty; i += 1) {
      dots.push(<div key={i} className="difficulty-dots" />);
    }

    return dots;
  };

  const filteredItems = props.sort.order === 0 ? props.assignments : sortArray;

  const renderTableItems = filteredItems.map(data => (
    <tr key={data._id}>
      <td className="table__cell">{data.name}</td>
      <td className="table__cell">{renderDifficultyDots(data.difficulty)}</td>
      {/* <td className="table__cell">{data.result}%</td> */}
      <td className="table__cell">
        <Link className="button button--arrow" to={`/admin/resultaten/les/${data._id}`} />
      </td>
    </tr>
  ));

  return (
    <table className="table table--admin">
      <thead className="table__header">
        <tr>
          <th className="table__cell--head">Naam</th>
          <th className="table__cell--head">Niveau</th>
          {/* <th className="table__cell--head">Resultaat</th> */}
          <th className="table__cell--head">Bekijken</th>
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
