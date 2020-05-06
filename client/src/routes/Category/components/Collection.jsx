import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Icon } from 'components/UI';
import ItemsList from 'components/ItemsList';

const Collection = ({
  collection: {
    id,
    title,
    alias,
    items,
  },
  category,
  userData,
  removeColection,
}) => (
  <div className="collection-group">
    <div className="collection-group__header">
      <h3 className="collection-group__title">
        <Link to={`/collection/${category}/${alias}`}>{title}</Link>
      </h3>
      {userData.isAdmin
          && (
            <Icon
              name="trash"
              onClick={() => removeColection(id)}
            />
          )}
    </div>
    <ItemsList items={items} type={category} />
  </div>
);

Collection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    alias: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
  category: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    isAdmin: PropTypes.bool,
  }).isRequired,
  removeColection: PropTypes.func.isRequired,
};

export default Collection;
