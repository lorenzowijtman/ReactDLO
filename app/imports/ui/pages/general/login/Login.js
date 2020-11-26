import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import validate from 'validate.js';
import constraints from '../../../../util/validate/login/constraints';

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
      console.log(this.state.alert);
      const { message, type } = this.state.alert;
      toast(message, { type });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    const formError = this.validateFields();

    if (!formError) {
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          // console.log("asdasd");
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
              message: '',
              type: toast.TYPE.ERROR,
              status: false,
            },
          });
          const user = Meteor.user();
          if (user.profile.isAdmin) {
            this.props.history.push('/admin');
          } else {
            this.props.history.push('/student');
          }
        }
      });
    }
  }

  inputHandler(event) {
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

    const { email, password } = this.state;

    const validateResult = validate(
      {
        email,
        password,
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

  render() {
    return (
      <Fragment>
      <div className="oba-background"/>
      <div className="auth-container">
        <div className="block block--admin block--max-400">
          <h1 className="block block__title">Inloggen</h1>
          <div className="block block--admin block--darken">
            <p className="login-text">E-mail address: </p>

            <input
              type="email"
              className="input input--text"
              id="emailInput"
              name="email"
              value={this.state.email}
              onChange={this.inputHandler}
            />

            <p className="login-text">Password: </p>
            <input
              type="password"
              className="input input--text"
              id="passwordInput"
              name="password"
              value={this.state.password}
              onChange={this.inputHandler}
            />
            <div className="" style={{ marginTop: '20px' }}>
              <input
                type="submit"
                onClick={this.onFormSubmit}
                className="button button--primary"
                value="Inloggen"
              />
              {/* <Link to="/register" style={{float: 'right'}} className="paragraph paragraph-smaller">
              Wachtwoord vergeten?
            </Link> */}
            </div>
          </div>
        </div>
        <div className="block block--admin block--max-400">
          <h1 className="block__title">Nieuw?</h1>
          <div className="block block--admin block--darken">
            <p>Heb je nog geen account? Klik op de link hier beneden om je te registreren.</p>
            <form method="get" action="/register">
              <div className="center-div">
                <Link to="/register" className="button button--secondary">Registreren</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Login;
