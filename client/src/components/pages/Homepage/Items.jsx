import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../common/Pagination';
import ItemsList from '../../ItemsList';

import {
  getMovies,
  getTV,
  getGames,
} from '../../../actions/itemsCollectionsActions';

import './index.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      pageCount: 1,
      pageSize: 18,
    };
  }

  getItems(page, collection, currentPage) {
    const { getMovies, getTV, getGames } = this.props;

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
              pageCount: Math.ceil(res.data.count / this.state.pageSize),
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

  componentDidMount() {
    const {
      match: { params: { page, collection } },
      location: { search },
    } = this.props;

    const currentPage = search ? search.match(/\d+/g)[0] : 1;
    this.getItems(page, collection, currentPage);
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
      <div className="top-list mt-4">
        <>
          <ItemsList loading={loading} items={collections[page][collection]} type={page} />
          {this.state.pageCount > 1
            ? <Pagination pageCount={pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)} />
            : null}
        </>
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
})(List);
