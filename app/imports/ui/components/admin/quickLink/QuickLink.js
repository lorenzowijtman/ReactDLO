import React from 'react';

import './style.scss';

const QuickLink = props => (
  <div className="quick-link media media--stats block--admin">
    <div className="media--stats__inner-container">
      <div className="icon-container media--stats__icon">
        <div className="icon" />
      </div>
      <div className="text-container media--stats__text">
        <span>{props.number}</span>
        <span>{props.text}</span>
      </div>
    </div>
  </div>
);

export default QuickLink;
