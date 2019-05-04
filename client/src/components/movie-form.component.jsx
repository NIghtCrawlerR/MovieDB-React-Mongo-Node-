import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            title: '',
            img: '',
            genre: '',
            liked: false,
            watched: 0
        }
    }

    changeHandler(e) {
        let name = e.target.name,
            val = e.target.value

        let newState = {}
        newState[name] = val

        this.setState(newState)
    }

    onSubmit(e) {
        e.preventDefault()
        const newMovie = {}
        for (let key in this.state) newMovie[key] = this.state[key]

        if (this.props.mode === 'edit') {
            axios.post('http://localhost:4000/movies/update/' + this.state.id, newMovie)
                .then(res => this.props.showMsg(res.data.status, res.data.text))
        }
        else {
            axios.post('http://localhost:4000/movies/add', newMovie)
                .then(res => {
                    this.setState({
                        title: '',
                        img: '',
                        genre: '',
                        liked: false,
                        watched: 0
                    })
                    this.props.showMsg(res.data.status, res.data.text)
                })
        }
    }

    componentDidMount() {
        if (this.props.mode === 'edit') {
            axios.get('http://localhost:4000/movies/' + this.props.id)
                .then(response => {
                    this.setState({
                        id: this.props.id,
                        title: response.data.title,
                        img: response.data.img,
                        genre: response.data.genre,
                        liked: response.data.liked,
                        watched: response.data.watched
                    })
                })
                .catch((err) => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <h3>{this.props.mode === 'edit' ? 'Edit movie' : 'Add new movie'}</h3>
                    <Link className="btn btn-outline-info" to="/"><i className="fas fa-arrow-left mr-2"></i> Go back</Link>
                </div>
                <br />
                <form onSubmit={this.onSubmit} >
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label><b>Title</b></label>
                            <input className="form-control" type="text" name="title" onChange={this.changeHandler} value={this.state.title} required />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label><b>Genre</b></label>
                            <select className="form-control" name="genre" onChange={this.changeHandler} value={this.state.genre} >
                                <option value=""></option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="animation">Animation</option>
                                <option value="biography">Biography</option>
                                <option value="comedy">Comedy</option>
                                <option value="crime">Crime</option>
                                <option value="documentary">Documentary</option>
                                <option value="drama">Drama</option>
                                <option value="family">Family</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="film-noir">Film-Noir</option>
                                <option value="history">History</option>
                                <option value="horror">Horror</option>
                                <option value="musical">Musical</option>
                                <option value="mystery">Mystery</option>
                                <option value="romance">Romance</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="sport">Sport</option>
                                <option value="thriller">Thriller</option>
                                <option value="war">War</option>
                                <option value="western">Western</option>
                            </select>
                        </div>
                    </div>

                    <br />
                    <label><b>Image link </b>(provide this link if you have non english title or api return error)</label>
                    <input className="form-control" type="text" name="img" onChange={this.changeHandler} value={this.state.img} />
                    <br />


                    <input type="submit" className="btn btn-purple mt-3" value={this.props.mode === 'edit' ? 'Edit' : 'Create'} />
                </form>
            </div>
        )
    }
}