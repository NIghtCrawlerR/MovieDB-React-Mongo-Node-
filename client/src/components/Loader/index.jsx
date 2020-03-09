import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Loader(props) {
  const { overlay } = props;

  return (
    <div className={`${overlay ? 'spinner__wrap' : ''}`}>
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

Loader.propTypes = {
  overlay: PropTypes.bool,
};

Loader.defaultProps = {
  overlay: false,
};

export default Loader;
