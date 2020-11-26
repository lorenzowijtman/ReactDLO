import React, { Component } from 'react';
import resizeTextarea from '../../../../util/resizeTextarea/resizeTextarea';

class TextDescription extends Component {
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
    resizeTextarea(e);
    
    const { value } = e.target;

    this.setState({
      answers: [value],
    });
  }

  render() {
    return <textarea className="input input--textarea" onChange={this.inputHandler} value={this.state.answers} />;
  }
}
export default TextDescription;
