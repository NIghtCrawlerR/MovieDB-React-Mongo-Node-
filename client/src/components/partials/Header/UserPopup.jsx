import React from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";

class UserPopup extends React.Component {
  state = {
    isOpen: false,
  };

  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  };

  open = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { isOpen } = this.state;
    const { logout, email } = this.props;

    if (!isOpen) return null;

    return (
      <div className="popup">
        <div className="popup__header">
          {email}
        </div>
        <div className="list">
          <Link to="/wishlist" className="list-item">My wishlist</Link>
          <Link to="/logout" className="list-item" onClick={logout}>Logout</Link>
        </div>
      </div>
    );
  }
}

export default onClickOutside(UserPopup);
