import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactPlayer from 'react-player';

import './style.scss';

class VideoBox extends Component {
  constructor(props) {
    super(props);

    if (this.props.value.length <= 0) {
      this.state = {
        answers: {
          text: '',
          geturl: '',
        },
      };
    } else {
      this.state = {
        answers: this.props.value,
      };
    }

    this.inputHandler = this.inputHandler.bind(this);
    this.getVideoUrl = this.getVideoUrl.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange(this.state.answers);
    }
  }

  getVideoUrl(e) {
    const { value } = e.target;
    const { text } = this.state.answers;

    this.setState({
      answers: {
        text,
        geturl: value,
      },
    });
  }

  inputHandler(e) {
    const { value } = e.target;
    const { geturl } = this.state.answers;

    this.setState({
      answers: {
        text: value,
        geturl,
      },
    });
  }

  render() {
    return (
      <div className="videobox-container">
        Plak hier de URL:{' '}
        <input
          className="video-input"
          type="text"
          value={this.state.answers.geturl}
          onChange={this.getVideoUrl}
        />
        <p>Vraag:</p>
        <textarea
          className="textarea-question"
          onChange={this.inputHandler}
          value={this.state.answers.text}
        />
        {this.state.answers.geturl.length > 0 &&
          <ReactPlayer className="react-player" url={this.state.answers.geturl} controls loop />
        }
      </div>
    );
  }
}
export default VideoBox;
