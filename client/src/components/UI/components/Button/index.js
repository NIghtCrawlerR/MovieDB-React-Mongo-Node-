import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Button = ({
  onClick, children, type, className, variant, outlined,
}) => (
  <button
    type={type}
    className={classNames('Button', `Button--${variant}`, className, {
      'Button--outlined': outlined,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  outlined: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  className: null,
  variant: 'default',
  outlined: false,
};

export default Button;
