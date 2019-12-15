import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../common/SliderCustom';
import Icon from '../../common/Icon';
import ItemsList from '../../ItemsList';
import Item from '../../Item';

class CollectionSlider extends React.Component {
  render() {
    const { collection: {
      id,
      title,
      alias,
      items,
    },
      category,
      userData,
      removeColection,
    } = this.props;

    return (
      <div>
        <div className="d-flex justify-space-between align-items-center">
          <h3 className="mr-3">
            <Link to={`/collection/${category}/${alias}`}>{title}</Link>
          </h3>
          {userData.group === "admin" &&
            <Icon
              name="trash"
              onClick={() => removeColection(id)}
            />
          }
        </div>
        <ItemsList items={items} type={category} />
      </div>
    )
  }
}

export default CollectionSlider;