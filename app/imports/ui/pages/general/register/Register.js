import React, { Component, Fragment } from 'react';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validate from 'validate.js';
import constraints from '../../../../util/validate/register/constraints';

import './register.scss';
import Alert from '../../../components/general/alert/Alert';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
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
    const { username, email, password } = this.state;

    const formError = this.validateFields();

    if (!formError) {
      const profile = this.createProfile();

      Accounts.createUser(
        {
          username,
          email,
          password,
          profile,
        },
        (err) => {
          // TODO translate error messages

          if (err) {
            this.setState({
              alert: {
                message: error.reason,
                type: toast.TYPE.ERROR,
                status: true,
              },
            });
          } else {
            this.setState({
              alert: {
                message: 'Account is aangemaakt! (Je wordt over 6 seconden doorgestuurd)',
                type: toast.TYPE.SUCCESS,
                status: true,
              },
            });


            setTimeout(() => {
              this.props.history.push('/');
            }, 6000);
          }
        },
      );
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
      password,
      passwordRepeat,
    } = this.state;

    const validateResult = validate(
      {
        username,
        email,
        firstname,
        lastname,
        password,
        passwordRepeat,
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

    this.setState({
      alert: {
        message: 'Registratie gelukt',
        type: toast.TYPE.SUCCESS,
        status: false,
      },
    });

    return false;
  }

  createProfile() {
    const { firstname, lastname } = this.state;

    return {
      firstname,
      lastname,
    };
  }

  render() {
    return (
      <Fragment>
      <div className="oba-background"/>
      <div className="register-page">
        <div className="block block--admin block--max-400">
          <h1 className="block__title">Heb je al een account?</h1>
          <div className="block block--admin block--darken">
            <div className="center-div">
              <Link to="/" className="button button--secondary">Naar de inlogpagina</Link>
            </div>
          </div>
        </div>

        <div className="block block--admin block--max-400">
          <h1 className="block__title">Registreren</h1>
          <div className="block block--admin block--darken">
            <p className="register-text">Gebruikersnaam</p>
            <input
              type="text"
              name="username"
              className="input input--text"
              id="usernameInput"
              value={this.state.username}
              onChange={this.inputHandler}
            />

            <p className="register-text">Emailadres</p>
            <input
              type="email"
              name="email"
              className="input input--text"
              id="emailInput"
              value={this.state.email}
              onChange={this.inputHandler}
            />

            <p className="register-text">Voornaam</p>
            <input
              type="text"
              name="firstname"
              className="input input--text"
              id="firstnameInput"
              value={this.state.firstname}
              onChange={this.inputHandler}
            />

            <p className="register-text">Achternaam</p>
            <input
              type="text"
              name="lastname"
              className="input input--text"
              id="lastnameInput"
              value={this.state.lastname}
              onChange={this.inputHandler}
            />

            <p className="register-text">Wachtwoord</p>
            <input
              type="password"
              name="password"
              className="input input--text"
              id="passwordInput"
              value={this.state.password}
              onChange={this.inputHandler}
            />

            <p className="register-text">Herhaal wachtwoord</p>
            <input
              type="password"
              name="passwordRepeat"
              className="input input--text"
              id="passwordRepeatInput"
              value={this.state.passwordRepeat}
              onChange={this.inputHandler}
            />

            <input
              type="submit"
              style={{ marginTop: '30px' }}
              className="button button--primary"
              value="Registreer"
              onClick={this.onFormSubmit}
            />
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Register;
