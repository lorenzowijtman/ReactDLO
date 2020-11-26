import React, { Component } from 'react';

import TextDescription from '../textDescription/TextDescription';
import PictureDescription from '../pictureDescription/PictureDescription';
import OpenQuestion from '../openQuestion/OpenQuestion';
import DragdropQuestion from '../dragdropQuestion/DragdropQuestion';
import MultipleChoicePictureBlock from '../multipleChoicePictureBlock/MultipleChoicePictureBlock';
import Videoupload from '../videoBox/VideoBox';
import MultipleChoiceQuestion from '../multipleChoiceQuestion/MultipleChoiceQuestion';

import './style.scss';

class QuestionSelector extends Component {
  constructor(props) {
    super(props);

    this.answertypes = {
      text: ['Open vraag', 'Meerkeuze antwoorden', 'Meerkeuze plaatje'],
      picture: ['Open vraag', 'Meerkeuze antwoorden', 'Meerkeuze plaatje'],
      video: ['Open vraag', 'Meerkeuze antwoorden', 'Meerkeuze plaatje'],
    };

    this.state = {
      id: this.props.id,
      answertype: '1',
      questiontype: '1',
      questionbox: true,
      answerbox: false,
      currentDropdown: this.answertypes.text,
      answers: [],
      questions: [],
    };

    this.getAnswers = this.getAnswers.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange(this.state);
    }
  }

  onSelectQuestionType = (e) => {
    this.setState({
      questiontype: e.target.value,
      answerbox: true,
      questionbox: false,
      currentDropdown: this.answertypes[e.target.value],
    });
  };

  onSelectAnswerType = (e) => {
    this.setState({
      answertype: e.target.value,
    });
  };

  getAnswers(answers) {
    this.setState({
      answers,
    });
  }

  getQuestions(questions) {
    this.setState({
      questions,
    });
  }

  renderQuestionType() {
    switch (this.state.questiontype) {
      case 'text':
        return <TextDescription value={this.state.questions} onChange={this.getQuestions} />;
      case 'picture':
        return <PictureDescription value={this.state.questions} onChange={this.getQuestions} />;
      case 'video':
        return <Videoupload value={this.state.questions} onChange={this.getQuestions} />;
      default:
        return null;
    }
  }

  renderAnswerType() {
    switch (this.state.answertype) {
      case 'Open vraag':
        return <OpenQuestion value={this.state.answers} onChange={this.getAnswers} />;
      case 'Meerkeuze antwoorden':
        return <MultipleChoiceQuestion value={this.state.answers} onChange={this.getAnswers} />;
      case 'Meerkeuze plaatje':
        return <MultipleChoicePictureBlock value={this.state.answers} onChange={this.getAnswers} />;
      case 'Sleepvragen':
        return <DragdropQuestion value={this.state.answers} onChange={this.getAnswers} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="block block--admin block--darken">
        <form>
          {this.state.questionbox ? (
            <div className="select-box-type-question">
              <select
                id="lang"
                value={this.state.questiontype}
                onChange={this.onSelectQuestionType}
              >
                <option value="1" disabled>
                  Selecteer soort vraag
                </option>
                <option value="text">Tekst beschrijving</option>
                <option value="picture">Plaatje uploaden</option>
                <option value="video">Filmpje uploaden</option>
              </select>
            </div>
          ) : null}
          {this.renderQuestionType()}

          {this.state.answerbox ? (
            <div className="select-box-type-question">
              <select id="lang" value={this.state.answertype} onChange={this.onSelectAnswerType}>
                <option value="1" disabled>
                  Selecteer soort antwoord
                </option>
                {this.state.currentDropdown.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {this.renderAnswerType()}
        </form>
        <button
          onClick={() => {
            this.props.onDelete(this.props.id);
          }}
          className="button button--secondary util--offset-top"
        >
          Verwijder vraag
        </button>
      </div>
    );
  }
}

export default QuestionSelector;
