import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import history from '../history';
import Homepage from './pages/Homepage';
import Catalog from './pages/Catalog';
import CollectionFull from './pages/CollectionFull';
import CollectionsList from './pages/CollectionsList';
import Wishlist from './pages/Wishlist';
import BugReport from './pages/BugReport';
import Auth from './pages/Auth';
import ItemFull from './pages/ItemFull';
import Search from './pages/Search';

import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import Footer from './partials/Footer';

import Message from './StatusMessage';

import store from '../store';
import { getFromStorage, removeFromStorage } from '../utils/storage';

import {
  verifyUser,
  logout,
  userGet,
  getGenres,
  getCollections
} from '../actions';


class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      showMsg: false,
      message: {
        status: 'warning',
        text: 'message text',
        accessError: false,
      },
      loading: true,
    };
  }

  componentDidMount() {
    const { getGenres, getCollections } = this.props;

    getGenres('movie');
    getCollections();
    this.updateUser();
  }

  hideMsg() {
    this.setState({ showMsg: false });
  }

  showMsg(status, text, accessError, timeout) {
    this.setState({
      showMsg: true,
      message: {
        status,
        text,
        accessError,
      },
    });
    setTimeout(() => {
      this.setState({
        showMsg: false,
      });
    }, timeout || 5000);
  }

  sendRequest() {
    axios.get('/api/users/access/get', { params: { email: this.props.user.data.email } })
      .then((res) => {
        this.showMsg(res.data.status, res.data.text);
      })
      .catch((err) => {
        this.showMsg('error', 'Error: Something went wrong. Try to login again');
      });
  }

  updateUser() {
    const token = getFromStorage('token');
    if (!token) {
      this.setState({ loading: false });
      return !1;
    }

    // verify user
    this.props.verifyUser(token)
      .then((user) => {
        if (!user.data.success) throw new Error('err');
      })
      .then(() => {
        this.props.userGet(store.getState().user.userId) // get user data
          .then(() => {
            console.log('get user');
            this.setState({ loading: false });
          })
          .catch((err) => {
            console.log('get user error');
            this.showMsg('error', `Error: ${err}`);
          });
      })
      .catch((err) => {
        this.showMsg('error', 'Error: Server error. Unable to get user. Try to login again');
        this.setState({ loading: false });
      });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout(getFromStorage('token'))
      .then((res) => {
        removeFromStorage('token');
        history.push('/home');
      });
  }

  render() {
    const { history, user } = this.props;
    const { loading } = this.state;

    if (history.location.pathname === '/') {
      return <Redirect to="/home" />;
    }
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="app">
        <div className="sidebar__wrap p-0">
          <Sidebar isLogin={user.isLogin} />
        </div>
        <div className="main-content p-0">
          <Header {...this.props} onClick={this.logout} />
          <Route path="/details/:page/:id" render={(props) => (<ItemFull {...props} />)} />
          <Route path="/home" render={(props) => (<Homepage {...props} />)} />
          <Route path="/catalog/:page" render={(props) => (<Catalog {...props} />)} />
          <Route path="/collection/:category/:alias" render={(props) => (<CollectionFull {...props} />)} />
          <Route path="/collections/:category" render={(props) => (<CollectionsList {...props} userData={user.data} showMsg={this.showMsg.bind(this)} />)} />
          <Route path="/wishlist" render={(props) => (<Wishlist {...props} />)} />
          <Route path="/search/:page/:role/:id" render={(props) => (<Search {...props} />)} />
          <Route path="/login" render={(props) => (<Auth {...props} loginForm updateUser={this.updateUser} showMsg={this.showMsg.bind(this)} />)} />
          <Route path="/register" render={(props) => (<Auth {...props} registerForm showMsg={this.showMsg.bind(this)} />)} />
          <Route path="/bug-report" render={(props) => (<BugReport {...props} showMsg={this.showMsg.bind(this)} />)} />

          {
            this.state.showMsg
              ? (
                <Message
                  message={this.state.message}
                  close={this.hideMsg.bind(this)}
                  sendRequest={this.sendRequest.bind(this)}
                />
              )
              : null
          }

          <Footer />
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  genres: state.collections.genres,
});

export default connect(mapStateToProps, {
  verifyUser,
  logout,
  userGet,
  getGenres,
  getCollections,
})(RootComponent);
