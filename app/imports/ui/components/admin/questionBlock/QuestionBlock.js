import React, { Component } from 'react';
import shortid from 'shortid';

import QuestionSelector from '../questionSelector/QuestionSelector';

class QuestionBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionBlocks: [],
      questions: [],
    };

    this.addQuestionBlock = this.addQuestionBlock.bind(this);
    this.removeQuestionBlock = this.removeQuestionBlock.bind(this);
    this.getQuestionData = this.getQuestionData.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange(this.state);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.questions !== this.state.questions) {
      for (const question of nextProps.data.questions) {
        this.addQuestionBlock(null, question);
      }
      this.setState({
        questions: nextProps.data.questions,
      });
    }
  }

  addQuestionBlock(e, data) {
    const { questionBlocks } = this.state;

    const id = data ? data.id : shortid.generate();

    questionBlocks.push(<QuestionSelector
      onChange={this.getQuestionData}
      onDelete={() => {
          this.removeQuestionBlock(id);
        }}
      state={data}
      key={id}
      id={id}
    />);

    this.setState({
      questionBlocks,
    });
  }

  removeQuestionBlock(id) {
    const { questionBlocks, questions } = this.state;

    const newQuestionBlocks = questionBlocks.filter(questionBlock => questionBlock.key !== id);
    const newQuestions = questions.filter(question => question.id !== id);

    this.setState({
      questions: newQuestions,
      questionBlocks: newQuestionBlocks,
    });
  }

  getQuestionData(data) {
    const { questions } = this.state;

    const index = questions.findIndex(question => question.id === data.id);

    if (index === -1) {
      questions.push(data);
    } else {
      questions[index] = data;
    }

    this.setState({
      questions,
    });
  }

  render() {
    const renderQuestionBlocks = this.state.questionBlocks.map(questionBlock => questionBlock);
    return (
      <div className="block block--admin">
        <h3 className="block__title">Vragen</h3>
        <div className="block layout layout--1-col">
          {renderQuestionBlocks}
        </div>
        <button className="button button--primary util--offset-top" onClick={this.addQuestionBlock}>Voeg vraag toe</button>
      </div>
    );
  }
}

export default QuestionBlock;
