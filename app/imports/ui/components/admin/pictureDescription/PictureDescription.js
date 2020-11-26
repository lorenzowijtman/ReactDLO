import React, { Component } from 'react';

import UploadManager from '../uploadManager/UploadManager';

import './style.scss';

class PictureDescription extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.value);

    if (this.props.value.length <= 0) {
      console.log('test');
      this.state = {
        data: {
          img: '',
          text: '',
        },
        show: false,
      };
    } else {
      this.state = {
        data: this.props.value,
        show: false,
      };
    }

    this.inputHandler = this.inputHandler.bind(this);
    this.uploadManagerClose = this.uploadManagerClose.bind(this);
    this.openUploadManager = this.openUploadManager.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange(this.state.data);
    }
  }

  inputHandler(e) {
    const { value } = e.target;
    const { img } = this.state.data;

    this.setState({
      data: {
        text: value,
        img,
      },
    });
  }

  uploadManagerClose(url) {
    const { text } = this.state.data;

    if (url === '') {
      return;
    }
    this.setState({
      show: false,
      data: {
        img: url,
        text,
      },
    });
  }

  openUploadManager(e) {
    e.preventDefault();
    this.setState({
      show: true,
    });
  }

  render() {
    return (
      <div className="picture-description">
        <UploadManager show={this.state.show} onClose={this.uploadManagerClose} />
        <img src={this.state.data.img} />
        <button className="button button--primary" onClick={this.openUploadManager}>Selecteer afbeelding</button>
        <input
          className="input input--text"
          placeholder="Vraag..."
          type="text"
          value={this.state.data.text}
          onChange={this.inputHandler}
        />
      </div>
    );
  }
}
export default PictureDescription;
