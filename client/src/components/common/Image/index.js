import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ path, size, className }) => {
  const imageBaseUrl = () => {
    return path.includes('https://') ? '' : `http://image.tmdb.org/t/p/w${size}`;
  };

  return (
    <img className={className} src={`${imageBaseUrl()}${path}`} alt="" />
  );
}

Image.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
}

Image.defaultProps = {
  path: 'https://uoslab.com/images/tovary/no_image.jpg',
  className: '',
  size: 300,
};


export default Image;
