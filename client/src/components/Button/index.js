import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Button = ({ onClick, children, type, className, variant }) => {
    return (
      <button
        type={type}
        className={classNames("Button", `Button--${variant}`, className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
  className: null,
  variant: "default",
};

export default Button;
