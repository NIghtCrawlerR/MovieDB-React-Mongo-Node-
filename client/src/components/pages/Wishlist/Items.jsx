import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemsList from '../../ItemsList';
import Head from '../../common/Head';

import { getWishlist } from '../../../actions';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

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

    getWishlist(collection, ids)
      .then((res) => {
        this.setState({ loading: false });
      });

  }

  render() {
    const {
      match: {
        params: { collection },
      },
      wishlist,
    } = this.props;
    const { loading } = this.state;

    return (
      <>
        {/* <Filter filter={this.filter.bind(this)} /> */}
        <Head title={`Fiction finder - wishlist - ${collection}`} />
        <ItemsList
          wishlist
          loading={loading}
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
