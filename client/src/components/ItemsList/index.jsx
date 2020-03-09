import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item'
import Loader from '../common/Loader'
import { Choose, If, Else } from '../helpers/conditional-statement';

import { MOVIE_POSTER_BASEURL } from 'config/constants';

import './index.css'

export default class List extends Component {
  render() {
    const { loading, items, wishlist, type } = this.props;

    const getImage = (item) => {
      const { poster_path, background_image } = item;
      return poster_path ? `${MOVIE_POSTER_BASEURL()}${poster_path}` : background_image;
    }

    if (!items || !items.length) {
      return (
        <div className="default-stub">
          <p className="default-stub__text">You have no items in this category.</p>
          <Link to={`/collections/${type}`} className="default-stub__link">Start searching</Link>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Choose>
          <If condition={loading}>
            <Loader />
          </If>
          <Else>
            <div className="items__wrap">
              {
                items.map((item, i) => {
                  if (!item) return null;

                  return (
                    <Item
                      key={i}
                      wishlist={wishlist}
                      {...item}
                      type={type}
                      img={getImage(item)}
                    />
                  )
                })
              }
            </div>
          </Else>
        </Choose>
      </React.Fragment>
    )
  }
}