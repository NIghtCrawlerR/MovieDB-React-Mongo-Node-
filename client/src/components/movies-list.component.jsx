import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Movie from './movie.component';
import Filter from "./filter.component"
import { connect } from 'react-redux'
import { getMovies, deleteMovie, filterMovies } from '../actions/movieActions'
import { userGet } from '../actions/userActions'
import './css/movie.css';

class MoviesList extends Component {
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
        // let filterKeys = Object.keys(filter)

        // this.setState({
        //     filtered: this.state.movies.filter(item => {
        //         return filterKeys.every(key => {
        //             if (key === 'title') return item[key].toLowerCase().indexOf(filter[key]) !== -1
        //             else return item[key] === filter[key]
        //         })
        //     })
        // })
    }

    deleteMovie(id) {
        const confirm = window.confirm('Are you sure?')
        if (confirm) this.props.deleteMovie(id)
            .then(res => {
                this.setState({
                    movies: this.props.movies,
                    filtered: this.props.movies
                })
                this.props.showMsg(res.data.status, res.data.text)
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
                console.log(this.props)
                this.setState({
                    movies: res.data,
                    filtered: res.data,
                    loading: false
                })
            })
    }

    componentWillMount() {
        this.getMovies()
        // this.props.userGet(this.props.user.userId)
    }

    render() {
        const { movies } = this.props
        return (
            <div>
                <Filter filter={this.filter.bind(this)} />
                {this.state.loading ?
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> :
                    <div className="mt-3 movies_wrap">
                        { movies.filtered.length !== 0 ? movies.filtered.map(movie => {
                            return <Movie {...movie} key={movie._id} onClick={this.clickHandler.bind(this)} />
                        }) : movies.list.length === 0 ?
                                <div>
                                    <p>List is empty.</p>
                                    <Link to="/create">Add movie</Link>
                                </div> :
                                <p>No result</p>
                        }
                    </div>
                }
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
})(MoviesList)