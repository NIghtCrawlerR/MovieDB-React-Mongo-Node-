import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './index.css'

export default class Pagination extends Component {
    render() {
        return (
            <ReactPaginate
                pageCount={this.props.pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                containerClassName="pagination"
                pageClassName="page-item"
                breakClassName="page-item"
                activeClassName="active"
                pageLinkClassName="page-link pointer"
                breakLinkClassName="page-link"
                previousLinkClassName="page-link pointer"
                nextLinkClassName="page-link pointer"
                disabledClassName="page-item--disabled"
                forcePage={parseInt(this.props.currentPage) - 1}
                onPageChange={this.props.changePage}
                ariaLabelBuilder={(i) => {
                    return (
                        `${i}`
                    )
                }}
            />
        )
    }
}
