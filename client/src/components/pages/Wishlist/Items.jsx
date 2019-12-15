import React, { Component } from 'react';
import { connect } from 'react-redux'
import ItemsList from '../../ItemsList'
// import Filter from '../../Filter'
import { getWishlist } from '../../../actions/itemsCollectionsActions';
import Head from '../../common/Head';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getList(this.props.match.params.collection);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.collection !== prevProps.match.params.collection) {
      this.getList(this.props.match.params.collection);
    }
  }

  getList(collection) {
    // if(collections.wishlist[match.params.collection].length === 0)
    this.setState({ loading: true });

    const ids = this.props.user[collection].map((item) => item.id);

    this.props.getWishlist(collection, ids)
      .then((res) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const {
      match: {
        params: { collection },
      },
      collections,
    } = this.props;
    const { loading } = this.state;

    return (
      <>
        {/* <Filter filter={this.filter.bind(this)} /> */}
        <Head title={`Fiction finder - wishlist - ${collection}`} />
        <ItemsList
          wishlist
          loading={loading}
          items={collections.wishlist[collection]}
          type={collection}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {
  getWishlist,
})(List);
