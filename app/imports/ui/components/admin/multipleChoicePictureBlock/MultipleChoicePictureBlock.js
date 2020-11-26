import React, { Component } from 'react';
import UploadManager from '../../../components/admin/uploadManager/UploadManager';
import shortid from 'shortid';

import './style.scss';

class MultipleChoicePictureBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentIndex: null,
      options: [],
      answers: [],
      img: '',
      imgStatus: 0,
      correctanswerid: null,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.addExtraOption = this.addExtraOption.bind(this);
  }
  // compdidup questionselector >
  // compwillrecieve props >

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

  close(image) {
    const { currentIndex, answers } = this.state;
    let imageStatus;

    if (image === null) {
      imageStatus = 0;
    } else {
      imageStatus = 1;
    }

    this.setState({
      answers,
      show: false,
      img: image,
      imgStatus: imageStatus,
    });
  }

  open(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      show: true,
      currentIndex: e.target.value,
    });
  }

  addExtraOption(data) {
    const { options, answers } = this.state;

    const id = shortid.generate();

    options.push(<div className="single-picture-upload" key={id}>
      <div className="image-and-btns">
        <img className="uploaded-image" src={data ? data.imageurl : this.state.img} alt="" />
      </div>
      <div className="select-image-btn">
        {data ?
          <input
            id={id}
            name="radioGroup"
            className="radioGroup"
            type="radio"
            value={id}
            checked={data.id === data.correctanswerid}
            disabled={!!data}
            onChange={(e) => {
            this.getCorrectAnswer(e, 'option');
          }}
          />
        :
          <input
            id={id}
            name="radioGroup"
            className="radioGroup"
            type="radio"
            value={id}
            onChange={(e) => {
            this.getCorrectAnswer(e, 'option');
          }}
          />}
        <br />
      </div>
    </div>);

    const object = {};

    object.id = id;
    object.imageurl = this.state.img;
    object.correctanswerid = this.state.correctanswerid;

    const index = answers.findIndex(answer => answer.id === id);

    if (index === -1) {
      answers.push(object);
    } else {
      answers[index] = Object.assign(answers[index], object);
    }

    this.setState({
      answers,
      options,
      imgStatus: 0,
    });
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

  render() {
    return (
      <div className="multiple-choice-picture-container">
        <UploadManager show={this.state.show} onClose={this.close} className="Answer" />
        <h3>Antwoorden</h3>
        <button className="button button--primary" onClick={this.open}>
          Upload afbeelding
        </button>
        {this.state.imgStatus === 0 ? '' :
        <button
          className="button button--primary add-option-btn"
          onClick={(e) => {
                e.preventDefault();
                this.addExtraOption();
                }}
        >
        Voeg afbeelding toe
        </button>
        }
        {this.state.options.map(option => option)}
        <br /><i>Geef het juiste antwoord aan door het cirkeltje naast de afbeelding aan te klikken.</i>
      </div>
    );
  }
}

export default MultipleChoicePictureBlock;
