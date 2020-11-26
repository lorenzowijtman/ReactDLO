import React, { Component } from 'react';

import './style.scss';

class PictureQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      selected: '',
      correct: null,
      correctAnswer: null,
    };

    this.inputHandler = this.inputHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data === undefined) {
      return null;
    }

    if (nextProps.data !== prevState.answers) {
      return {
        answers: nextProps.data,
        correctAnswer: nextProps.data[0].correctanswerid,
      };
    }

    return null;
  }

  inputHandler(e) {
    const { value } = e.target;

    this.setState({
      correct: value === this.state.correctAnswer,
      selected: value,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.correct !== this.state.correct) {
      this.props.onChange(this.props.id, this.state.correct);
    }
  }

  render() {
    return (<div className="student-picture-question-container">
      {this.state.answers.map(answer => (
        <label key={answer.id}>
          <img src={answer.imageurl} alt="" style={{ border: answer.id === this.state.selected ? '3px solid lightgreen' : null }} />
          {answer.answer} <input type="radio" name="imageGroup" value={answer.id} onChange={this.inputHandler} />
        </label>))}
            </div>);
  }
}

export default PictureQuestion;
