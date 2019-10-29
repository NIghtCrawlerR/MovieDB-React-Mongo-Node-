import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Movie from './Movie'
// import Filter from './MovieFilter'
import PageHeader from './common/PageHeader'
import Loader from './common/Loader'
import { connect } from 'react-redux'
import { getMovies, filterMovies } from '../actions/movieActions'
import { userGet } from '../actions/userActions'

class MoviesCatalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    filter(filter) {
        this.props.filterMovies(this.props.movies.list, filter)
    }

    clickHandler(id, mode) {
   
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
                            <Loader /> :
                            <React.Fragment>
                                <div className="mt-3 movies_wrap">
                                    {movies.filtered && movies.filtered.length !== 0 ? movies.filtered.map(movie => {
                                        return <Movie type="movies" {...movie} img={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} key={movie.id} id={movie._id || movie.id} onClick={this.clickHandler.bind(this)} />
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
    userGet,
    filterMovies
})(MoviesCatalog)