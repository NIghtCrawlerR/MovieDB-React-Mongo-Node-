import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/movie.css';


export default class Movie extends Component {
    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this)
    }

    onDelete() {
        this.props.onClick(this.props._id, 'delete')
    }

    setLike() {
        this.props.onClick(this.props._id, 'setLike')
    }

    render() {
        const { title, img, genre, liked, _id } = this.props
        let i = img || 'https://uoslab.com/images/tovary/no_image.jpg'
        return (
            <div className="movie_item">
                <div className="movie_img mr-3">
                    <img src={i} alt="img" />
                </div>
                <div className="movie_info">
                    <h3>{title}</h3>
                    <div>
                        <span className="badge badge-info">{genre}</span>
                        <span className="like-btn text-red" title="like" onClick={this.setLike.bind(this)}><i className={liked ? "fas fa-heart" : "far fa-heart"}></i></span>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="action text-muted" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={'/edit/' + _id} className="dropdown-item text-info"><i className="fas fa-pen mr-2"></i> Edit</Link>
                        <span className="dropdown-item text-danger" onClick={this.onDelete}><i className="fas fa-trash-alt mr-2"></i> Delete</span>
                    </div>
                </div>
            </div>
        )
    }
}