import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../../../components/student/searchBar/SearchBar';
import FilterBar from '../../../components/general/filterBar/FilterBar';
import CardItem from '../../../components/student/cardItem/CardItem';

import './style.scss';

class ResultOverview extends Component {
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
  }

  render() {
    return (
      <div className="result-overview">
        {/* <SearchBar eventHandler={this.eventHandler} value={this.state.search} /> */}
        <div className="result-overview-container">
          <FilterBar
            difficulty={this.state.difficulty}
            name={this.state.name}
            onChange={this.sort}
          />
          <CardItem sort={{ orderBy: this.state.orderBy, order: this.state.order }} />
        </div>
      </div>
    );
  }
}

ResultOverview.propTypes = {
  search: PropTypes.string,
};

export default ResultOverview;
