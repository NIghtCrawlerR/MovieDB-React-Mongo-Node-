import React, { Component } from 'react';
import Head from '../../common/Head'

import Pagination from '../../common/Pagination'
import ItemsList from '../../ItemsList'

import { connect } from 'react-redux'
import {
    getMovies,
    getTV,
    getGames
} from '../../../actions/itemsCollectionsActions'
import PageTitle from '../../common/PageTitle';

class Collection extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            pageCount: 1,
            pageSize: 18
        }
    }

    getItems(page, collection, currentPage) {
        this.setState({ loading: true })

        switch (page) {
            case 'movies':
                this.props.getMovies(collection, currentPage || 1)
                    .then(res => {
                        this.setState({
                            loading: false,
                            pageCount: res.data.total_pages
                        })
                    })
                break;
            case 'tv':
                this.props.getTV(collection, currentPage || 1)
                    .then(res => {
                        this.setState({
                            loading: false,
                            pageCount: res.data.total_pages
                        })
                    })
                break;
            case 'games':
                this.props.getGames(collection, currentPage || 1)
                    .then(res => {
                        this.setState({
                            loading: false,
                            pageCount: Math.ceil(res.data.count / this.state.pageSize)
                        })
                    })
                break;
            default:
                return;
        }
    }

    changePage(page) {
        this.props.history.push({
            search: `?page=${page.selected + 1}`
        })
    }

    componentDidUpdate(prevProps) {
        const { match, location } = this.props
        const { params } = match

        const currentPage = location.search ? location.search.match(/\d+/g)[0] : 1

        if (params.collection !== prevProps.match.params.collection ||
            params.page !== prevProps.match.params.page ||
            location.search !== prevProps.location.search) {
            this.getItems(params.page, params.collection, currentPage)
        }
    }

    componentDidMount() {
        const { params } = this.props.match
        const currentPage = this.props.location.search ? this.props.location.search.match(/\d+/g)[0] : 1
        this.getItems(params.page, params.collection, currentPage)
    }
    render() {
        const {
            collections,
            match: { params },
            location
        } = this.props

        const { page, collection } = params
  
        const currentPage = location.search ? location.search.match(/\d+/g)[0] : 1
        return (
            <div className="container-fluid my-5">
                <PageTitle title={`${page} ${collection}`} buttonBack={false} />
                <div className="top-list">
                    <ItemsList loading={this.state.loading} items={collections[page][collection]} type={page} />
                    {this.state.pageCount > 1 ?
                        < Pagination pageCount={this.state.pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)} />
                        : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collections: state.movieSelection
})

export default connect(mapStateToProps, {
    getMovies,
    getTV,
    getGames
})(Collection)