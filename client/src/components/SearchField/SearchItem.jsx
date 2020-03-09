import React from 'react';
import { Link } from 'react-router-dom';

import Image from 'components/Image';

const SearchItem = ({
  category,
  item: {
    slug,
    id,
    poster_path,
    background_image,
    name,
    title,
    released,
    release_date,
    first_air_date,
    overview,
  },
}) => {
  const releaseData = (date) => {
    return `(${new Date(date).getFullYear()})` || null;
  }

  return (
    <Link to={`/details/${category}/${slug || id}`} key={id}>
      <div className="search-item">
        <div className="search-item__image">
          <Image path={poster_path || background_image} />
        </div>

        <div className="search-item__body">
          <h5>
            {name || title}
            {releaseData(released || release_date || first_air_date)}
          </h5>
          <p>{overview ? `${overview.slice(0, 100)}...` : null}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchItem;
