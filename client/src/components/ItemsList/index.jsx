import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from 'components/UI'
import Item from '../Item'
import { Choose, If, Else } from 'components/helpers/ConditionalRender';

import './index.css'

export default class List extends Component {
  render() {
    const { loading, items, wishlist, type } = this.props;

    if (!loading && (!items || !items.length)) {
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
              {items.map((item, i) => (
                <Item
                  key={i}
                  {...item}
                  wishlist={wishlist}
                  type={type}
                />
              ))}
            </div>
          </Else>
        </Choose>
      </React.Fragment>
    )
  }
}