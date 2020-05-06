import React from 'react';
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
import Route from 'components/Route';
import { Loader } from 'components/UI';
import Header from 'components/partials/Header';
import Sidebar from 'components/partials/Sidebar';
import Footer from 'components/partials/Footer';
import Modal from 'components/Modal';
import ErrorBoundary from 'components/ErrorBoundary';

// Actions
import {
  verifyUser,
  logout,
  getGenres,
  getCollections,
} from 'actions';

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.token = localStorage.getItem('token');
  }

  componentDidMount() {
    const { getGenres, getCollections } = this.props;

    getGenres('movie');
    getCollections();
    this.verifyUser();
  }

  verifyUser = () => {
    if (!this.token) return false;

    const { verifyUser } = this.props;
    verifyUser(this.token);
  }

  logout = () => {
    const { logout } = this.props;
    logout(this.token);
  }

  render() {
    const {
      history: { location: { pathname } },
      user,
      settings: { showLoader },
      collections,
    } = this.props;

    if (pathname === '/') {
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
            <Header user={user} logout={this.logout} />
          </ErrorBoundary>

          <Route path="/details/:page/:id">
            <ErrorBoundary>
              <ItemFull />
            </ErrorBoundary>
          </Route>

          <Route path="/home">
            <ErrorBoundary>
              <Homepage collections={collections} />
            </ErrorBoundary>
          </Route>

          <Route path="/catalog/:page">
            <ErrorBoundary>
              <Catalog />
            </ErrorBoundary>
          </Route>

          <Route path="/collection/:category/:alias">
            <ErrorBoundary>
              <Collection />
            </ErrorBoundary>
          </Route>

          <Route path="/collections/:category">
            <ErrorBoundary>
              <Category />
            </ErrorBoundary>
          </Route>

          <Route path="/wishlist" privateRoute={true}>
            <ErrorBoundary>
              <Wishlist />
            </ErrorBoundary>
          </Route>

          <Route path="/search/:page/:role/:id">
            <ErrorBoundary>
              <PersonPage />
            </ErrorBoundary>
          </Route>

          <Route path="/login">
            <ErrorBoundary>
              <Auth loginForm />
            </ErrorBoundary>
          </Route>

          <Route path="/register">
            <ErrorBoundary>
              <Auth registerForm />
            </ErrorBoundary>
          </Route>

          <Route path="/bug-report" component={BugReport} />

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
  };
}

export default connect(mapStateToProps, {
  verifyUser,
  logout,
  getGenres,
  getCollections,
})(RootComponent);
