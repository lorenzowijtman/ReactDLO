import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import _ from 'underscore';

import Alert from '../../../components/general/alert/Alert';
import MultipleChoice from '../multipleChoice/MultipleChoice';
import OpenQuestion from '../openQuestion/OpenQuestion';
import DragAndDropQuestion from '../dragAndDropQuestion/DragAndDropQuestion';
import ReactPlayer from 'react-player';
import PictureQuestion from '../pictureQuestion/PictureQuestion';

import './Style.scss';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      currentIBox: 'square',
      isAlert: false,
      alertMessage: '',
      alertType: 'danger',
      amountOfQuestions: 0,
      currentQuestion: 0,
      givenAnswers: [],
      assignment: {},
      questionComponents: [],
      currentQuestionComponent: null,
    };

    this.getAssignment = this.getAssignment.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    // this.determineQuestionType = this/determineQuestionType.bind(this);
    this.renderQuestionIndications = this.renderQuestionIndications.bind(this);
    this.switchQuestion = this.switchQuestion.bind(this);
    this.finish = this.finish.bind(this);
    this.getQuestionComponents = this.getQuestionComponents.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.submitLesson = this.submitLesson.bind(this);
  }

  // haalt de assignment op uit de database
  getAssignment() {
    const id = this.props.match.params.id;
    Meteor.call('assignment.getById', id, (error, result) => {
      if (error) {
        console.log('error, assignment niet gevonden');
        return;
      }
      this.setState({
        assignment: result,
      });
    });
  }

  componentDidMount() {
    this.getAssignment();
    const elements = document.getElementsByClassName('student-area');
    // elements[0].style.backgroundColor = '#ffffff';
  }

  finish() {
    const myData = [].concat(this.state.givenAnswers).sort((a, b) => a.index - b.index);

    // Meteor.call('assignments.add', myData, (error, result) => {
    //   if (error) {
    //     this.setState({
    //       isAlert: true,
    //       alertType: 'danger',
    //       alertMessage: 'Er is iets fout gegaan',
    //     });
    //   } else {
    //     this.setState({
    //       isAlert: true,
    //       alertType: 'success',
    //       alertMessage: 'Opdracht is afgerond!',
    //     });
    //   }
    // });

    this.props.history.push('/student/resultaten/opdracht');
  }

  // bepaald welk type vraag, of het afbeelding of video heeft en geeft correct component terug
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.assignment !== prevState.assignment) {
      this.getQuestionComponents();
      this.setState({
        amountOfQuestions: this.state.assignment.questions.length,
      });
    }
  }

  getQuestionType(type, data) {
    switch (type) {
      case 'text':
        return {
          description: <div className="text">{data}</div>,
        };
      case 'picture':
        return {
          description: <div className="text"><img className="img-question" src={data.img} alt="question" /><p>{data.text}</p></div>,
        };

      case 'video':
        return {
          description: <div className="text"><ReactPlayer className="react-player" url={data.geturl} controls loop /><p>{data.text}</p></div>
        }
    }
  }

  getAnswerType(id, type, data) {
    switch (type) {
      case 'Meerkeuze antwoorden':
        return {
          answer: (
            <MultipleChoice
              id={id}
              data={data}
              onChange={(id, data) => {
                this.submitAnswer(id, data);
              }}
            />
          ),
        };
      case 'Open vraag':
        return {
          answer: <OpenQuestion id={id} data={data} onChange={(id, data) => { this.submitAnswer(id, data); }} />,
        };
      case 'Meerkeuze plaatje':
        return {
          answer: (
            <PictureQuestion
              id={id}
              data={data}
              onChange={(id, data) => {
                this.submitAnswer(id, data);
              }}
            />
          ),
        };

      case 'Sleepvragen':
        return {
          answer: <DragAndDropQuestion id={id} data={data} onChange={(id, data) => {this.submitAnswer(id, data); }} />,
        }

    }
  }

  getQuestionComponents() {
    const { questions } = this.state.assignment;
    const questionObjects = [];
    let index = 0;

    questions.forEach((question) => {
      const {
        id, questiontype, questions, answertype, answers,
      } = question;

      const descriptionObject = this.getQuestionType(questiontype, questions);
      const answersObject = this.getAnswerType(id, answertype, answers);

      const questionObject = Object.assign({ index }, { descriptionObject }, { answersObject });

      questionObjects.push(questionObject);

      index += 1;
    });

    this.setState({
      questionComponents: questionObjects,
    });
  }

  switchQuestion(e) {
    console.log('clicked switch question');
    const css = this.state.currentIBox === 'square' ? 'current-square' : 'square';
    this.setState({
      currentQuestion: e.currentTarget.dataset.id,
      currentIBox: css,
    });
  }

  submitAnswer(id, data) {
    const answers = this.state.givenAnswers;

    if (answers.length < 1) {
      answers.push({ id, isCorrect: data });
    } else {
      answers.forEach((answer) => {
        const index = answers.findIndex((answer) => answer.id === id);

        if (index > -1) {
          answers[index].isCorrect = data;
        } else {
          answers.push({ id, isCorrect: data });
        }
      });
    }

    this.setState({
      givenAnswers: answers,
    });
  }

  // bepaalt hoeveel questionIndication boxes er gemaakt worden, geeft ook currentquestion en onClick mee
  renderQuestionIndications() {
    const boxes = [];
    for (let i = 0; i < this.state.amountOfQuestions; i++) {
      if (i === this.state.currentQuestion) {
        boxes.push(<li className="current-square" key={i} data-id={i}>
          {i + 1}
        </li>);
      } else {
        boxes.push(<li className={this.state.currentIBox} key={i} data-id={i} onClick={this.switchQuestion}>
          {i + 1}
                   </li>);
      }
    }

    return boxes;
  }

  nextQuestion() {
    const { currentQuestion, amountOfQuestions } = this.state;

    if (currentQuestion < amountOfQuestions - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    }
  }

  previousQuestion() {
    const { currentQuestion, amountOfQuestions } = this.state;

    if (currentQuestion > 0) {
      this.setState({
        currentQuestion: currentQuestion - 1,
      });
    }
  }

  submitLesson() {
    const { givenAnswers } = this.state;
    const id = this.props.match.params.id;

    const result = Meteor.call('results.add', { lessonId: id, answers: givenAnswers }, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log(result);

      this.props.history.push('/student/resultaten/');
    });
  }

  render() {
    const { amountOfQuestions, currentQuestion } = this.state;

    const nextButton = currentQuestion + 1 === amountOfQuestions ? (
      <button className="submit-btn button button--primary" onClick={this.submitLesson}>Opdracht inleveren</button>
    ) : (
      <button className="next-btn" onClick={this.nextQuestion}>Volgende vraag</button>
    );

    return (
      <div className="question-container">
        <Link to="/student/lessen">
          <div className="back-button">
            <h1 className="stop-button"> &lt; Stop</h1>
          </div>
        </Link>

        <h1 className="test-subject">{this.state.assignment.name}</h1>
        <div className="question-number">
          Vraag: {this.state.currentQuestion + 1}/{this.state.amountOfQuestions}
        </div>

        <div className="q-and-a-container">
          <ul className="question-answer-box">
            {
              this.state.questionComponents.map(question => (
                <li key={question.index} index={question.index} className={this.state.currentQuestion === question.index ? 'show' : 'hide'}>
                  <div className="question">
                    {question.descriptionObject.description}
                    <div className="give-answer-info">
                      <b><br />Vul/kies hieronder je antwoord in:<br /><br /></b>
                    </div>
                    {question.answersObject.answer}
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="switch-qtns-btn-container">
            <button className="previous-btn button button--primary" onClick={this.previousQuestion}>Vorige vraag</button>
            {nextButton}
          </div>
        </div>

        <div className="progress">
          <span>
            <ul className="list">{this.renderQuestionIndications()}</ul>
          </span>
        </div>
      </div>
    );
  }
}

export default Questions;
