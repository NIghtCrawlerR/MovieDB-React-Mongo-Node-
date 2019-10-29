import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import {
    addItemToWishlist,
    deleteItemToWishlist
} from '../../actions/itemsCollectionsActions'
import { getGenres } from '../../actions/itemsCollectionsActions'
// import './css/movie.css';
import './index.css'

class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInCollection: false
        }

        this.deleteFromDB = this.deleteFromDB.bind(this)
        // this.deleteFromCollection = this.deleteFromCollection.bind(this)
        // this.updateMovieCollection = this.updateMovieCollection.bind(this)

        this.addToWishlist = this.addToWishlist.bind(this)
        this.deleteFromWishlist = this.deleteFromWishlist.bind(this)
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

    addToWishlist() {
        const { id, user, type, title, name, genre_ids, genres, poster_path, background_image, vote_average, rating } = this.props

        if (!user.isLogin) {
            alert('Login to add movie to your collection.')
            return !1
        }
    
        const newItem = {
            id: id,
            title: title || null,
            name: name || null,
            genre_ids: genre_ids || null,
            genres: genres || null,
            poster_path: poster_path || null,
            background_image: background_image || null,
            vote_average: vote_average || null,
            rating: rating || null,
            itemType: type
        }

        this.props.addItemToWishlist(type, newItem, user.userId)
            .then(() => console.log(this.props))
    }

    deleteFromWishlist() {
        const { id, user, type } = this.props

        if (!user.isLogin) {
            alert('Login to add movie to your collection.')
            return !1
        }

        this.props.deleteItemToWishlist(type, id, user.userId)
    }

    render() {
        const { type, title, name, img, liked, watched, _id, id, userCollection, user, genre_ids } = this.props
        let i = img || 'https://uoslab.com/images/tovary/no_image.jpg'
        let itemGenres = []
        if (genre_ids && this.props.moviesGenres) {
            // console.log(genre_ids)
            itemGenres = genre_ids.map((id, i) => {
                // console.log(this.props.moviesGenres.find(genre => genre.id === id))
                const obj = this.props.moviesGenres.find(genre => genre.id === id)
                return obj ? obj.name : null
                // return ''
            })
        } else if (this.props.genres) {
            itemGenres = this.props.genres.map(genre => genre.name)
        }

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
                        {itemGenres.length > 0 ?
                            <p className="movie__genres">
                                <span>{itemGenres.join(', ')}</span>
                            </p> :
                            null
                        }
                    </div>
                    <div className="movie_info__bottom">
                        <p className="ml-auto">
                            {
                                userCollection ?
                                    <React.Fragment>
                                        <span className="text-info pointer mx-2" onClick={this.setWatch.bind(this)}>
                                            <i className={watched ? "fas fa-eye" : "far fa-eye"}></i>
                                        </span>
                                        <span className="text-red pointer mx-2" title="like" onClick={this.setLike.bind(this)}>
                                            <i className={liked ? "fas fa-heart" : "far fa-heart"}></i>
                                        </span>
                                    </React.Fragment> : null
                            }
                            <span className="text-info pointer mx-2">
                                <Link to={'/edit/' + _id} className="text-info"><i className="fas fa-info mr-2"></i></Link>
                            </span>
                            {
                                user ?
                                    user[type].includes(id) ?
                                        <span className="ml-auto pointer" title="Remove from wishlist" onClick={this.deleteFromWishlist}><i className="fas fa-star text-warning"></i></span> :
                                        <span className="ml-auto pointer" title="Add to wishlist" onClick={this.addToWishlist}><i className="far fa-star"></i></span> : null
                            }
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    moviesGenres: state.movieSelection.moviesGenres
})

export default connect(mapStateToProps, {
    addItemToWishlist,
    deleteItemToWishlist,
    getGenres
})(Movie)