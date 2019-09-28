import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Movie from './movie.component';
import './css/movie.css';

import Filter from "./filter.component"

import { getFromStorage } from '../utils/storage'

import { connect } from 'react-redux'
import { userGetMovies } from '../actions/userActions'

import store from '../store'

class MoviesCollection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            filtered: [],
            loading: false
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

        this.props.userGetMovies(store.getState().user.userId)
            .then(res => {
                this.setState({
                    movies: res.data.movies,
                    filtered: res.data.movies,
                    loading: false
                })
            })
    }

    render() {
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

                        {this.state.movies.length > 0 ? this.state.filtered.map(movie => {
                            return <Movie {...movie} userCollection key={movie._id} onClick={this.clickHandler.bind(this)} />
                        }) :
                            <div>
                                <p>Your collection is empty.</p>
                                <Link to="/">Go to main list</Link>
                            </div>}
                    </div>
                }


            </div>
        )
    }
}

const mapStateToProps = state => ({
    userData: state.user.data
})

export default connect(mapStateToProps, {
    userGetMovies
})(MoviesCollection)