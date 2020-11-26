import React, { Component } from 'react';

class OpenQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: '',
      correctAnswer: 'antwoord',
      correct: null,
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
        correctAnswer: nextProps.data[0],
      };
    }

    return null;
  }

  inputHandler(e) {
    const { value } = e.target;
    const { correct, correctAnswer } = this.state;

    this.setState({
      correct: value === correctAnswer,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.correct !== this.state.correct) {
      this.props.onChange(this.props.id, this.state.correct);
    }
  }

  render() {
    return <textarea type="text" name="userInput" onChange={this.inputHandler} />;
  }
}

export default OpenQuestion;