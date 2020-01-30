import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../common/Icon';
import ItemsList from '../../ItemsList';

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
        <ItemsList items={items} type={category} />
      </div>
    )
  }
}

export default Collection;