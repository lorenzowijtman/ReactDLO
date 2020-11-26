import React, { Component } from 'react';
import shortid from 'shortid';

import './style.scss';

class DragdropQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      answers: [],
    };

    this.addExtraOption = this.addExtraOption.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  addExtraOption(data) {
    const options = this.state.options;

    const id = shortid.generate();

    options.push(<div className="spacing-answer-question-row" key={id}>
      <input
        name="question"
        id={id}
        defaultValue={data ? data.question : null}
        onBlur={(e) => {
            this.inputHandler(e, 'question');
          }}
      />
      <span>---</span>
      <input
        name="answer"
        id={id}
        defaultValue={data ? data.answer : null}
        onBlur={(e) => {
            this.inputHandler(e, 'answer');
          }}
      />
                 </div>);

    this.setState({
      options,
    });

    console.log(this.state.options);
  }

  inputHandler(e, type) {
    const { id, value } = e.target;
    const { answers } = this.state;
    const object = {};

    console.log(type);

    object.id = id;

    if (type === 'question') {
      object.question = value;
    } else {
      object.answer = value;
    }

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
    const renderOptions = this.state.options.map(option => option);
    return (
      <div className="drag-and-drop-block">
        <br />
        <span>Vraag</span>
        <span className="spacing-title">Antwoord</span>
        <br />
        {renderOptions}
        <p>Totaal aantal opties: {this.state.options === null ? '0' : this.state.options.length}</p>
        <button
          className="spacing-add-option-btn"
          onClick={(e) => {
            e.preventDefault();
            this.addExtraOption();
          }}
        >
          Voeg extra optie toe
        </button>
      </div>
    );
  }
}
export default DragdropQuestion;
