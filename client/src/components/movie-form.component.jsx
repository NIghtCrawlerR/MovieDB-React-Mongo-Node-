import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getMovieById, editMovie, addMovie } from '../actions/movieActions'
import { genres } from '../utils/genres'

import axios from 'axios'

class Form extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.findImage = this.findImage.bind(this)

        this.state = {
            title: '',
            img: '',
            genre: '',
            loading: false,
            titleError: false
        }
    }

    findImage(e) {
        e.preventDefault()
        if (!this.state.title) {
            this.setState({ titleError: true })
            return !1
        }
        this.setState({ titleError: false })

        const title = this.state.title.toLowerCase()
        axios.post('/api/movies/check', { title: title })
            .then(res => {
                if (res.data.image) {
                    this.setState({ img: res.data.image })
                } else {
                    this.props.showMsg('error', 'Error: No image found')
                }

                console.log(res)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
                this.props.showMsg('error', 'Error: ' + err.response.data.text)
            })
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onSubmit(e) {
        e.preventDefault()
        if (!this.state.title) {
            this.setState({ titleError: true })
            return !1
        }
        this.setState({ loading: true })
        const newMovie = {}
        for (let key in this.state) newMovie[key] = this.state[key]

        // if (!newMovie.img) newMovie.img = 'https://uoslab.com/images/tovary/no_image.jpg'
        console.log( this.props)
        if (this.props.mode === 'edit') {
            this.props.editMovie(this.props.movie._id, newMovie, this.props.user.userId)
                .then(res => {
                    this.setState({ loading: false })
                    this.props.showMsg(res.data.status, res.data.text)
                })
                .catch(err => {
                    this.setState({ loading: false })
                    this.props.showMsg(err.response.data.status || 'error',
                        err.response.data.text || 'Something went wrong')
                })
        }
        else {
            this.props.addMovie(newMovie, this.props.user.userId)
                .then(res => {
                    this.setState({
                        title: '',
                        img: '',
                        genre: '',
                        loading: false
                    })
                    this.props.showMsg(res.data.status, res.data.text)
                })
                .catch(err => {
                    this.setState({ loading: false })
                    this.props.showMsg(err.response.data.status || 'error',
                        err.response.data.text || 'Something went wrong')
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
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <label><b>Title</b></label>
                            <input className="form-control" data-error={this.state.titleError} type="text" name="title" onChange={this.changeHandler} value={title || ''} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <label><b>Genre</b></label>
                            <select className="form-control" name="genre" onChange={this.changeHandler} value={genre || ''} >
                                <option value="">-</option>
                                {genres.map((genre, i) => {
                                    return <option value={genre} key={i}>{genre}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-lg-12 mt-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label>
                                        <b>Image link</b> <br />
                                        <small>Fing image api works only for correct english titles</small>
                                    </label>
                                </div>
                                <div className="col-xs-9 col-sm-9 col=md-9 col-lg-9">
                                    <input className="form-control" type="text" name="img" onChange={this.changeHandler} value={img || ''} />
                                </div>
                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                    <button type="button" className="btn btn-info" onClick={this.findImage}>Find img</button>
                                </div>
                            </div>
                        </div>



                        {img !== '' ?
                            <div className="col-lg-12 mt-3 movie-form__poster">
                                <img src={img} alt="poster" />
                            </div> :
                            null
                        }
                    </div>



                    <input type="submit" className="btn btn-purple mt-3" value={this.props.mode === 'edit' ? 'Edit' : 'Create'} />
                </form>
            </div>
        )


    }
}

const mapStateToProps = state => ({
    movie: state.app.movie,
    user: state.user
})

export default connect(mapStateToProps, {
    getMovieById,
    editMovie,
    addMovie
})(Form)