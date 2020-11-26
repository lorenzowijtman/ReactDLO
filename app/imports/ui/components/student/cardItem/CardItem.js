import React from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import {randomColor} from '../../../../util/randomColors';
import assignments from '../../../../api/collections/assignments';

import './style.scss';

const CardItem = (props) => {
  const sortArray = _.orderBy(
    props.assignments,
    [props.sort.orderBy],
    [props.sort.order === 1 ? 'asc' : 'desc'],
  );

  const backgroundColors = ['#00A3DA', '#812C7C', '#D8127D'];

  const filteredItems = props.sort.order === 0 ? props.assignments : sortArray;

  const renderDifficultyDots = (difficulty) => {
    const dots = [];

    for (let i = 0; i < difficulty; i += 1) {
      dots.push(<div key={i} className="difficulty-dots" />);
    }

    return dots;
  };

  const renderCardItems = filteredItems.map(data => (
    <div key={data._id}>
      {props.pagetype === 'lessons' ?
        <Link to={`/student/lessen/maken/${data._id}`}>
          <div className="card-container slide-right" style={{backgroundColor: randomColor()}}>
            <img className="lesson-image" src={data.highlightedImage} alt={data.name} />
            <div className="lesson-description">Les beschrijving:<br /><br />{data.description}</div>
            <p className="lesson-name">{data.name}</p>
            {/* <p className="lesson-level">{renderDifficultyDots(data.niveau)}</p> */}
            <div className="lesson-level">{renderDifficultyDots(data.difficulty)}</div>
          </div>
        </Link>
      :
        <Link to={`/student/resultaten/les/${data._id}`} key={data._id}>
          <div className="card-container slide-right" style={{backgroundColor: randomColor(backgroundColors)}}>
            <img className="lesson-image" src={data.highlightedImage} alt={data.name} />
            <div className="lesson-description">Les beschrijving:<br /><br />{data.description}</div>
            <p className="lesson-name">{data.name}</p>
            <p className="resultPercentage">Resultaat: {data.result}%</p>
          </div>
        </Link>
    }
    </div>
  ));

  return (
    <div className="assignment-card-container">
      { renderCardItems }
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('assignments.get');

  return {
    assignments: assignments.find({ status: true }).fetch(),
  };
})(CardItem);

