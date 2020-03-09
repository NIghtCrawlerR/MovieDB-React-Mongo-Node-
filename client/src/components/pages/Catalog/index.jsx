import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItemsList from 'components/ItemsList';
import Filter from 'components/Filter';
import PageHeader from 'components/common/PageHeader';
import Pagination from 'components/common/Pagination';
import Head from 'components/common/Head';

import {
  getMoviesTv,
  getGames,
  userGet,
} from 'actions';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pageCount: 1,
    };
  }

  componentDidMount() {
    const {
      location: { search },
      match: { params: { page } },
      catalog,
    } = this.props;

    const currentPage = search ? search.match(/\d+/g)[0] : 1;
    if (catalog[page].length === 0) {
      this.getItems(currentPage);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search },
      match: {
        params: { page, collection }
      },
    } = this.props;

    const currentPage = this.currentPage();

    if (collection !== prevProps.match.params.collection
      || page !== prevProps.match.params.page
      || search !== prevProps.location.search) {
      this.getItems(currentPage);
    }
  }

  getItems(currentPage, options) {
    this.setState({ loading: true });
    const { match } = this.props;
    const pageType = match.params.page;
    // if (match.params.page === 'movies') page = 'movie'

    if (pageType === 'tv' || pageType === 'movies') {
      this.props.getMoviesTv(pageType, currentPage, options)
        .then((res) => {
          this.setState({
            loading: false,
            pageCount: res.total_pages,
          });
        })
        .catch((err) => console.log('Error: ', err));
    } else if (pageType === 'games') {
      this.props.getGames(currentPage)
        .then((res) => {
          this.setState({
            loading: false,
            pageCount: Math.ceil(res.count / 18),
          });
        })
        .catch((err) => console.log('Error: ', err));
    }
  }

  changePage(page) {
    const { history } = this.props;

    history.push({
      search: `?page=${page.selected + 1}`,
    });
  }

  filter(filter) {
    const currentPage = this.currentPage();
    this.getItems(currentPage, filter);
  }

  currentPage() {
    const {
      location: { search },
    } = this.props;

    return search ? search.match(/\d+/g)[0] : 1;
  }

  render() {
    const {
      catalog,
      location: {
        search,
      },
      match: {
        params: { page },
      },
      moviesGenres,
    } = this.props;

    const currentPage = search ? search.match(/\d+/g)[0] : 1;

    const { loading, pageCount } = this.state;

    return (
      <div className="mb-5">
        <Head title={`Fiction finder - catalog - ${page}`} />
        <PageHeader title={`${page} catalog`} />
        <div className="container-fluid">
          {page !== 'games'
            ? <Filter filter={this.filter.bind(this)} moviesGenres={moviesGenres} page={page} />
            : null}
          <ItemsList loading={loading} items={catalog[page]} type={page} />
          {pageCount > 1
            ? (
              <Pagination
                loading={loading}
                pageCount={pageCount}
                currentPage={+currentPage}
                changePage={this.changePage.bind(this)}
              />
            )
            : null}
        </div>
      </div>
    );
  }
}

Catalog.propTypes = {
  catalog: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
      collection: PropTypes.string,
    }),
  }).isRequired,
  moviesGenres: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  catalog: state.catalog,
  user: state.user,
  moviesGenres: state.collections.moviesGenres,
});

export default connect(mapStateToProps, {
  getMoviesTv,
  getGames,
  userGet,
})(Catalog);
