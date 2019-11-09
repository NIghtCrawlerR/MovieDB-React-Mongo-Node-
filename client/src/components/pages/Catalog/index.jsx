import React, { Component } from 'react';
import ItemsList from '../../ItemsList'
import PageHeader from '../../common/PageHeader'
import Pagination from '../../common/Pagination'
import { connect } from 'react-redux'
import { getMoviesTv, getGames, filterMovies } from '../../../actions/catalogActions'
import { userGet } from '../../../actions/userActions'
import Head from '../../common/Head'

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pageCount: 1
        }
    }

    // filter(filter) {
    //     this.props.filterMovies(this.props.movies.list, filter)
    // }

    changePage(page) {
        this.props.history.push({
            search: `?page=${page.selected + 1}`
        })
    }

    getItems(currentPage) {
        this.setState({ loading: true })
        const { match } = this.props
        let pageType = match.params.page
        // if (match.params.page === 'movies') page = 'movie'

        if (pageType === 'tv' || pageType === 'movies') {
            this.props.getMoviesTv(pageType, currentPage)
                .then(res => {
                    console.log(this.props.catalog)
                    this.setState({
                        loading: false,
                        pageCount: res.total_pages
                    })
                })
                .catch(err => console.log('Error: ', err))
        } else if (pageType === 'games') {
            this.props.getGames(currentPage)
                .then(res => {
                    console.log(res)
                    this.setState({
                        loading: false,
                        pageCount: Math.ceil(res.count/18)
                    })
                })
                .catch(err => console.log('Error: ', err))
        }

    }

    componentDidUpdate(prevProps) {
        const { location, match } = this.props
        const { params } = match

        const currentPage = location.search ? location.search.match(/\d+/g)[0] : 1

        if (params.collection !== prevProps.match.params.collection ||
            params.page !== prevProps.match.params.page ||
            location.search !== prevProps.location.search) {
            this.getItems(currentPage)

        }
    }

    componentDidMount() {
        const { location, match } = this.props
        const currentPage = location.search ? location.search.match(/\d+/g)[0] : 1
        if (this.props.catalog[match.params.page].length === 0) {
            this.getItems(currentPage)
        }
    }

    render() {
        const { catalog, location, match } = this.props
        const currentPage = location.search ? location.search.match(/\d+/g)[0] : 1
        return (
            <div className="mb-5">
                <Head title={`Fiction finder - catalog - ${match.params.page}`} />
                <PageHeader title={`${match.params.page} catalog`} />
                <div className="container-fluid">
                    <div className="content-box">

                        {/* <Filter filter={this.filter.bind(this)} /> */}
                        <ItemsList loading={this.state.loading} items={catalog[match.params.page]} type={match.params.page} />
                        {this.state.pageCount > 1 ?
                            < Pagination loading={this.state.loading} pageCount={this.state.pageCount} currentPage={currentPage} changePage={this.changePage.bind(this)} />
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    catalog: state.app,
    user: state.user
})

export default connect(mapStateToProps, {
    getMoviesTv,
    getGames,
    userGet,
    filterMovies
})(Catalog)