import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemsList from '../../ItemsList';
import Head from '../../common/Head';

import { getWishlist } from '../../../actions';

class List extends Component {
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
      getWishlist(collection, ids);
    }
  }

  render() {
    const {
      match: {
        params: { collection },
      },
      wishlist,
    } = this.props;

    return (
      <>
        {/* <Filter filter={this.filter.bind(this)} /> */}
        <Head title={`Fiction finder - wishlist - ${collection}`} />
        <ItemsList
          wishlist
          loading={false}
          items={wishlist[collection]}
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
  settings: { showLoader },
}) {
  return {
    user,
    collections,
    wishlist,
    showLoader,
  }
}

export default connect(mapStateToProps, {
  getWishlist,
})(List);
