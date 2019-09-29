import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';

import { connect } from 'react-redux';
import { getMovieById, editMovie, addMovie } from '../actions/movieActions'

import { genres } from '../utils/genres'

import store from '../store'

class Form extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            title: '',
            img: '',
            genre: '',
            loading: false
        }
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        this.setState({ loading: true })
        const newMovie = {}
        for (let key in this.state) newMovie[key] = this.state[key]

        // if (!newMovie.img) newMovie.img = 'https://uoslab.com/images/tovary/no_image.jpg'

        if (this.props.mode === 'edit') {
            this.props.editMovie(this.props.movie._id, newMovie)
                .then(res => {
                    this.setState({ loading: false })
                    this.props.showMsg(res.data.status, res.data.text)
                })
        }
        else {
            this.props.addMovie(newMovie)
                .then(res => {
                    this.setState({
                        title: '',
                        img: '',
                        genre: '',
                        loading: false
                    })
                    this.props.showMsg(res.data.status, res.data.text)
                })
        }
    }

    componentDidMount() {
        if (this.props.mode === 'edit') {
            this.props.getMovieById(this.props.id)
                .then(res => {
                    this.setState({
                        title: res.data.title,
                        img: res.data.img,
                        genre: res.data.genre
                    })
                    console.log(res)
                })
        }
    }

    render() {
        const { title, genre, img } = this.state

        return (
            <div className="content movie-form__wrap">
                {this.state.loading ?
                    <div className="spinner__wrap">
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> : null}
                <div className="d-flex justify-content-between">
                    <h3>{this.props.mode === 'edit' ? 'Edit movie' : 'Add new movie'}</h3>
                    <Link className="btn btn-outline-info" to="/"><i className="fas fa-arrow-left mr-2"></i> Go back</Link>
                </div>
                <br />
                <form onSubmit={this.onSubmit} >
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label><b>Title</b></label>
                            <input className="form-control" type="text" name="title" onChange={this.changeHandler} value={title || ''} required />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label><b>Genre</b></label>
                            <select className="form-control" name="genre" onChange={this.changeHandler} value={genre || ''} >
                                {genres.map((genre, i) => {
                                    return <option value={genre} key={i}>{genre}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <br />
                    <label><b>Image link</b></label>
                    <input className="form-control" type="text" name="img" onChange={this.changeHandler} value={img || ''} />
                    <br />


                    <input type="submit" className="btn btn-purple mt-3" value={this.props.mode === 'edit' ? 'Edit' : 'Create'} />
                </form>
            </div>
        )


    }
}

const mapStateToProps = state => ({
    movie: state.app.movie
})

export default connect(mapStateToProps, {
    getMovieById,
    editMovie,
    addMovie
})(Form)