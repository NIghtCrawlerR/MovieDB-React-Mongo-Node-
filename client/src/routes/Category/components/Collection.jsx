import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import ItemsList from 'components/ItemsList';

class Collection extends React.Component {
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
      <div className="collection-group">
        <div className="collection-group__header">
          <h3 className="collection-group__title">
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

export default Collection;