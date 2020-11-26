import React from 'react';

import './style.scss';

const AssignmentSelector = (props) => {
  const checked = (id) => {
    const selectedAssignment = props.userSelected;
    if (selectedAssignment.findIndex(item => item._id === id) === -1) {
      return false;
    }

    return true;
  };

  const renderItems = props.assignments.map((assignment) => {
    const checkedBool = checked(assignment._id);
    return (
      <li key={assignment._id}>
        <label>
          <input
            type="checkbox"
            name="assignment"
            defaultChecked={checkedBool}
            onChange={props.onSelect}
            value={assignment._id}
          />
          <span>{assignment.name}</span>
        </label>
      </li>
    );
  });

  const modal = !props.isHidden ? (
    <div className="assignment-selector-modal">
      <div className="overlay" />
      <div className="modal">
        <h3>Selecteer opdrachten</h3>
        <ul>{renderItems}</ul>
        <button>Toevoegen</button>
        <button onClick={props.onClose}>Sluiten</button>
      </div>
    </div>
  ) : null;

  return modal;
};

export default AssignmentSelector;
