import React from 'react';

class DropdownMenu extends React.Component {
  render() {
    const { children, isOpen } = this.props;

    if (!isOpen) return null;

    return (
      <div className="dropdown-menu">
        {children}
      </div>
    )
  }
}

export default DropdownMenu;