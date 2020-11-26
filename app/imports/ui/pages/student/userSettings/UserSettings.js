import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { toast } from 'react-toastify';
import validate from 'validate.js';
import constraints from '../../../../util/validate/updateUserSettings/constraints';

import './style.scss';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: Meteor.user().username,
      email: Meteor.user().emails[0].address,
      firstname: Meteor.user().profile.firstname,
      lastname: Meteor.user().profile.lastname,
      oldpassword: '',
      password: '',
      passwordRepeat: '',
      alert: {
        message: '',
        type: toast.TYPE.INFO,
        status: false,
      },
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.alert !== this.state.alert && this.state.alert.status !== false) {
      // console.log(this.state.alert);
      const { message, type } = this.state.alert;
      toast(message, { type });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const {username, email, firstname, lastname, oldpassword, password, passwordRepeat } = this.state;

    const formError = this.validateFields();

    if (!formError) {
      if (formError) {
        this.setState({
          alert: {
            message: error.reason,
            type: toast.TYPE.ERROR,
            status: true,
          },
        });
      } else {
        if (oldpassword !== '' && password !== '' && passwordRepeat !== '') {
          if (password === passwordRepeat) {
            Meteor.call('changeUserPassword', Meteor.userId(), password);
            this.setState({
              alert: {
                message: 'Wachtwoord gewijzigd! (Je wordt over 3 seconden uitgelogd.)',
                type: toast.TYPE.SUCCESS,
                status: true,
              },
            });

            setTimeout(() => {
              this.props.history.push('/');
            }, 3000);
          } else {
            this.setState({
              alert: {
                message: 'Wachtwoorden komen niet overeen!',
                type: toast.TYPE.ERROR,
                status: true,
              },
            });
          }
        } else {
          Meteor.call('userUpdate', Meteor.userId(), username, email, firstname, lastname);
          this.setState({
            alert: {
              message: 'Gegevens succesvol gewijzigd! (Je wordt over 3 seconden doorgestuurd)',
              type: toast.TYPE.SUCCESS,
              status: true,
            },
          });

          setTimeout(() => {
            this.props.history.push('/student/lessen');
          }, 3000);
        }
        return true;
      }
    }
  }

  inputHandler(event) {
    // Get input all input values from the form
    const inputname = event.target.name;
    const inputvalue = event.target.value;

    this.setState({
      [inputname]: inputvalue,
    });
  }

  validateFields() {
    validate.options = {
      fullMessages: false,
    };

    const {
      username,
      email,
      firstname,
      lastname,
    } = this.state;

    const validateResult = validate(
      {
        username,
        email,
        firstname,
        lastname,
      },
      constraints,
    );

    if (validateResult) {
      const message = validateResult[Object.keys(validateResult)[0]][0];

      this.setState({
        alert: {
          message,
          type: toast.TYPE.ERROR,
          status: true,
        },
      });

      return true;
    }

    return false;
  }

  onDeleteUser() {
    if (confirm('Weet je het zeker?')) {
      Meteor.call('onDeleteUserAccount', Meteor.userId());
      this.setState({
        alert: {
          message: 'Account is permanent verwijderd! Een ogenblik geduld...',
          type: toast.TYPE.SUCCESS,
          status: true,
        },
      });

      setTimeout(() => {
        this.props.history.push('/');
      }, 3000);
    } else {
      this.setState({
        alert: {
          message: 'Account verwijderen geannuleerd!',
          type: toast.TYPE.INFO,
          status: true,
        },
      });
    }
  }

  render() {
    return (
      <div className="user-settings-container">
        <div className="block block--admin">
          <h3 className="block__title">Gegevens wijzigen</h3>
          <div className="block block--admin block--darken">
            <div className="block layout layout--2-col">
              <div className="block layout layout--1-col">
                <p>Gebruikersnaam</p>
                <input
                  type="text"
                  name="username"
                  className="input input--text"
                  id="usernameInput"
                  value={this.state.username}
                  onChange={this.inputHandler}
                />
                <p>Voornaam</p>
                <input
                  type="text"
                  name="firstname"
                  className="input input--text"
                  id="firstnameInput"
                  value={this.state.firstname}
                  onChange={this.inputHandler}
                />
                <p>Achternaam</p>
                <input
                  type="text"
                  name="lastname"
                  className="input input--text"
                  id="lastnameInput"
                  value={this.state.lastname}
                  onChange={this.inputHandler}
                />
                <p><i>Velden met * zijn verplicht!</i></p>
                <input
                  type="text"
                  disabled="true"
                  name="lastname"
                  className="input input--text hide-input"
                  id="hiddenInput"
                />
              </div>
              <div className="block layout layout--1-col">
                <p>Emailadres</p>
                <input
                  type="email"
                  name="email"
                  className="input input--text"
                  id="emailInput"
                  value={this.state.email}
                  onChange={this.inputHandler}
                />
                <p>Oud wachtwoord</p>
                <input
                  type="password"
                  name="oldpassword"
                  className="input input--text"
                  id="oldpasswordInput"
                  value={this.state.oldpassword}
                  onChange={this.inputHandler}
                />
                <p>Nieuw wachtwoord</p>
                <input
                  type="password"
                  name="password"
                  className="input input--text"
                  id="passwordInput"
                  value={this.state.password}
                  onChange={this.inputHandler}
                />
                <p>Herhaal nieuw wachtwoord</p>
                <input
                  type="password"
                  name="passwordRepeat"
                  className="input input--text"
                  id="passwordRepeatInput"
                  value={this.state.passwordRepeat}
                  onChange={this.inputHandler}
                />
              </div>
              <input
                type="submit"
                className="button button--secondary btn-cursor"
                value="Verwijder account"
                style={{ marginTop: '30px' }}
                onClick={this.onDeleteUser}
              />
              <input
                type="submit"
                className="button button--primary full-width green btn-cursor"
                value="Wijzigen"
                style={{ marginTop: '30px' }}
                onClick={this.onFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettings;
