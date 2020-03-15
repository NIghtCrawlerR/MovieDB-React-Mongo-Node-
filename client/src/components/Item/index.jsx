import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Icon from 'components/Icon';
import CollectionsSelector from 'components/CollectionsSelector';
import Image from 'components/Image';
import { Choose, If, Else } from 'components/helpers/conditional-statement';
import { convertGameRating, getRatingColor } from 'lib';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
} from 'actions';

import './index.scss';

class Item extends Component {
  getItemData = () => {
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

  currentItem = () => {
    const { user, type, id } = this.props;
    return user[type].find(item => item.id === id);
  }

  itemAction = (action) => {
    const { type, user, updateWishlist } = this.props;
    const currentItem = this.currentItem();

    updateWishlist(type, action, currentItem.id, user.id, !currentItem[action]);
  }

  addToWishlist = () => {
    const { user, type, addItemToWishlist } = this.props;

    if (!user.isLogin) {
      alert('Login to add movie to your collection.');
      return !1;
    }

    addItemToWishlist(type, this.getItemData(), user.id);
  }

  deleteFromWishlist = () => {
    const { id, user, type, deleteItemFromWishlist } = this.props;

    if (!user.isLogin) {
      alert('Login to add movie to your collection.');
      return !1;
    }

    if (window.confirm('Delete item from wishlist?')) {
      deleteItemFromWishlist(type, id, user.id);
    }
  }

  render() {
    const {
      type, title, name, img, slug, id,
      user, genre_ids, vote_average, rating,
      genres, moviesGenres,
      wishlist,
    } = this.props;

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
    const currentItem = this.currentItem();
    const ratingValue = (+vote_average || convertGameRating(rating)).toFixed(1);

    return (
      <div className={`single-item ${type}`}>
        <If condition={user.group === 'admin'}>
          <CollectionsSelector itemId={id} itemData={this.getItemData()} category={type} />
        </If>
        <div className="single-item__poster-wrap">
          <Link to={`/details/${type}/${searchItem}`}>
            <Image
              path={img}
              className="single-item__poster"
            />
          </Link>
        </div>
        <div className="single-item__info">
          <div className="single-item__info--top">
            <h3 className="single-item__title"><Link to={`/details/${type}/${searchItem}`}>{title || name}</Link></h3>
            <If condition={itemGenres.length > 0}>
              <p className="single-item__genres">
                <span>{itemGenres.join(', ')}</span>
              </p>
            </If>
          </div>
          <div className="single-item__info--bottom">
            <If condition={vote_average || rating}>
              <p className={classNames("single-item__rating", getRatingColor(ratingValue))}>
                {ratingValue}
              </p>
            </If>
            <p className="single-item__actions">
              {
                wishlist && currentItem
                  ? <>
                    <span className="text-info" onClick={() => this.itemAction('watched')}>
                      <Icon prefix={currentItem.watched ? 'fas' : 'far'} name="flag" />
                    </span>
                    <span className="text-red" title="like" onClick={() => this.itemAction('liked')}>
                      <Icon prefix={currentItem.liked ? 'fas' : 'far'} name="heart" />
                    </span>
                  </> : null
              }

              <If condition={user}>
                <Choose>
                  <If condition={itemIds.includes(id)}>
                    <span className="ml-auto" title="Remove from wishlist" onClick={this.deleteFromWishlist}>
                      <Icon name="star text-warning" />
                    </span>
                  </If>
                  <Else>
                    <span className="ml-auto" title="Add to wishlist" onClick={this.addToWishlist}>
                      <Icon prefix="far" name="star" />
                    </span>
                  </Else>
                </Choose>
              </If>
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
