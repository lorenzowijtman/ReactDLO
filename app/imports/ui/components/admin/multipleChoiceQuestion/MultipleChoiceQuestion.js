import React, { Component } from 'react';
import shortid from 'shortid';

import './style.scss';

class MultipleChoiceQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      answers: [],
      correctanswerid: null,
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.getCorrectAnswer = this.getCorrectAnswer.bind(this);
    this.addExtraOption = this.addExtraOption.bind(this);
  }

  getCorrectAnswer(e) {
    const { value } = e.target;
    const { answers } = this.state;

    answers.forEach((element) => {
      element.correctanswerid = value;
    });

    this.setState({
      correctanswerid: value,
      answers,
    });
  }

  addExtraOption(data) {
    const options = this.state.options;

    const id = shortid.generate();

    options.push(<div key={id}><input
      className="spacing-answer-question-row"
      name="option"
      id={id}
      defaultValue={data ? data.answer : null}
      onChange={(e) => {
                this.inputHandler(e, 'option');
              }}
    />
      {data ?
        <span> <input
          type="radio"
          name="correctanswer"
          id={id}
          value={id}
          checked={data.id === data.correctanswerid}
          disabled={!!data}
          onChange={(e) => {
                this.getCorrectAnswer(e, 'correctanswer');
              }}
        />
        </span>
        : <span> <input
          type="radio"
          name="correctanswer"
          id={id}
          value={id}
          onChange={(e) => {
                this.getCorrectAnswer(e, 'correctanswer');
              }}
        />
        </span> }
    </div>);

    this.setState({
      options,
    });

    console.log(this.state.options);
  }

  inputHandler(e) {
    const { id, value } = e.target;
    const { answers } = this.state;
    const object = {};

    object.id = id;
    object.answer = value;
    object.correctanswerid = this.state.correctanswerid;

    const index = answers.findIndex(answer => answer.id === id);

    if (index === -1) {
      answers.push(object);
    } else {
      answers[index] = Object.assign(answers[index], object);
    }

    this.setState({
      answers,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange(this.state.answers);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.answers !== nextProps.value) {
      for (const answer of this.props.value) {
        this.addExtraOption(answer);
        console.log(answer);
      }

      this.setState({
        answers: this.props.value,
      });
    }
  }

  render() {
    const renderMultipleChoice = this.state.options.map(option => option);
    return (
      <div className="multiple-choice-question-container">
        {renderMultipleChoice}
        <p>Totaal aantal keuzes: {this.state.options === null ? '0' : this.state.options.length}</p>
        <button
          className="spacing-add-option-btn"
          onClick={(e) => {
                e.preventDefault();
                this.addExtraOption();
                }}
        >
        Voeg extra keuze toe
        </button>
      </div>);
  }
}
export default MultipleChoiceQuestion;
