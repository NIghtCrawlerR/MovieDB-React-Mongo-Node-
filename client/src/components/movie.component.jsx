import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/movie.css';

import { setInStorage, getFromStorage } from '../utils/storage'

export default class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInCollection: getFromStorage('app_data').movies.includes(this.props._id)
        }

        this.onDelete = this.onDelete.bind(this)
        this.addToCollection = this.addToCollection.bind(this)
    }

    onDelete() {
        this.props.onClick(this.props._id, 'delete')
    }

    setLike() {
        this.props.onClick(this.props._id, 'setLike')
    }
    setWatch() {
        this.props.onClick(this.props._id, 'setWatch')
    }
    addToCollection() {
        this.props.onClick(this.props._id, 'addToCollection')
    }

    render() {
        const { title, img, genre, liked, watched, _id, userCollection } = this.props
        let i = img || 'https://uoslab.com/images/tovary/no_image.jpg'
        return (
            <div className="movie_item">
                <div className="movie_img mr-3">
                    {watched == '1'
                        ? <div className="label bg-purple">Watched</div>
                        : null}
                    <img src={i} alt="img" />
                </div>
                <div className="movie_info">
                    <h3>{title}</h3>

                    <div>
                        <span className="badge badge-info">{genre}</span>
                        {userCollection ?
                            <span className="like-btn text-red" title="like" onClick={this.setLike.bind(this)}><i className={liked ? "fas fa-heart" : "far fa-heart"}></i></span>
                            : null
                        }
                    </div>
                </div>

                <div className="dropdown movie__dropdown">
                    <span className="action text-muted" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {userCollection ?
                            <span className="dropdown-item text-info" onClick={this.setWatch.bind(this)}>
                                <i className="far fa-eye mr-2"></i>
                                {watched == '1' ? 'Unset watched' : 'Mark as watched'}
                            </span>
                            :
                            <div>
                                <span className="dropdown-item text-info" onClick={this.addToCollection}>
                                    <i className="fas fa-plus mr-2"></i>
                                    {this.state.isInCollection ? 'Remove from collection' : 'Add to collection'}
                                </span>
                                <Link to={'/edit/' + _id} className="dropdown-item text-info"><i className="fas fa-pen mr-2"></i> Edit</Link>
                            </div>
                        }

                        <span className="dropdown-item text-danger" onClick={this.onDelete}><i className="fas fa-trash-alt mr-2"></i> Delete</span>
                    </div>
                </div>
            </div>
        )
    }
}