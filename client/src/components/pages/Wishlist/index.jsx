import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PageHeader from 'components/common/PageHeader';
import Tabs from 'components/common/Tabs';
import Items from './Items';
import Filter from './Filter';

import { getWishlist } from 'actions';

import './index.scss';

class Wishlist extends Component {
  state = {
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
    filterParams: {},
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/');
      return !1;
    }
  }

  applyFilter = (values) => {
    this.setState({
      filterParams: values,
    })
  }

  render() {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    const { filterParams } = this.state;

    if (pathname === '/wishlist') {
      return <Redirect to="/wishlist/movies" />;
    }
    return (
      <div>
        <PageHeader title="Personal wishlist" />
        <div className="wishlist container-fluid">
          <Tabs path="/wishlist" tabs={this.state.tabs} link />
          <Filter applyFilter={this.applyFilter} />
          <Route path="/wishlist/:collection" render={(props) => (<Items {...props} filterParams={filterParams} />)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collections: state.collections,
  wishlist: state.wishlist,
});

export default connect(mapStateToProps, {
  getWishlist,
})(Wishlist);
