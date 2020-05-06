import React, { Component } from 'react';

import { connect } from 'react-redux';

import PageTitle from 'components/PageTitle';
import Head from 'components/Head';
import { Button, Loader, Input } from 'components/UI';

import { If } from 'components/helpers/ConditionalRender';

import { login, register } from 'actions';

import './index.scss';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    errorMessage: '',
    loading: false,
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      loginForm,
      register,
      login,
    } = this.props;

    const { email, password, passwordConfirm } = this.state;

    const action = loginForm ? 'login' : 'register';

    if (action === 'login') {
      login({ email, password });
    } else {
      register({ email, password, passwordConfirm });
    }
  }

  changeHandler = (e) => {
    const { name } = e.target;
    const val = e.target.value;

    const newState = {};
    newState[name] = val;

    this.setState(newState);
  }

  render() {
    const {
      registerForm,
      loginForm,
      errorMessage,
      successMessage,
      showLoader,
    } = this.props;

    const {
      email,
      password,
      passwordConfirm,
    } = this.state;

    return (
      <div className="form__wrap content">
        <Head title={`Fiction finder - ${registerForm ? 'Registration' : 'Login'}`} />
        {showLoader ? <Loader overlay /> : null}
        <PageTitle title={loginForm ? 'Login' : 'Register'} />

        <br />
        <form onSubmit={this.onSubmit}>
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={this.changeHandler}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.changeHandler}
            required
          />
          {registerForm
            ? (
              <Input
                label="Confirm Password"
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={this.changeHandler}
                required
              />
            ) : null}

          <If condition={errorMessage}>
            <p className="info-message info-message--error">{errorMessage}</p>
          </If>
          <If condition={successMessage}>
            <p className="info-message info-message--success">{successMessage}</p>
          </If>
          <br />
          <Button type="submit">
            {registerForm ? 'Register' : 'Log in'}
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({
  user: {
    errorMessage,
    successMessage,
  },
  settings: { showLoader },
}) {
  return {
    errorMessage,
    successMessage,
    showLoader,
  };
}

export default connect(mapStateToProps, {
  login,
  register,
})(AuthForm);
