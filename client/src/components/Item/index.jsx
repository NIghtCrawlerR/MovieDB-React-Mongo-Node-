import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { get } from 'lodash';

import { Image } from 'components/UI';
import CollectionsSelector from 'components/CollectionsSelector';
import { If } from 'components/helpers/ConditionalRender';
import { getRatingColor } from 'lib';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
} from 'actions';
import ItemActions from './components/ItemActions';

import './index.scss';

class Item extends Component {
  prepareItemData = () => {
    const {
      id, slug, title, genres, poster, rating, type,
    } = this.props;

    return {
      id,
      slug,
      title,
      genres,
      poster,
      rating,
      itemType: type,
    };
  }

  currentItem = () => {
    const { user, type, id } = this.props;
    return user[type].find((item) => item.id === id);
  }

  itemAction = (action) => {
    const { type, user, updateWishlist } = this.props;
    const currentItem = this.currentItem();

    updateWishlist(type, action, currentItem.id, user.id, !currentItem[action]);
  }

  addToWishlist = () => {
    const { user, type, addItemToWishlist } = this.props;

    addItemToWishlist(type, this.prepareItemData(), user.id);
  }

  deleteFromWishlist = () => {
    const {
      id, user, type, deleteItemFromWishlist,
    } = this.props;

    deleteItemFromWishlist(type, id, user.id);
  }

  getGenres = (genres) => {
    const { moviesGenres } = this.props;

    if (!genres) return [];

    if (typeof genres[0] === 'number') {
      return genres.map((id) => {
        const genre = moviesGenres.find((genre) => genre.id === id);
        return get(genre, 'name');
      });
    }

    return genres.map((genre) => genre.name);
  }

  render() {
    const {
      type, title, slug, id,
      user, rating,
      genres,
      wishlist,
      poster,
    } = this.props;

    const itemGenres = this.getGenres(genres, type);

    const itemIds = user ? (user[type] || []).map((item) => item.id) : [];

    const currentItem = this.currentItem();
    const ratingValue = rating;

    return (
      <div className={`single-item ${type}`}>
        <If condition={user.isAdmin}>
          <CollectionsSelector itemId={id} itemData={this.prepareItemData()} category={type} />
        </If>
        <div className="single-item__poster-wrap">
          <Link to={`/details/${type}/${slug || id}`}>
            <Image
              path={poster}
              className="single-item__poster"
            />
          </Link>
        </div>
        <div className="single-item__info">
          <div className="single-item__info--top">
            <h3 className="single-item__title">
              <Link to={`/details/${type}/${slug || id}`}>{title}</Link>
            </h3>
            <If condition={itemGenres.length > 0}>
              <p className="single-item__genres">
                <span>{itemGenres.join(', ')}</span>
              </p>
            </If>
          </div>
          <div className="single-item__info--bottom">
            <If condition={rating}>
              <p className={classNames('single-item__rating', getRatingColor(ratingValue))}>
                {ratingValue}
              </p>
            </If>
            <ItemActions
              wishlist={wishlist}
              currentItem={currentItem}
              user={user}
              itemIds={itemIds}
              id={id}
              deleteFromWishlist={this.deleteFromWishlist}
              addToWishlist={this.addToWishlist}
              itemAction={this.itemAction}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  user,
  collections: { moviesGenres, collections },
}) => ({
  user,
  moviesGenres,
  collections,
});

export default connect(mapStateToProps, {
  addItemToWishlist,
  deleteItemFromWishlist,
  updateWishlist,
})(Item);
