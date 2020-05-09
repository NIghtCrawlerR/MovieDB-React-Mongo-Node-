import React from 'react';
import { Link } from 'react-router-dom';

import { Loader } from 'components/UI';
import { Choose, If, Else } from 'components/helpers/ConditionalRender';
import Item from '../Item';

import './index.css';

const List = ({ loading, items, wishlist, type }) => {
  const noData = !loading && (!items || !items.length);

  if (noData) {
    return (
      <div className="default-stub">
        <p className="default-stub__text">You have no items in this category.</p>
        <Link to={`/collections/${type}`} className="default-stub__link">Start searching</Link>
      </div>
    );
  }

  return (
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
  );
}

export default List;
