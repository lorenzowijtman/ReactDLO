import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterBar from '../../../components/general/filterBar/FilterBar';
import CardItem from '../../../components/student/cardItem/CardItem';

import './style.scss';

class AssignmentOverview extends Component {
  constructor(props) {
    super(props);

    this.eventHandler = this.eventHandler.bind(this);
    this.sort = this.sort.bind(this);

    this.state = {
      difficulty: [
        {
          name: 'Makkelijk',
          level: 1,
        },
        {
          name: 'Normaal',
          level: 2,
        },
        {
          name: 'Moeilijk',
          level: 3,
        },
      ],
      name: [
        {
          name: 'A-Z',
          value: 1,
        },
        {
          name: 'Z-A',
          value: -1,
        },
      ],
      search: '',
    };
    //   console.log(this.state.name);
    console.log(this.state.name);
  }

  eventHandler(e) {
    this.setState({
      search: e.target.value,
    });
  }

  sort(event) {
    this.setState({
      order: parseInt(event.target.value),
      orderBy: event.target.name,
    });
    // console.log(event.target.value);
  }

  render() {
    return (
      <div className="assignment-overview">
        {/* <SearchBar eventHandler={this.eventHandler} value={this.state.search} /> */}
        <div className="assignment-overview-container">
          <FilterBar
            difficulty={this.state.difficulty}
            name={this.state.name}
            onChange={this.sort}
          />
          <CardItem sort={{ orderBy: this.state.orderBy, order: this.state.order }} pagetype="lessons" />
        </div>
      </div>
    );
  }
}

AssignmentOverview.propTypes = {
  search: PropTypes.string,
};

export default AssignmentOverview;
