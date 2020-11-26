import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import results from '../../../../api/collections/results';
import AssignmentStatistics from '../../../components/admin/assignmentStatistics/AssignmentStatistics';

class ResultAssignmentStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      assignmentId: this.props.match.params.id,
      results: [],
      questions: [],
      filteredResults: [],
      combinedArray: [],

    };

    this.getAssignment = this.getAssignment.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    this.props.updateTitleType(true);
    this.props.updateTitle(this.state.title);
    this.getAssignment();
  }


  componentDidUpdate(prevProps, prevState) {
    const { title } = this.state;

    if (prevState.title !== title) {
      this.props.updateTitle(title);
    }
    if (prevProps.results !== this.props.results) {
      this.setState({
        results: this.props.results,
      }, () => {
        this.filterResults();
      });
    }

    if (prevState.filteredResults !== this.state.filteredResults) {
      this.createQuestionObject();
      this.countResults();
    }
  }

  getAssignment() {
    const { assignmentId } = this.state;

    Meteor.call('assignment.getById', assignmentId, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      this.setState({
        title: result.name,
        questions: result.questions,
      });
    });
  }

  filterResults() {
    const { results } = this.state;
    const { assignmentId } = this.state;

    const filteredResults = results.filter(result => result.lessonId === assignmentId);

    this.setState({
      filteredResults,
    });
  }

  createQuestionObject() {
    const { questions, combinedArray } = this.state;

    questions.forEach((question) => {
      const { id, answertype, questions } = question;

      let questionObject = {};

      if (combinedArray.length > 0) {
        combinedArray.forEach((el) => {
          if (el.id === id) {
            questionObject = el;
          }
          questionObject = {
            id,
            type: answertype,
            text: questions.text || questions[0],
            total: 0,
            correct: 0,
            incorrect: 0,
          };
        });
      } else {
        questionObject = {
          id,
          type: answertype,
          text: questions.text || questions[0],
          total: 0,
          correct: 0,
          incorrect: 0,
        };
      }

      combinedArray.push(questionObject);

      this.setState({
        combinedArray,
      });
    });
  }

  countResults() {
    const { combinedArray, filteredResults } = this.state;

    let count = 0;
    filteredResults.forEach((results) => {
      results.answers.forEach((result) => {
        combinedArray.forEach((questionObj) => {
          if (questionObj.id === result.id) {
            console.log(count);
            count++;
            questionObj.total += 1;
            questionObj.correct = result.isCorrect ? questionObj.correct += 1 : questionObj.correct;
            questionObj.incorrect = !result.isCorrect ? questionObj.incorrect += 1 : questionObj.incorrect;
          }
        });
      });
      console.log(combinedArray);
    });

    this.setState({
      combinedArray
    });
  }

  render() {
    return <AssignmentStatistics data={this.state.combinedArray} amountOfResults={this.state.filteredResults.length} />;
  }
}

export default withTracker(() => {
  Meteor.subscribe('results.get');

  return {
    results: results.find().fetch(),
  };
})(ResultAssignmentStatistics);
