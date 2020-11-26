import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import onClickOutside from "react-onclickoutside";
import { Link } from 'react-router-dom';


class AccountWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'admin',
      profile: {
        firstname: 'joren',
        lastname: 'rothman',
      },
      dropdownIsOpen: false,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const {username} = Meteor.user();

    this.setState({
        username: username
    });
  }

  toggleDropdown() {
    const { dropdownIsOpen } = this.state;
    this.setState({
      dropdownIsOpen: !dropdownIsOpen,
    });
  }

  handleClickOutside(evt) {
    this.setState({
        dropdownIsOpen: false,
    })
  }

  logout() {
    Meteor.logout();
    this.props.history.push('/');
  }

  render() {
    const { username, profile, dropdownIsOpen } = this.state;
    const {pathname} = this.props.location;
    const isAdmin = pathname.split('/')[1] === 'admin';

    return (
      <div className={`account-widget ${isAdmin ? 'account-widget--admin' : 'account-widget--student'}`} onBlur={this.toggleDropdown} onClick={this.toggleDropdown} style={this.props.style}>
        <p className="account-widget__welcome">Welkom, {username}</p>
        <button className="button button--arrow-down"></button>
        {dropdownIsOpen && (
        <div className="account-widget__dropdown">
              {/* <p className="account-widget__link">> Instellingen</p> */}
              <Link className="account-widget__link" to={isAdmin ? '/admin/instellingen' : '/student/instellingen'}>> Instellingen</Link>
              <button to={isAdmin ? '/admin/instellingen' : '/student/instellingen'} className="button button--primary" onClick={this.logout}>loguit</button>
            </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(AccountWidget);
