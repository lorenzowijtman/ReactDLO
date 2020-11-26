import React, { Component } from 'react';

import './style.scss';

class Alert extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      isShowAlert: false,
    };

    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowAlert: nextProps.isShowAlert,
    });
  }

  classes() {
    const { isShowAlert } = this.state;

    let classes = 'alert';

    if (isShowAlert) {
      classes += ' is-visible';
    }

    return classes;
  }

  close() {
    this.setState({
      isShowAlert: false,
    });

    this.props.onClose();
  }

  render() {
    const { message, type } = this.props;
    let typeClass;

    switch (type) {
      case 'warning':
        typeClass = 'warning';
        break;

      case 'danger':
        typeClass = 'danger';
        break;

      case 'success':
        typeClass = 'success';
        break;

      default:
        typeClass = 'notice';
        break;
    }

    return (
      <div className={`${this.classes()} ${typeClass}`}>
        <p className="alert-text">{message}</p>
        <button className="alert-close" onClick={this.close} />
      </div>
    );
  }
}

export default Alert;
