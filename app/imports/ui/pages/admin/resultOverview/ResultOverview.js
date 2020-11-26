import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import ResultTable from '../../../components/admin/resultTable/ResultTable';
import FilterBar from '../../../components/general/filterBar/FilterBar';
import './style.scss';

class ResultOverview extends Component {
  constructor(props) {
    super(props);

    this.sort = this.sort.bind(this);

    this.state = {
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
    };
  }

  componentDidMount() {
    this.props.updateTitleType(true);
    this.props.updateTitle('Resultaten');
  }

  sort(event) {
    this.setState({
      order: parseInt(event.target.value),
      orderBy: event.target.name,
    });
  }

  render() {
    return (
      <div className="layout layout--1-col">
        <div className="block block--admin layout layout--3-col">
          <FilterBar
            name={this.state.name}
            onChange={this.sort}
          />
        </div>
        <ResultTable sort={{ orderBy: this.state.orderBy, order: this.state.order }} />
      </div>
    );
  }
}

export default ResultOverview;
