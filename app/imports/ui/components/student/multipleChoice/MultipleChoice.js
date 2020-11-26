import React, { Component } from 'react';

class MultipleChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      correctAnswer: null,
      correct: false,
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
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.correct !== this.state.correct) {
      this.props.onChange(this.props.id, this.state.correct);
    }
  }


  render() {
    return (
      <div className="multiple-choice">
        <ul>
              {this.state.answers.map(answer => (
                <li key={answer.id}>
                    <label>{answer.answer} <input type="radio" name="userSelect" value={answer.id} onChange={this.inputHandler} /></label>
                  </li>
                ))}
            </ul>
      </div>
    );
  }
}

export default MultipleChoice;
