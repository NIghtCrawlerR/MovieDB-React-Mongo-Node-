import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { userAddMovie } from '../../actions/userActions'
// import './css/movie.css';
import './index.css'

class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInCollection: false
        }

        this.deleteFromDB = this.deleteFromDB.bind(this)
        this.deleteFromCollection = this.deleteFromCollection.bind(this)
        this.updateMovieCollection = this.updateMovieCollection.bind(this)
    }

    deleteFromDB() {
        this.props.onClick(this.props._id, 'delete')
    }

    setLike() {
        this.updateMovieCollection('like')
    }
    setWatch() {
        this.updateMovieCollection('watch')
    }

    updateMovieCollection(toggle) {

        const { _id, id, title, img, genre, user } = this.props

        let movies = user.movies

        if (!user.isLogin) {
            alert('Login to add movie to your collection.')
            return !1
        }

        let i = movies.findIndex(movie => movie.id === _id)
        console.log(movies)
        console.log(_id, id)
        if (typeof toggle !== 'string') {

            if (i === -1) {
                movies.push({
                    id: id,
                    _id: _id,
                    title: title,
                    img: img,
                    genre: genre,
                    liked: false,
                    watched: false
                })
            } else movies.splice(i, 1)
        } else {
            switch (toggle) {
                case 'like':
                    movies[i].liked = !movies[i].liked
                    break;
                case 'watch':
                    movies[i].watched = !movies[i].watched
                    break;
                default:
                    break;
            }
        }

        this.props.userAddMovie(user.userId, movies)
    }

    deleteFromCollection() {
        const { _id, user } = this.props
        let movies = user.movies

        movies = movies.filter(movie => movie.id !== _id)

        this.props.userAddMovie(user.userId, movies)
    }

    render() {
        const { title, name, img, genre, liked, watched, _id, userCollection, user } = this.props
        let i = img || 'https://uoslab.com/images/tovary/no_image.jpg'

        return (
            <div className="movie_item">
                <div className="movie_img">
                    {watched && userCollection
                        ? <div className="movie--watched bg-purple">Watched</div>
                        : null}
                    <img src={i} alt="img" />
                </div>
                <div className="movie_info">
                    <div className="movie_info__top">
                        <h3>{title || name}</h3>
                        {!this.props.slider ?
                            <div className="dropdown movie__dropdown">
                                <span className="action text-muted" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right " aria-labelledby="dropdownMenuButton">
                                    {this.props.user.userId ?
                                        userCollection ?
                                            <div>
                                                <span className="dropdown-item text-info" onClick={this.setWatch.bind(this)}>
                                                    <i className="far fa-eye mr-2"></i>
                                                    {watched ? 'Unset watched' : 'Mark as watched'}
                                                </span>
                                                <span className="dropdown-item text-danger" onClick={this.deleteFromCollection}><i className="fas fa-trash-alt mr-2"></i> Remove from wishlist</span>
                                            </div>
                                            :
                                            <div>
                                                <span className="dropdown-item text-info" onClick={this.updateMovieCollection}>
                                                    <i className="fas fa-plus mr-2"></i>
                                                    {user ?
                                                        user.movies.findIndex(movie => movie.id === _id) !== -1 ?
                                                            'Remove from wishlist' : 'Add to wishlist' : null}
                                                </span>
                                                <Link to={'/edit/' + _id} className="dropdown-item text-info"><i className="fas fa-pen mr-2"></i> Edit</Link>
                                                <span className="dropdown-item text-danger" onClick={this.deleteFromDB}><i className="fas fa-trash-alt mr-2"></i> Delete</span>
                                            </div>

                                        :
                                        <span className="dropdown-item text-info">
                                            <Link to="/login">Login to get access to actions</Link>
                                        </span>}
                                </div>
                            </div>
                            :
                            null
                        }

                    </div>
                    <div className="movie_info__bottom">

                        <span className="badge badge-info">{genre}</span>
                        {userCollection ?
                            <span className="ml-auto text-red pointer" title="like" onClick={this.setLike.bind(this)}>
                                <i className={liked ? "fas fa-heart" : "far fa-heart"}></i>
                            </span>
                            : user ?
                                user.movies.findIndex(movie => movie.id === _id) !== -1 ?
                                    <span className="ml-auto pointer" title="Remove from wishlist" onClick={this.updateMovieCollection}><i className="fas fa-star text-warning"></i></span> :
                                    <span className="ml-auto pointer" title="Add to wishlist" onClick={this.updateMovieCollection}><i className="far fa-star"></i></span> : null
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