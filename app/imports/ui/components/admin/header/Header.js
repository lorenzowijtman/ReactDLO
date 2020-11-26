import React from 'react';
import './header.scss';
import '../../general/accountWidget/AccountWidget';
import AccountWidget from '../../general/accountWidget/AccountWidget';

const Header = (props) => {
  return (
  <header className="header header--admin header--bg-color--white">
      {props.isTitle ? (
        <h1 className="title">{props.title}</h1>
      ) : (
        <input
          className="input input--header"
          type="text"
          placeholder="Voer hier uw titel in"
          value={props.title}
          onChange={props.handleTitleUpdate}
        />
      )}
      <AccountWidget {...props} />
  </header>
    );
};

export default Header;
