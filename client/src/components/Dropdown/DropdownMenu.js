import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DropdownMenu = ({ children, isOpen, left, right }) => {
  if (!isOpen) return null;

  return (
    <div className={classNames('dropdown-menu', {
      'dropdown-menu--left': left,
      'dropdown-menu--right': right,
    })}
    >
      {children}
    </div>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

DropdownMenu.defaultProps = {
  left: true,
  right: false,
};

export default DropdownMenu;
