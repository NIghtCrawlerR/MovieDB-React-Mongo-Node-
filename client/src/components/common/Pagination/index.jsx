import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import './index.css'

function Prev() {
    return (
        <i className="fas fa-chevron-left"></i>
    );
}

function Next() {
    return (
        <i className="fas fa-chevron-right"></i>
    );
}

export default class Pagination extends Component {
    render() {
        return (
            <ReactPaginate
                pageCount={this.props.pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                previousLabel={<Prev/>}
                nextLabel={<Next/>}
                containerClassName="pagination"
                previousClassName="pagination-item"
                nextClassName="pagination-item"
                pageClassName="pagination-item"
                breakClassName="pagination-item"
                activeClassName="active"
                pageLinkClassName="pagination-link"
                breakLinkClassName="pagination-link"
                previousLinkClassName="pagination-link"
                nextLinkClassName="pagination-link"
                disabledClassName="pagination-item--disabled"
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
