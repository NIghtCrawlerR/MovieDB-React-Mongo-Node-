import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovieById, editMovie, addMovie } from '../actions/movieActions'
import { genres } from '../utils/genres'
import Loader from './common/Loader'
import PageHeader from './common/PageHeader'
import Input from './common/Input'

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
            titleError: false,
            test: ''
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

        if (this.props.mode === 'edit') {
            this.props.editMovie(this.props.movie._id, newMovie, this.props.user.userId)
                .then(res => {
                    this.setState({ loading: false })
                    this.props.showMsg(res.data.status, res.data.text)
                })
                .catch(err => {
                    this.setState({ loading: false })
                    const { status, text, accessError } = err.response.data
                    let timeout = accessError ? 15000 : 5000
                    this.props.showMsg(status || 'error', text || 'Something went wrong', accessError, timeout)
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
                    const { status, text, accessError } = err.response.data
                    let timeout = accessError ? 15000 : 5000
                    this.props.showMsg(status || 'error', text || 'Something went wrong', accessError, timeout)
                })
        }
    }

    componentDidMount() {
        if (this.props.mode === 'edit') {
            this.setState({
                loading: true
            })
            this.props.getMovieById(this.props.match.params.id)
                .then(res => {
                    this.setState({
                        title: res.data.title,
                        img: res.data.img,
                        genre: res.data.genre,
                        loading: false
                    })
                    console.log(res)
                })
        }
    }

    render() {
        const { title, genre, img } = this.state
        const { mode } = this.props
        return (
            <div className="content movie-form__wrap">
                {this.state.loading ? <Loader /> : null}
                <PageHeader title={mode === 'edit' ? 'Edit movie' : 'Add new movie'} />
                <br />
                <form onSubmit={this.onSubmit} >
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <Input label="Title" name="title" value={title} onChange={this.changeHandler} />
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
                                <div className="col-xs-9 col-sm-9 col=md-9 col-lg-9">
                                    <Input label="Image link" name="img" value={img} onChange={this.changeHandler} description={
                                        <small>Image api works only for correct english titles</small>
                                    } />
                                </div>
                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 d-flex">
                                    <button type="button" className="btn btn-info mt-auto" onClick={this.findImage}>Find img</button>
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

                    <input type="submit" className="btn btn-purple mt-3" value={mode === 'edit' ? 'Edit' : 'Create'} />
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