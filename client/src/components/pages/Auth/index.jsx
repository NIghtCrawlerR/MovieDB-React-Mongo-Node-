import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setInStorage } from '../../../utils/storage';

import { login } from '../../../actions';
import Loader from '../../common/Loader';
import PageTitle from '../../common/PageTitle';
import Input from '../../common/Input';
import Head from '../../common/Head';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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

  onSubmit(e) {
    e.preventDefault();

    const {
      loginForm,
      history,
      login,
      updateUser,
    } = this.props;

    const { email, password } = this.state;

    const action = loginForm ? 'login' : 'register';
    this.setState({ loading: true });
    if (action === 'login') {
      login({ email, password })
        .then((res) => {
          if (res.data.success) {
            setInStorage('token', res.data.token);
            updateUser();
            history.push('/home');
          } else {
            this.setState({ errorMessage: res.data.message });
          }
          this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ errorMessage: err });
        });
    } else {
      axios.post('/api/users/register', { email, password })
        .then((res) => {
          this.setState({ loading: false });
          if (res.data.success) {
            history.push('/login');
          } else {
            this.setState({ errorMessage: res.data.message });
          }
        })
        .catch((err) => {
          this.setState({ errorMessage: err });
        });
    }
  }

  changeHandler(e) {
    const { name } = e.target;
    const val = e.target.value;

    const newState = {};
    newState[name] = val;

    this.setState(newState);
  }

  render() {
    const { registerForm, loginForm } = this.props;
    const {
      loading,
      email,
      password,
      emailErrorMessage,
      passwordErrorMessage,
      passwordConfirm,
      errorMessage,
    } = this.state;

    return (
      <div className="form__wrap content">
        <Head title={`Fiction finder - ${registerForm ? 'Registration' : 'Login'}`} />
        {loading ? <Loader overlay /> : null}
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

          <div>
            <small className="text-red">{errorMessage}</small>
          </div>


          <input type="submit" className="btn btn-purple mt-3" value={registerForm ? 'Register' : 'Log in'} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  login,
})(AuthForm);
