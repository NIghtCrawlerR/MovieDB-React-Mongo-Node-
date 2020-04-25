import React from 'react';

import Icon from 'components/Icon';
import { Choose, If, Else } from 'components/helpers/conditional-statement';

const ItemActions = ({
  wishlist,
  currentItem,
  user,
  itemIds,
  id,
  deleteFromWishlist,
  addToWishlist,
  itemAction,
}) => {
  return (
    <div className="single-item__actions">
      {
        wishlist && currentItem
          ? <>
            <span className="text-info" onClick={() => itemAction('watched')}>
              <Icon prefix={currentItem.watched ? 'fas' : 'far'} name="flag" />
            </span>
            <span className="text-red" title="like" onClick={() => itemAction('liked')}>
              <Icon prefix={currentItem.liked ? 'fas' : 'far'} name="heart" />
            </span>
          </> : null
      }

      <If condition={user}>
        <Choose>
          <If condition={itemIds.includes(id)}>
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
}

export default ItemActions;