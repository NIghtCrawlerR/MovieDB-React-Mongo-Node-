import React, { Component } from 'react';
import Item from '../Item'
import Loader from '../common/Loader'

import './index.css'

const MOVIE_POSTER_BASEURL = 'http://image.tmdb.org/t/p/w300';

export default class List extends Component {
  render() {
    const { loading, items, wishlist, type } = this.props;

    return (
      <React.Fragment>
        {
          loading ?
            <Loader /> :
            <div className="items__wrap">
              {
                items && items.length > 0 ?
                  items.map((item, i) => (
                    <Item 
                      key={i}
                      wishlist={wishlist}
                      {...item}
                      type={type}
                      img={item.poster_path ? `${MOVIE_POSTER_BASEURL}${item.poster_path}` : item.background_image} />
                  ))
                  :
                  <p>No data</p>
              }
            </div>
        }
      </React.Fragment>
    )
  }
}