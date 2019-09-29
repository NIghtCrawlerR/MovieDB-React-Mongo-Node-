import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Movie from './movie.component';
import './css/movie.css';

import Filter from "./filter.component"

import { getFromStorage } from '../utils/storage'

import { connect } from 'react-redux'
import { filterMovies } from '../actions/userActions'

import store from '../store'

class MoviesCollection extends Component {
    constructor(props) {
        super(props);

        this.updateCollection = this.updateCollection.bind(this)

        this.state = {
            movies: [],
            filtered: [],
            loading: false
        }
    }

    filter(filter) {
        this.props.filterMovies(this.props.user.movies, filter)
    }

    onDelete(id) {
        let isDel = window.confirm('Are you sure?')
        if (isDel) axios.delete('http://localhost:4000/movies/delete/' + id)
            .then(res => {
                let idx
                this.state.movies.map((m, i) => { if (m._id === id) idx = i })
                this.state.movies.splice(idx, 1)
                this.setState({
                    filtered: this.state.movies
                })
                this.props.showMsg(res.data.status, res.data.text)
            })
    }
    setLike(id) {
        this.setState({
            movies: this.state.movies.map(m => {
                if (m._id === id) m.liked = !m.liked
                return m
            })
        })
        let el = this.state.movies.filter(m => m._id === id)[0]

        axios.post('http://localhost:4000/movies/update/' + id, el)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    setWatch(id) {
        this.setState({
            movies: this.state.movies.map(m => {
                if (m._id === id) m.watched = !m.watched
                return m
            })
        })
        let el = this.state.movies.filter(m => m._id === id)[0]

        axios.post('http://localhost:4000/movies/update/' + id, el)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    clickHandler(id, mode) {
        switch (mode) {
            case 'delete':
                this.onDelete(id);
                break;
            case 'setLike':
                this.setLike(id);
                break;
            case 'setWatch':
                this.setWatch(id);
                break;
            default:
                return;
        }

    }

    updateCollection(movies) {
        console.log('updateCollection', movies)
    }


    componentDidMount() {
        //VERTICAL LIMIT
        //FLASHFORWARD
        //WAR PHOTOGRAPHER
        //ЧЕЛОВЕК – ШВЕЙЦАРСКИЙ НОЖ
        //УЧИТЕЛЬ НА ЗАМЕНУ
        //ЧЕЛОВЕК-ПАУК: ЧЕРЕЗ ВСЕЛЕННЫЕ
        this.setState({
            loading: true
        })
        const token = getFromStorage('token')
        if (!token) {
            this.props.history.push('/')
            return !1
        }
        this.setState({
            loading: false
        })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <Filter usersCollection filter={this.filter.bind(this)} />
                {this.state.loading ?
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> :
                    <div className="mt-3 movies_wrap">
                        {user.filteredMovies.length !== 0 ? user.filteredMovies.map(movie => {
                            return <Movie {...movie} updateCollection={this.updateCollection} userCollection key={movie._id} onClick={this.clickHandler.bind(this)} />
                        }) : user.movies.length === 0 ?
                                <div>
                                    <p>Your collection is empty.</p>
                                    <Link to="/">Go to main list</Link>
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
    user: state.user
})

export default connect(mapStateToProps, {
    filterMovies
})(MoviesCollection)