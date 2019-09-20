import React, { Component } from 'react';
import axios from 'axios';
import Movie from './movie.component';
import './css/movie.css';

import Filter from "./filter.component"

import { setInStorage, getFromStorage } from '../utils/storage'

export default class MoviesList extends Component {
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
                    else return item[key] == filter[key]
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

    addToCollection(id) {
        let appData = getFromStorage('app_data')
        if (appData.movies) {
            if(!appData.movies.includes(id)) appData.movies.push(id)
            else {
                // const i = appData.movies.indexOf(id)
                appData.movies = appData.movies.filter(movieId => movieId != id)
            }
        }
        else appData.movies = [id]
        setInStorage('app_data', appData)
     
        axios.post('http://localhost:4000/api/users/movies/add',
            { userId: getFromStorage('app_data').userId, movies: appData.movies })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // console.log(id)
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
            case 'addToCollection':
                this.addToCollection(id);
                break;
            default:
                return;
        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/movies')
            .then(res => {
                this.setState({
                    movies: res.data,
                    filtered: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Filter filter={this.filter.bind(this)} />
                <div className="mt-3 movies_wrap">
                    {this.state.filtered.map(movie => {
                        return <Movie {...movie} key={movie._id} onClick={this.clickHandler.bind(this)} />
                    })}
                </div>
            </div>
        )
    }
}