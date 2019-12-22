import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../common/SliderCustom';
import Icon from '../../common/Icon';
import Item from '../../Item';

class CollectionSlider extends React.Component {
  render() {
    const getImage = (item) => {
      return item.poster_path ? `http://image.tmdb.org/t/p/w300${item.poster_path}` : item.background_image;
    }

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
      <div className="collections__wrap">
        <div className="d-flex justify-space-between align-items-center mb-4">
          <h3 className="mx-3">
            <Link to={`/collection/${category}/${alias}`}>{title}</Link>
          </h3>
          {userData.group === "admin" &&
            <Icon
              name="trash"
              onClick={() => removeColection(id)}
            />
          }
        </div>
        <Slider>
          {
            items.map((item) =>
              (<Item
                {...item}
                type={category}
                key={item.id}
                img={getImage(item)}
              />)
            )
          }
        </Slider>
      </div>
    )
  }
}

export default CollectionSlider;