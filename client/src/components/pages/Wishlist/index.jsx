import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PageHeader from '../../common/PageHeader';
import Tabs from '../../common/Tabs';
import Items from './Items';
import { getFromStorage } from '../../../utils/storage';

import { getWishlist } from '../../../actions';

class Wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filtered: [],
      loading: false,
      tabs: [{
        title: 'Movies',
        value: 'movies',
      }, {
        title: 'TV Shows',
        value: 'tv',
      }, {
        title: 'Games',
        value: 'games',
      }],
    };
  }

  componentDidMount() {
    const token = getFromStorage('token');
    if (!token) {
      this.props.history.push('/');
      return !1;
    }
  }

  render() {
    const {
      history: {
        location: { pathname },
      },
      user,
    } = this.props;

    if (pathname === '/wishlist') {
      return <Redirect to="/wishlist/movies" />;
    }
    return (
      <div>
        <PageHeader title="Personal wishlist" />
        <div className="container-fluid">
          <Tabs path="wishlist" tabs={this.state.tabs} />
          <Route path="/wishlist/:collection" render={(props) => (<Items {...props} user={user} />)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  collections: state.collections,
  wishlist: state.wishlist,
});

export default connect(mapStateToProps, {
  getWishlist,
})(Wishlist);
