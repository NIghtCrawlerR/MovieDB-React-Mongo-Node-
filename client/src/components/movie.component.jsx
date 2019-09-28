import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/movie.css';

import { setInStorage, getFromStorage } from '../utils/storage'
import axios from 'axios'

import { connect } from 'react-redux'
import store from '../store'

import { userAddMovie } from '../actions/userActions'

class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInCollection: false
        }

        this.deleteFromDB = this.deleteFromDB.bind(this)
        this.deleteFromCollection = this.deleteFromCollection.bind(this)
        this.addToCollection = this.addToCollection.bind(this)
    }

    deleteFromDB() {
        this.props.onClick(this.props._id, 'delete')
    }

    setLike() {
        this.props.onClick(this.props._id, 'setLike')
    }
    setWatch() {
        this.props.onClick(this.props._id, 'setWatch')
    }

    componentDidMount() {
        // const appData = getFromStorage('app_data')
        // if(!appData) return !1
        // setTimeout(() => {
        //     console.log(this.props)
        // }, 500)
    }

    addToCollection() {
        const { _id, user } = this.props

        let movies = user.movies

        if (!user.isLogin) {
            alert('Login to add movie to your collection.')
            return !1
        }
        if (movies) {
            if (!movies.includes(_id)) movies.push(_id)
            else {
                // const i = appData.movies.indexOf(id)
                movies = movies.filter(movieId => movieId !== _id)
            }
        }
        else movies = [_id]
        this.props.userAddMovie(user.userId, movies)
    }

    deleteFromCollection() {
        const { _id, user } = this.props
        let movies = user.movies
        console.log(user)
        // movies = movies.filter(movieId => movieId !== _id)
        // this.props.userAddMovie(user.userId, movies)
    }

    render() {
        const { title, img, genre, liked, watched, _id, userCollection, user } = this.props
        let i = img || 'https://uoslab.com/images/tovary/no_image.jpg'
        return (
            <div className="movie_item">
                <div className="movie_img mr-3">
                    {watched === '1'
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
                            : user ?
                                user.movies.includes(this.props._id) ?
                                    <span className="like-btn"><i className="fas fa-star text-warning"></i></span> :
                                    null : null
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
                                {watched === '1' ? 'Unset watched' : 'Mark as watched'}
                            </span>
                            :
                            <div>
                                <span className="dropdown-item text-info" onClick={this.addToCollection}>
                                    <i className="fas fa-plus mr-2"></i>
                                    {user ?
                                        user.movies.includes(this.props._id) ?
                                            'Remove from collection' : 'Add to collection' : ''}
                                </span>
                                <Link to={'/edit/' + _id} className="dropdown-item text-info"><i className="fas fa-pen mr-2"></i> Edit</Link>
                            </div>
                        }
                        {userCollection ?
                            <span className="dropdown-item text-danger" onClick={this.deleteFromCollection}><i className="fas fa-trash-alt mr-2"></i> Delete from collection</span> :
                            <span className="dropdown-item text-danger" onClick={this.deleteFromDB}><i className="fas fa-trash-alt mr-2"></i> Delete</span>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    userAddMovie
})(Movie)