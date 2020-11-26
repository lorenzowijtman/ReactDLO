import React, { Component } from 'react';

import './style.scss';

const SearchBar = props => (
  <div className="search-bar">
    <input type="text" onChange={props.eventHandler} value={props.value} placeholder="Zoeken" />
  </div>
);

export default SearchBar;
