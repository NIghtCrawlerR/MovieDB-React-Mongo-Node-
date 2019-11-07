import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import {
    addItemToWishlist,
    deleteItemFromWishlist,
    updateWishlist,
    getGenres
} from '../../actions/itemsCollectionsActions'

import './index.css'

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInCollection: false,
            wishlistItem: null
        }

        this.addToWishlist = this.addToWishlist.bind(this)
        this.deleteFromWishlist = this.deleteFromWishlist.bind(this)
        this.itemAction = this.itemAction.bind(this)
    }

    itemAction(action) {
        const {type, user} = this.props
        const {wishlistItem} = this.state
        this.props.updateWishlist(type, action, wishlistItem.id, user.userId, !wishlistItem[action])
        // console.log(action, wishlistItem.id)
    }

    addToWishlist() {
        const { id, user, type, title, name, genre_ids, genres, poster_path, background_image, vote_average, rating, slug } = this.props

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
            slug: slug || null,
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

        if (window.confirm("Delete item from wishlist?")) {
            this.props.deleteItemFromWishlist(type, id, user.userId)
        }
    }

    componentDidMount() {
        const { user, type, id } = this.props
        this.setState({
            wishlistItem: user[type].find(item => item.id === id) || null
        })
    }

    render() {
        const { type, title, name, img, slug, id, user, genre_ids } = this.props
        let i = img || 'https://uoslab.com/images/tovary/no_image.jpg'
        let itemGenres = []
        if (genre_ids && this.props.moviesGenres) {
            // console.log(genre_ids)
            itemGenres = genre_ids.map((id, i) => {
                const obj = this.props.moviesGenres.find(genre => genre.id === id)
                return obj ? obj.name : null
            })
        } else if (this.props.genres) {
            itemGenres = this.props.genres.map(genre => genre.name)
        }

        const itemIds = user ? user[type].map(item => item.id) : []
        const searchItem = slug ? slug : id

        return (

            <div className={`movie_item ${type}`}>
                <div className="movie_img">
                    <Link to={`/details/${type}/${searchItem}`}><img src={i} alt="img" /></Link>
                </div>
                <div className="movie_info">
                    <div className="movie_info__top">
                        <h3><Link to={`/details/${type}/${searchItem}`}>{title || name}</Link></h3>
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
                                this.props.wishlist && this.state.wishlistItem ?
                                    <React.Fragment>
                                        <span className="text-info pointer mx-2" onClick={() => this.itemAction('watched')}>
                                            <i className={this.state.wishlistItem.watched ? "fas fa-flag" : "far fa-flag"}></i>
                                        </span>
                                        <span className="text-red pointer mx-2" title="like" onClick={() => this.itemAction('liked')}>
                                            <i className={this.state.wishlistItem.liked ? "fas fa-heart" : "far fa-heart"}></i>
                                        </span>
                                    </React.Fragment> : null
                            }

                            {
                                user ?
                                    itemIds.includes(id) ?
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
    deleteItemFromWishlist,
    updateWishlist,
    getGenres
})(Item)