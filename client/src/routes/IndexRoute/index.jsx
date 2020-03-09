import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

// Routes
import Auth from 'routes/Auth';
import Homepage from 'routes/Homepage';
import Catalog from 'routes/Catalog';
import Wishlist from 'routes/Wishlist';
import PersonPage from 'routes/PersonPage';
import ItemFull from 'routes/ItemFull';
import Category from 'routes/Category';
import Collection from 'routes/Collection';
import BugReport from 'routes/BugReport';

// Components
import Header from 'components/partials/Header';
import Sidebar from 'components/partials/Sidebar';
import Footer from 'components/partials/Footer';
import Modal from 'components/Modal';
import Message from 'components/StatusMessage';
import Loader from 'components/Loader';
import ErrorBoundary from 'components/ErrorBoundary';
import { If } from 'components/helpers/conditional-statement';

// Actions
import {
  verifyUser,
  logout,
  getGenres,
  getCollections
} from 'actions';

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.showMsg = this.showMsg.bind(this);

    this.state = {
      showMsg: false,
      message: {
        status: 'warning',
        text: 'message text',
        accessError: false,
      },
    };
  }

  componentDidMount() {
    const { getGenres, getCollections } = this.props;

    getGenres('movie');
    getCollections();
    this.updateUser();
  }

  hideMsg = () => {
    this.setState({ showMsg: false });
  };

  showMsg = (status, text, accessError, timeout) => {
    this.setState({
      showMsg: true,
      message: {
        status,
        text,
        accessError,
      },
    });

    setTimeout(() => {
      this.setState({ showMsg: false });
    }, timeout || 5000);
  }

  updateUser() {
    const { verifyUser } = this.props;
    const token = localStorage.getItem('token');

    if (!token) return false;

    // verify user
    verifyUser(token);
  }

  logout(e) {
    e.preventDefault();

    const { logout } = this.props;

    logout(localStorage.getItem('token'));
  }

  render() {
    const {
      history,
      user,
      settings: { showLoader },
      collections,
    } = this.props;

    const { showMsg, message } = this.state;

    if (history.location.pathname === '/') {
      return <Redirect to="/home" />;
    }
    if (showLoader) {
      return <Loader />;
    }

    return (
      <div className="app">
        <Sidebar isLogin={user.isLogin} />
        <div className="main-content">
          <ErrorBoundary>
            <Header {...this.props} onClick={this.logout} />
          </ErrorBoundary>

          <Route path="/details/:page/:id" render={(props) => (<ErrorBoundary><ItemFull {...props} /></ErrorBoundary>)} />
          <Route path="/home" render={(props) => (
            <ErrorBoundary>
              <Homepage {...props} collections={collections} />
            </ErrorBoundary>
          )} />
          <Route path="/catalog/:page" render={(props) => (<ErrorBoundary><Catalog {...props} /></ErrorBoundary>)} />
          <Route path="/collection/:category/:alias" render={(props) => (<ErrorBoundary><Collection {...props} /></ErrorBoundary>)} />
          <Route path="/collections/:category" render={(props) => (<ErrorBoundary><Category {...props} userData={user} showMsg={this.showMsg} /></ErrorBoundary>)} />
          <Route path="/wishlist" render={(props) => (<ErrorBoundary><Wishlist {...props} /></ErrorBoundary>)} />
          <Route path="/search/:page/:role/:id" render={(props) => (<ErrorBoundary><PersonPage {...props} /></ErrorBoundary>)} />
          <Route path="/login" render={() => (<ErrorBoundary><Auth loginForm /></ErrorBoundary>)} />
          <Route path="/register" render={() => (<ErrorBoundary><Auth registerForm /></ErrorBoundary>)} />
          <Route path="/bug-report" render={(props) => (<BugReport {...props} showMsg={this.showMsg} />)} />

          <If condition={showMsg}>
            <Message
              message={message}
              close={this.hideMsg}
            />
          </If>

          <ErrorBoundary>
            <Modal />
          </ErrorBoundary>

          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  user,
  settings,
  collections: { collections, genres },
}) {
  return {
    user,
    settings,
    collections,
    genres,
  }
}

export default connect(mapStateToProps, {
  verifyUser,
  logout,
  getGenres,
  getCollections,
})(RootComponent);
