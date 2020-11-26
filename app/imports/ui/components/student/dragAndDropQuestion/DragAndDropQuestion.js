import React, { Component } from 'react';
import _ from 'lodash';

import './style.scss';

const block = {
  padding: '30px',
  float: 'left',
  border: '1px solid black',
  textAlign: 'center',
};

class DragAndDropQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      questions: [],
      answers: [],
      results: [],
    };

    this.drag = this.drag.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.getQuestions();
      this.getAnswers();
    }

    if (prevState.results !== this.state.resutls) {
        this.props.onChange(this.props.id, this.state.results);
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  getQuestions() {
    const { data } = this.state;

    const questions = data.map(({ id, question }) => ({
      id,
      question,
    }));

    this.setState({
      questions,
    });
  }

  getAnswers() {
    const { data } = this.state;

    const answers = data.map(({ id, answer }) => ({
      id,
      answer,
    }));

    this.setState({
      answers,
    });
  }

  drag(e) {
    const data = JSON.stringify({ correct: e.target.dataset.correct, id: e.target.id });
    e.dataTransfer.setData('text/plain', data);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drop(e, doAction) {
    e.preventDefault();

    console.log(e.target.id);

    const {id} = e.target;

    if(id.split('-')[0] === 'answer') {
        return;
    }

    const { results } = this.state;

    const { correct } = e.target.dataset;
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));

    e.target.appendChild(document.getElementById(data.id));

    this.addToResults({ id: data.correct, isCorrect: correct === data.correct });
  }

  addToResults({ id, isCorrect }) {
    console.log(isCorrect);
    const { results } = this.state;

    if (results.length < 1) {
      results.push({
        id,
        isCorrect,
      });
    } else {
      let index = -1;
      results.forEach((result, i) => {
        if (result.id === id) {
          index = i;
        }
      });

      if (index === -1) {
        results.push({
          id,
          isCorrect,
        });
      } else {
        results[index] = {
          id,
          isCorrect,
        };
      }

      console.log(index);
    }

    this.setState({
      results,
    });
  }

  render() {
    const { questions, answers } = this.state;

    const shuffledAnswers = _.shuffle(answers);

    const questionObjects = questions.map(({ id, question }, index) => (
      <div className="question-block-bg" id={`question-block-${index}`} onDrop={e => (this.drop(e, true))} onDragOver={this.allowDrop} style={block} data-correct={id}>
        <span style={{ display: 'block', pointerEvents: 'none' }}>{question}</span>
      </div>
    ));

    const answerObjects = shuffledAnswers.map(({ id, answer }, index) => (
      <div className="answer-block-bg" id={`answer-block-${index}`} draggable onDragStart={this.drag} style={block} data-correct={id}>
        {answer}
      </div>
    ));

    return (
      <div className="drag-and-drop-box">
        <div className="question-box">
          <p>Vragen:</p>
          {questionObjects}
        </div>
        <div className="answer-box margin-left" onDrop={e => (this.drop(e, false))} onDragOver={this.allowDrop} data-correct={null}>
          <p>Sleep het antwoord naar links:</p>
          {answerObjects}
        </div>
      </div>
    );
  }
}

export default DragAndDropQuestion;
