import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {randomColorWord} from '../../../../util/randomColors';

import './style.scss';

class Landingspage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: '',
    };
  }

  render() {
    return (
      <div className="student-landingspage">
        <div className="title-container">
          <div className="title oba-title float-down">
            {randomColorWord('oba')}
          </div>
          <p className="title sub-title float-down">
            {randomColorWord('digitale leeromgeving')}
          </p>
          <p className="title welcome fadingEffect">Welkom: {Meteor.user().profile.firstname} {Meteor.user().profile.lastname}</p>
        </div>
        <div className="choice-button-container float-up">
          <Link className="assignment-btn-spacing" to="/student/lessen">
            <button className="button-choice assignment">Mijn lessen</button>
          </Link>
          <Link to="/student/resultaten">
            <button className="button-choice results">Mijn resultaten</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landingspage;
