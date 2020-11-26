import React, { Component } from 'react';

import './style.scss';

class AssignmentStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalsubmits: 0,
      data: [],
      totalResult: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data) {
      return {
        data: props.data,
        totalResult: props.data.length,
      };
    }

    if (props.amountOfResults !== state.totalsubmits) {
      return {
        totalsubmits: props.amountOfResults,
      };
    }

    return null;
  }

  render() {
    // For each loop for looping through testdata and put it in a variable
    const renderQuestions = this.state.data.map((data, index) => (

      <div key={data.id} className="chart block block--admin block--darken block--align-middle">
      <h3 className="block__title">{index + 1}</h3>
      <p className="question-sentence">{data.text}</p>
      <div className="block block--admin chart__container">
        {console.log(Math.round(data.correct / data.total), 2)}
        <div className="chart__bar chart__bar--success" style={{ height: ((data.correct / data.total).toFixed(2) * 100) }} >
          <span className="chart__percentage">{((data.correct / data.total).toFixed(2) * 100)}%</span>
        </div>
        <div className="chart__bar chart__bar--wrong" style={{ height: ((data.incorrect / data.total).toFixed(2) * 100) }} >
          <span className="chart__percentage">{((data.incorrect / data.total).toFixed(2) * 100)}%</span>
        </div>
      </div>
    </div>

    ));

    return (
      <div className="layout layout--1-col">
      <div className="block block--admin layout layout--3-col layout--spaced">
        <span className="assignment-counter">Toets is {this.state.totalsubmits}x gemaakt</span>
        {/* <span className="result-percentage">Resultaat: {this.state.result}%</span> */}
        {/* <select className="person-selectbox" style={{ justifySelf: 'end' }}>
          <option value="person1">Persoon 1</option>
          <option value="person2">Persoon 2</option>
          <option value="person3">Persoon 3</option>
        </select> */}
      </div>
      <div className="block block--admin">
        <h2 className="block__title">Resultaten</h2>
        <div className="layout layout--2-col">
          {renderQuestions}
        </div>
      </div>
    </div>
    );
  }
}

export default AssignmentStatistics;
