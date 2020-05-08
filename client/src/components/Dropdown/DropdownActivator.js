import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DropdownActivator = ({ children, onClick, className }) => (
  <div
    className={classNames('dropdown-activator', className)}
    onClick={onClick}
  >
    {children}
  </div>
);

DropdownActivator.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

DropdownActivator.defaultProps = {
  className: null,
  onClick: () => {},
};

export default DropdownActivator;
