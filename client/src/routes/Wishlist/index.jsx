import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import PageHeader from 'components/PageHeader';
import Tabs from 'components/Tabs';
import Items from './components/Items';
import Filter from './components/Filter';

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
    searchQuery: '',
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

  setSearchQuery = searchQuery => {
    this.setState({ searchQuery });
  }

  render() {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;

    const { filterParams, searchQuery, tabs } = this.state;

    if (pathname === '/wishlist') {
      return <Redirect to="/wishlist/movies" />;
    }
    return (
      <div>
        <PageHeader title="Personal wishlist" />
        <div className="wishlist container-fluid">
          <Tabs path="/wishlist" tabs={tabs} link />
          <Filter
            applyFilter={this.applyFilter}
            setSearchQuery={this.setSearchQuery}
          />
          <Route path="/wishlist/:collection" render={(props) => (<Items {...props} filterParams={filterParams} searchQuery={searchQuery} />)} />
        </div>
      </div>
    );
  }
}

export default withRouter(Wishlist);
