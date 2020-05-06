import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Icon } from 'components/UI';
import { Choose, If, Else } from 'components/helpers/ConditionalRender';

const ItemActions = ({
  wishlist,
  currentItem,
  user,
  itemIds,
  id,
  deleteFromWishlist,
  addToWishlist,
  itemAction,
}) => (
  <div className="single-item__actions">
    <If condition={wishlist && currentItem}>
      <span className="text-info" onClick={() => itemAction('watched')}>
        <Icon prefix={get(currentItem, 'watched', false) ? 'fas' : 'far'} name="flag" />
      </span>
      <span className="text-red" title="like" onClick={() => itemAction('liked')}>
        <Icon prefix={get(currentItem, 'liked', false) ? 'fas' : 'far'} name="heart" />
      </span>
    </If>

    <If condition={user}>
      <Choose>
        <If condition={!!itemIds.includes(id)}>
          <span className="ml-auto" title="Remove from wishlist" onClick={deleteFromWishlist}>
            <Icon name="star text-warning" />
          </span>
        </If>
        <Else>
          <span className="ml-auto" title="Add to wishlist" onClick={addToWishlist}>
            <Icon prefix="far" name="star" />
          </span>
        </Else>
      </Choose>
    </If>
  </div>
);

ItemActions.propTypes = {
  wishlist: PropTypes.bool,
  currentItem: PropTypes.shape({
    watched: PropTypes.bool,
    liked: PropTypes.bool,
  }),
  user: PropTypes.object,
  itemIds: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.number.isRequired,
  deleteFromWishlist: PropTypes.func.isRequired,
  addToWishlist: PropTypes.func.isRequired,
  itemAction: PropTypes.func.isRequired,
};

ItemActions.defaultProps = {
  wishlist: false,
  currentItem: {},
  user: {},
  itemIds: [],
};

export default ItemActions;
