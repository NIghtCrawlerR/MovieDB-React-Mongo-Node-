import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';

import ItemsList from 'components/ItemsList';
import Head from 'components/Head';
import { Loader } from 'components/UI';

import { getWishlist } from 'actions';

const List = ({
  match: { params: { collection } },
  filterParams,
  searchQuery,
}) => {
  const [loading, setLoading] = useState(false);

  const user = useSelector(({ user }) => user);
  const wishlist = useSelector(({ wishlist }) => wishlist);
  const dispatch = useDispatch();

  const getList = (collection) => {
    const ids = get(user, collection, []).map((item) => item.id);

    if (ids.length) {
      setLoading(true);

      dispatch(getWishlist(collection, ids))
        .then(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    getList(collection);
  }, []);

  useEffect(() => {
    getList(collection);
  }, [collection, user]);

  const filtered = (items) => {
    const wishlistItems = get(user, collection, []);

    const filteredItems = wishlistItems.filter((item) => Object.keys(filterParams).every((key) => {
      const filterValue = filterParams[key] !== '0';

      return filterValue === item[key];
    }));

    const ids = filteredItems.map(({ id }) => id);

    return items.filter(({ id }) => ids.includes(id));
  };

  const filterByQuery = (items) => {
    const filteredItems = items.filter((item) => {
      const title = (item.title || '').toLowerCase();
      return title.includes(searchQuery);
    });

    return filteredItems;
  };

  const items = get(wishlist, collection, []);

  if (loading) return <Loader />;
  return (
    <>
      <Head title={`Fiction finder - wishlist - ${collection}`} />
      <ItemsList
        wishlist
        items={filterByQuery(filtered(items))}
        type={collection}
      />
    </>
  );
}

export default withRouter(List);
