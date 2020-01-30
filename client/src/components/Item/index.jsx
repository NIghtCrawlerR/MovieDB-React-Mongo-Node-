import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '../common/Icon';

import CollectionsSelector from '../CollectionsSelector';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
} from '../../actions';

import './index.scss';

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishlistItem: null,
    };

    this.addToWishlist = this.addToWishlist.bind(this);
    this.deleteFromWishlist = this.deleteFromWishlist.bind(this);
    this.itemAction = this.itemAction.bind(this);
    this.getItemData = this.getItemData.bind(this);
  }

  componentDidMount() {
    const { user, type, id } = this.props;
    this.setState({
      wishlistItem: user[type].find((item) => item.id === id) || null,
    });
  }

  getItemData() {
    const {
      id, type, title, name, slug,
      genre_ids, genres,
      poster_path, background_image,
      vote_average, rating
    } = this.props;

    const newItem = {
      id,
      title: title || null,
      name: name || null,
      genre_ids: genre_ids || null,
      genres: genres || null,
      poster_path: poster_path || null,
      background_image: background_image || null,
      vote_average: vote_average || null,
      rating: rating || null,
      slug: slug || null,
      itemType: type,
    };

    return newItem;
  }

  itemAction(action) {
    const { type, user } = this.props;
    const { wishlistItem } = this.state;
    this.props.updateWishlist(type, action, wishlistItem.id, user.userId, !wishlistItem[action]);
  }

  addToWishlist() {
    const { user, type } = this.props;

    if (!user.isLogin) {
      alert('Login to add movie to your collection.');
      return !1;
    }

    this.props.addItemToWishlist(type, this.getItemData(), user.userId)
      .then(() => console.log(this.props));
  }

  deleteFromWishlist() {
    const { id, user, type } = this.props;

    if (!user.isLogin) {
      alert('Login to add movie to your collection.');
      return !1;
    }

    if (window.confirm('Delete item from wishlist?')) {
      this.props.deleteItemFromWishlist(type, id, user.userId);
    }
  }

  render() {
    const getGameRating = (rate) => {
      const percent = (rate / 5) * 100;
      const valFromPrecent = (percent * 10) / 100;
      return valFromPrecent.toFixed(2);
    };

    const {
      type, title, name, img, slug, id,
      user, genre_ids, vote_average, rating,
      genres, moviesGenres,
    } = this.props;

    const {
      wishlistItem,
    } = this.state;

    const i = img || 'https://uoslab.com/images/tovary/no_image.jpg';

    let itemGenres = [];
    if (genre_ids && moviesGenres) {
      itemGenres = genre_ids.map((id, i) => {
        const obj = moviesGenres.find((genre) => genre.id === id);
        return obj ? obj.name : null;
      });
    } else if (genres) {
      itemGenres = genres.map((genre) => genre.name);
    }

    const itemIds = user ? user[type].map((item) => item.id) : [];
    const searchItem = slug || id;

    return (

      <div className={`single-item ${type}`}>
        {user.data.group === 'admin'
          && <CollectionsSelector itemId={id} itemData={this.getItemData()} category={type} />}
        <div className="single-item__poster-wrap">
          <Link to={`/details/${type}/${searchItem}`}><img src={i} className="single-item__poster" alt="img" /></Link>
        </div>
        <div className="single-item__info">
          <div className="single-item__info--top">
            <h3 className="single-item__title"><Link to={`/details/${type}/${searchItem}`}>{title || name}</Link></h3>
            {itemGenres.length > 0
              && (
                <p className="single-item__genres">
                  <span>{itemGenres.join(', ')}</span>
                </p>
              )}
          </div>
          <div className="single-item__info--bottom">
            {vote_average || rating
              ? <p className="font-weight-medium">
                <i className="fas fa-star text-warning" style={{ fontSize: '10px' }}></i>
                {' '}
                {vote_average || getGameRating(rating)}
              </p>
              : null}
            <p className="ml-auto">
              {
                this.props.wishlist && this.state.wishlistItem
                  ? <>
                    <span className="text-info pointer mx-2" onClick={() => this.itemAction('watched')}>
                      <Icon prefix={wishlistItem.watched ? 'fas' : 'far'} name="flag" />
                    </span>
                    <span className="text-red pointer mx-2" title="like" onClick={() => this.itemAction('liked')}>
                      <Icon prefix={wishlistItem.liked ? 'fas' : 'far'} name="heart" />
                    </span>
                  </> : null
              }

              {
                user
                  ? itemIds.includes(id)
                    ? (
                      <span className="ml-auto pointer" title="Remove from wishlist" onClick={this.deleteFromWishlist}>
                        <Icon name="star text-warning" />
                      </span>
                    )
                    : (
                      <span className="ml-auto pointer" title="Add to wishlist" onClick={this.addToWishlist}>
                        <Icon prefix="far" name="star" />
                      </span>
                    ) : null
              }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  moviesGenres: state.collections.moviesGenres,
  collections: state.collections.collections,
});

export default connect(mapStateToProps, {
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
})(Item);
