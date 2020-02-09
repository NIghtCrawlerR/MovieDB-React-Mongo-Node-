import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setInStorage } from '../../../utils/storage';

import { login, register } from '../../../actions';
import Loader from '../../common/Loader';
import PageTitle from '../../common/PageTitle';
import Input from '../../common/Input';
import Head from '../../common/Head';

import { If } from '../../helpers/conditional-statement';

import './index.scss';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
      loading: false,
    };
  }

  login = user => {
    const { login, updateUser, history } = this.props;

    login(user)
      .then(data => {
        if (data.success) {
          setInStorage('token', data.token);
          updateUser();
          history.push('/home');
        }
      })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      loginForm,
      register,
    } = this.props;

    const { email, password, passwordConfirm } = this.state;

    const action = loginForm ? 'login' : 'register';

    if (action === 'login') {
      this.login({ email, password });
    } else {
      register({ email, password, passwordConfirm })
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
      emailErrorMessage,
      passwordErrorMessage,
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
            errorMessage={<small className="text-red">{emailErrorMessage}</small>}
          />
          <br />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.changeHandler}
            required
            errorMessage={<small className="text-red">{passwordErrorMessage}</small>}
          />
          <br />
          {registerForm
            ? (
              <Input
                label="Confirm Password"
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={this.changeHandler}
                required
                errorMessage={<small className="text-red">{passwordErrorMessage}</small>}
              />
            ) : null}

          <If condition={errorMessage}>
            <p className="info-message info-message--error">{errorMessage}</p>
          </If>
          <If condition={successMessage}>
            <p className="info-message info-message--success">{successMessage}</p>
          </If>

          <input type="submit" className="btn btn-info mt-3" value={registerForm ? 'Register' : 'Log in'} />
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
  }
}

export default connect(mapStateToProps, {
  login,
  register,
})(AuthForm);
