import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ prefix, name, onClick }) => (
  <i className={`${prefix} fa-${name}`} onClick={onClick} />
);

Icon.propTypes = {
  prefix: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  prefix: 'fas',
  onClick: () => {},
};

export default Icon;
