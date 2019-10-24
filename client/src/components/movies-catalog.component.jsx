import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Movie from './Movie'
// import Filter from './MovieFilter'
import PageHeader from './common/PageHeader'
import { connect } from 'react-redux'
import { getMovies, deleteMovie, filterMovies } from '../actions/movieActions'
import { userGet } from '../actions/userActions'

class MoviesCatalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            filtered: [],
            loading: false
        }
    }

    filter(filter) {
        this.props.filterMovies(this.props.movies.list, filter)
    }

    deleteMovie(id) {
        const confirm = window.confirm('Are you sure?')
        if (confirm) this.props.deleteMovie(id, this.props.user.userId)
            .then(res => {
                this.props.showMsg(res.data.status, res.data.text)
            })
            .catch(err => {
                const { status, text, accessError } = err.response.data
                let timeout = accessError ? 15000 : 5000
                this.props.showMsg(status || 'error', text || 'Something went wrong', accessError, timeout)
            })
    }

    clickHandler(id, mode) {
        switch (mode) {
            case 'delete':
                this.deleteMovie(id)
                break;
            default:
                return;
        }
    }

    getMovies() {
        this.setState({ loading: true })
        this.props.getMovies()
            .then(res => {
                this.setState({
                    loading: false
                })
            })
    }

    componentDidMount() {
        if (this.props.movies.list.length === 0) this.getMovies()
    }

    render() {
        const { movies } = this.props
        return (
            <div className="mb-5">
                <PageHeader title="Movie catalog" breadcrumbs={['Home', 'Movie catalog']} />
                <div className="container-fluid">
                    <div className="content-box">

                        {/* <Filter filter={this.filter.bind(this)} /> */}
                        {this.state.loading ?
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div> :
                            <React.Fragment>
                                <div className="mt-3 movies_wrap">
                                    {movies.filtered && movies.filtered.length !== 0 ? movies.filtered.map(movie => {
                                        return <Movie {...movie} key={movie._id} id={movie._id} onClick={this.clickHandler.bind(this)} />
                                    }) : movies.list.length === 0 ?
                                            <div>
                                                <p>List is empty.</p>
                                                <Link to="/create">Add movie</Link>
                                            </div> :
                                            <p>No result</p>
                                    }
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    movies: state.app,
    user: state.user
})

export default connect(mapStateToProps, {
    getMovies,
    deleteMovie,
    userGet,
    filterMovies
})(MoviesCatalog)