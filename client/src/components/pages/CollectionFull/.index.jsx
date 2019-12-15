import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pagination from '../../common/Pagination';
import ItemsList from '../../ItemsList';

import {
  getMovies,
  getTV,
  getGames,
} from '../../../actions/itemsCollectionsActions';
import PageTitle from '../../common/PageTitle';

class CollectionFull extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pageCount: 1,
      pageSize: 18,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    const currentPage = this.props.location.search ? this.props.location.search.match(/\d+/g)[0] : 1;
    this.getItems(params.page, params.collection, currentPage);
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    const { params } = match;

    const currentPage = location.search ? location.search.match(/\d+/g)[0] : 1;

    if (params.collection !== prevProps.match.params.collection
      || params.page !== prevProps.match.params.page
      || location.search !== prevProps.location.search) {
      this.getItems(params.page, params.collection, currentPage);
    }
  }

  getItems(page, collection, currentPage) {
    const { getMovies, getTV, getGames } = this.props;
    const { pageSize } = this.state;

    this.setState({ loading: true });

    switch (page) {
      case 'movies':
        getMovies(collection, currentPage || 1)
          .then((res) => {
            this.setState({
              loading: false,
              pageCount: res.data.total_pages,
            });
          });
        break;
      case 'tv':
        getTV(collection, currentPage || 1)
          .then((res) => {
            this.setState({
              loading: false,
              pageCount: res.data.total_pages,
            });
          });
        break;
      case 'games':
        getGames(collection, currentPage || 1)
          .then((res) => {
            this.setState({
              loading: false,
              pageCount: Math.ceil(res.data.count / pageSize),
            });
          });
        break;
      default:
    }
  }

  changePage(page) {
    this.props.history.push({
      search: `?page=${page.selected + 1}`,
    });
  }

  render() {
    const {
      collections,
      match: { params: { page, collection } },
      location: { search },
    } = this.props;

    const { loading, pageCount } = this.state;

    const currentPage = search ? search.match(/\d+/g)[0] : 1;
    return (
      <div className="container-fluid my-5">
        <PageTitle title={`${page} ${collection}`} buttonBack={false} />
        <div className="top-list">
          <ItemsList
            loading={loading}
            items={collections[page][collection]}
            type={page}
          />
          {pageCount > 1
            ? <Pagination pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)} />
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {
  getMovies,
  getTV,
  getGames,
})(CollectionFull);
