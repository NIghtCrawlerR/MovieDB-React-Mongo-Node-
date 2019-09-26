import React, { Component } from 'react';
import axios from 'axios';
import Movie from './movie.component';
import './css/movie.css';

import Filter from "./filter.component"

import { connect } from 'react-redux'
import store from '../store'
import { fetchPosts, fetchMovies } from '../actions/postActions'

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

    clickHandler(id, mode) {
        switch (mode) {
            case 'delete':
                this.onDelete(id);
                break;
            default:
                return;
        }

    }

    componentWillMount() {
        
        this.props.fetchMovies()
        console.log(store.getState())
        // setTimeout(() => console.log(this.props), 300)
    }
    componentDidMount() {
        console.log(this.props)
        // axios.get('http://localhost:4000/movies')
        //     .then(res => {
        //         this.setState({
        //             movies: res.data,
        //             filtered: res.data
        //         })
        //     })
        //     .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Filter filter={this.filter.bind(this)} />
                <div className="mt-3 movies_wrap">
                    {this.props.movies ? this.props.movies.map(movie => {
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

export default connect(mapStateToProps, { fetchMovies })(MoviesList)