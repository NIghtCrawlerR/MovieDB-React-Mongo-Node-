import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Loader = ({ overlay }) => (
  <div className={classNames('Loader', {
    Loader__overlay: overlay,
  })}
  >
    <div className="Loader__inner">
      <div className="Loader__spinner" />
    </div>
  </div>
);

Loader.propTypes = {
  overlay: PropTypes.bool,
};

Loader.defaultProps = {
  overlay: false,
};

export default Loader;
