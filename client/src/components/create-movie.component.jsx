import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class CreateMovie extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            title: '',
            img: '',
            genre: '',
            liked: false
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
        console.log(newMovie)

        axios.post('http://localhost:4000/movies/add', newMovie)
            .then(res => console.log(res.data))

        this.setState({
            title: '',
            img: '',
            genre: '',
            liked: false
        })
    }

    render() {
        return (
            <div className="mt-3 content">
                <h3>CreateMovie Component</h3>
                <br />
                <form onSubmit={this.onSubmit}>
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.changeHandler} required/>
                    <br />
                    <label>Img link</label>
                    <input className="form-control" type="text" name="img" value={this.state.img} onChange={this.changeHandler} />
                    <br />
                    <label>Genre</label>
                    <select className="form-control" name="genre" value={this.state.genre} onChange={this.changeHandler}>
                        <option value="-">-</option>
                        <option value="fantasy">fantasy</option>
                        <option value="horror">horror</option>
                        <option value="drama">drama</option>
                        <option value="comedy">comedy</option>
                    </select>

                    <input type="submit" className="btn btn-success mt-3" value="Create" />
                </form>

                <Link className="btn btn-outline-info mt-3" to="/">Back</Link>
            </div>
        )
    }
}