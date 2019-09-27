import React, { Component } from 'react';
import Movie from './movie.component';
import './css/movie.css';

import Filter from "./filter.component"

import { connect } from 'react-redux'
// import store from '../store'
// import axios from 'axios';
import { getMovies, deleteMovie } from '../actions/movieActions'

class MoviesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            filtered: []
        }
    }

    filter(filter) {
        let filterKeys = Object.keys(filter)

        this.setState({
            filtered: this.state.movies.filter(item => {
                return filterKeys.every(key => {
                    if (key === 'title') return item[key].toLowerCase().indexOf(filter[key]) !== -1
                    else return item[key] === filter[key]
                })
            })
        })
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
        this.props.getMovies()
            .then(res => {
                this.setState({
                    movies: res.data,
                    filtered: res.data
                })
            })
    }

    componentWillMount() {
        this.getMovies()
    }

    render() {
        return (
            <div>
                <Filter filter={this.filter.bind(this)} />
                <div className="mt-3 movies_wrap">
                    {this.state.filtered ? this.state.filtered.map(movie => {
                        return <Movie {...movie} key={movie._id} onClick={this.clickHandler.bind(this)} />
                    }) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    movies: state.app.movies
})

export default connect(mapStateToProps, {
    getMovies,
    deleteMovie
})(MoviesList)