import React from 'react';
import classNames from 'classnames';

class DropdownMenu extends React.Component {
  render() {
    const {
      children, isOpen, left, right,
    } = this.props;

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
  }
}

export default DropdownMenu;
