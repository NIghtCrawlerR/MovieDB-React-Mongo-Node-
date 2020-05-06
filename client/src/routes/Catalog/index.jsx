import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { flowRight } from 'lodash';

import { If } from 'components/helpers/ConditionalRender';
import ItemsList from 'components/ItemsList';
import PageHeader from 'components/PageHeader';
import Pagination from 'components/Pagination';
import Head from 'components/Head';

import {
  getMovies,
  getTV,
  getGames,
  getUser,
} from 'actions';

class Catalog extends Component {
  componentDidMount() {
    const {
      match: { params: { page } },
      catalog,
    } = this.props;

    if (catalog[page].length === 0) {
      this.getItems(this.getCurrentPage());
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search },
      match: {
        params: { page, collection },
      },
    } = this.props;

    if (collection !== prevProps.match.params.collection
      || page !== prevProps.match.params.page
      || search !== prevProps.location.search) {
      this.getItems(this.getCurrentPage());
    }
  }

  getItems(currentPage) {
    const {
      match: { params: { page } },
      getTV,
      getMovies,
      getGames,
    } = this.props;

    if (page === 'tv') {
      getTV(currentPage);
    } else if (page === 'movies') {
      getMovies(currentPage);
    } else if (page === 'games') {
      getGames(currentPage);
    }
  }

  changePage = (page) => {
    const { history } = this.props;

    history.push({
      search: `?page=${page.selected + 1}`,
    });
  };

  getCurrentPage() {
    const {
      location: { search },
    } = this.props;

    return search ? search.match(/\d+/g)[0] : 1;
  }

  render() {
    const {
      catalog,
      match: {
        params: { page },
      },
    } = this.props;

    const { loading, pageCount } = catalog;

    return (
      <div className="mb-5">
        <Head title={`Fiction finder - catalog - ${page}`} />

        <PageHeader title={`${page} catalog`} />

        <div className="container-fluid">
          <ItemsList loading={loading} items={catalog[page]} type={page} />

          <If condition={pageCount > 1}>
            <Pagination
              loading={loading}
              pageCount={+pageCount}
              currentPage={+this.getCurrentPage()}
              changePage={this.changePage}
            />
          </If>
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
};

const mapStateToProps = ({ catalog, user }) => ({ catalog, user });

export default flowRight(
  withRouter,
  connect(mapStateToProps, {
    getMovies,
    getTV,
    getGames,
    getUser,
  }),
)(Catalog);
