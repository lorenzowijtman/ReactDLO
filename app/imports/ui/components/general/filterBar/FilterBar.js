import React, { Component } from 'react';

import './style.scss';

class FilterBar extends Component {

  constructor(props) {
    super(props);
  }
  // console.log(this.props.difficulty);


  render() {
    const renderDifficulty =
      this.props.difficulty !== undefined ? (
        <li>
          <select defaultValue="default">
            <option value="default">Niveau</option>
            {this.props.difficulty.map(item => (
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </li>
      ) : null;

    const renderCategory =
      this.props.category !== undefined ? (
        <li>
          <select defaultValue="default">
            <option value="default">Categorie</option>
            {this.props.category.map(item => (
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </li>
      ) : null;

      const renderPercentage =
      this.props.percentage !== undefined ? (
        <li>
          <select defaultValue="default">
            <option value="default">Resultaat</option>
            {this.props.percentage.map(item => (
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </li>
      ) : null;

    const renderCourse =
      this.props.course !== undefined ? (
        <li>
          <select defaultValue="default">
            <option value="default">Cursus</option>
            {this.props.course.map(item => (
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </li>
      ) : null;

    const renderName =
      this.props.name !== undefined ? (
        <li>
          <select name="name" defaultValue="0" onChange={(e) => { this.props.onChange(e); }}>
            <option value="0">Naam</option>
            {this.props.name.map(item => (
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </li>
      ) : null;


    return (
      <div className="filter-bar">
        <ul>
          <li>Filteren op</li>
          {renderDifficulty}
          {renderCategory}
          {renderPercentage}
          {renderCourse}
          {renderName}
        </ul>
      </div>
    );
  }
}

export default FilterBar;
