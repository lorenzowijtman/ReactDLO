import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import courses from '../../../../api/collections/courses';

import './Style.scss';

class CourseSubjectOverview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateTitleType(true);
    this.props.updateTitle('Cursussen');
  }

  render() {
    const renderItems = this.props.courses.map(course => (
      <tr key={course._id}>
        <td>{course.name}</td>
        <td>44</td>
        <td>50</td>
        <td>
          <Link to={`/admin/cursussen/${course._id}`}>Link</Link>
        </td>
      </tr>
    ));
    return (
      <div className="subject-overview-container">
        <div className="top-container">
          <Link to="/admin/cursussen/toevoegen">
            <button className="new-course-btn">Nieuwe cursussen</button>
          </Link>
          <button>Sorteren</button>
          <span className="total-selected-text">0 Geselecteerd</span>
        </div>
        <div className="result-list">
          <table>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Aantal personen</th>
                <th>Aantal opdrachten</th>
                <th>Bekijk</th>
              </tr>
            </thead>
            <tbody>{renderItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('courses.get');

  return {
    courses: courses.find({}).fetch(),
  };
})(CourseSubjectOverview);
