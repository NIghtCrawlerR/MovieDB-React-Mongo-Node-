import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Button = ({
  onClick, children, className, variant, outlined,
}) => (
  <button
    type="button"
    className={classNames('Button', `Button--${variant}`, className, {
      'Button--outlined': outlined,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  outlined: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
  className: null,
  variant: 'default',
  outlined: false,
};

export default Button;
