import React, { Component } from 'react';

class OpenQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: this.props.value,
    };

    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange(this.state.answers);
    }
  }

  inputHandler(e) {
    const { value } = e.target;

    this.setState({
      answers: [value],
    });
  }

  render() {
    return <input type="text" className="input input--text" onChange={this.inputHandler} value={this.state.answers} />;
  }
}
export default OpenQuestion;
