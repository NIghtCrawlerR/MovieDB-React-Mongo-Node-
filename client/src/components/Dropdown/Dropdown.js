import React from 'react';
import onClickOutside from "react-onclickoutside";

import DropdownActivator from './DropdownActivator';
import DropdownMenu from './DropdownMenu';

import './index.scss';

class Dropdown extends React.Component {
  state = {
    isOpen: false,
  };

  toggleDropdown = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };


  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  };

  renderActivator = children => {
    const body = children.find(({ type }) => type === DropdownActivator);
    const { className } = body.props;

    return (
      <DropdownActivator
        className={className}
        onClick={this.toggleDropdown}
      >
        {body.props.children}
      </DropdownActivator>
    );
  }

  renderMenu = children => {
    const body = children.find(({ type }) => type === DropdownMenu);
    const { isOpen } = this.state;
    const { left, right } = body.props;

    return (
      <DropdownMenu
        isOpen={isOpen}
        left={left}
        right={right}
      >
        {body.props.children}
      </DropdownMenu>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className="dropdown-container">
        {this.renderActivator(children)}
        {this.renderMenu(children)}
      </div>
    )
  }
}

export default onClickOutside(Dropdown);