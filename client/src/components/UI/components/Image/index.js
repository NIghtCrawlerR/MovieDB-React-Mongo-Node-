import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const DEFAULT_IMAGE = 'https://uoslab.com/images/tovary/no_image.jpg';

const Image = ({ path, size, className }) => {
  const getImageUrl = () => {
    if (!path) return DEFAULT_IMAGE;

    return path.includes('https://') ? path : `http://image.tmdb.org/t/p/w${size}${path}`;
  };

  return (
    <img
      className={classNames('Image', className)}
      src={`${getImageUrl()}`}
      alt=""
    />
  );
};

Image.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};

Image.defaultProps = {
  path: DEFAULT_IMAGE,
  className: null,
  size: 300,
};


export default Image;
