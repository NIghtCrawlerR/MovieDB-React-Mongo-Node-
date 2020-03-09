import React from 'react';
import classNames from 'classnames';

class DropdownActivator extends React.Component {
  render() {
    const { children, onClick, className } = this.props;

    return (
      <div
        className={classNames("dropdown-activator", className)}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}

export default DropdownActivator;