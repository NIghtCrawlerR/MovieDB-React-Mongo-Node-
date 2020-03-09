import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
  const { prefix, name, onClick } = props;

  return (
    <i className={`${prefix} fa-${name}`} onClick={onClick} />
  );
}

Icon.propTypes = {
  prefix: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  prefix: 'fas',
};

export default Icon;
