import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import { Icon } from 'components/UI';

import './index.scss';

const Prev = () => <Icon name="chevron-left" />;

const Next = () => <Icon name="chevron-right" />;

const Pagination = ({ pageCount, currentPage, changePage }) => (
  <ReactPaginate
    pageCount={pageCount}
    pageRangeDisplayed={2}
    marginPagesDisplayed={1}
    previousLabel={<Prev />}
    nextLabel={<Next />}
    containerClassName="pagination"
    previousClassName="pagination-item"
    nextClassName="pagination-item"
    pageClassName="pagination-item"
    breakClassName="pagination-item"
    activeClassName="pagination-item--active"
    pageLinkClassName="pagination-link"
    breakLinkClassName="pagination-link"
    previousLinkClassName="pagination-link"
    nextLinkClassName="pagination-link"
    disabledClassName="pagination-item--disabled"
    forcePage={parseInt(currentPage, 10) - 1}
    onPageChange={changePage}
    ariaLabelBuilder={(i) => (
      `${i}`
    )}
  />
);

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
