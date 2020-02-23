import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemsList from '../../ItemsList';
import Head from '../../common/Head';

import { getWishlist } from '../../../actions';
import Loader from 'components/common/Loader';

class List extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const {
      match: { params: { collection } }
    } = this.props;

    this.getList(collection);
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: { collection } },
      user,
    } = this.props;

    if (
      collection !== prevProps.match.params.collection
      || user[collection].length !== prevProps.user[collection].length
    ) {
      this.getList(collection);
    }
  }

  getList(collection) {
    const { user, getWishlist } = this.props;
    const ids = user[collection].map((item) => item.id);

    if (ids.length) {
      this.setState({ loading: true });
      getWishlist(collection, ids)
        .then(() => {
          this.setState({ loading: false })
        });
    }
  }

  render() {
    const {
      match: {
        params: { collection },
      },
      user,
      wishlist,
      filterParams,
    } = this.props;

    const { loading } = this.state;

    const filtered = (items) => {
      const allItems = user[collection];
      const filteredItems = allItems.filter(item => {
        return Object.keys(filterParams).every(key => {
          const filterValue = filterParams[key] === '0' ? false : true;

          return filterValue === item[key]
        })
      })

      const ids = filteredItems.map(item => item.id)

      return items.filter(item => ids.includes(item.id));
    }

    if (loading) return <Loader />
    const items = wishlist[collection];

    return (
      <>
        {/* <Filter filter={this.filter.bind(this)} /> */}
        <Head title={`Fiction finder - wishlist - ${collection}`} />
        <ItemsList
          wishlist
          loading={false}
          items={filtered(items)}
          type={collection}
        />
      </>
    );
  }
}

function mapStateToProps({
  user,
  collections,
  wishlist,
}) {
  return {
    user,
    collections,
    wishlist,
  }
}

export default connect(mapStateToProps, {
  getWishlist,
})(List);
