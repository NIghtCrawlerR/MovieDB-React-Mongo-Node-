import React from 'react';
import { Link } from 'react-router-dom';
import SearchField from '../../SearchField';
import Icon from '../../common/Icon';
import UserPopup from './UserPopup';
import './index.scss';

class Header extends React.Component {
  constructor() {
    super();

    this.userPopup = React.createRef();
  }

  showPopup = () => {
    this.userPopup.current.instanceRef.open();
  };

  logout = (e) => {
    const { onClick } = this.props;
    onClick(e);
  }

  render() {
    const {
      user,
      user: {
        data,
      },
    } = this.props;

    return (
      <nav className="header">
        <div className="header__content">
          <SearchField />
          {!user.isLogin ? (
            <div className="header__links">
              <Link to="/login">Login</Link>
              |
              <Link to="/register">Register</Link>
            </div>
          ) : (
              <span
                onClick={this.showPopup}
                className="profile-icon"
              >
                <Icon name="user-circle" />
                <UserPopup
                  ref={this.userPopup}
                  email={data.email}
                  logout={this.logout}
                />
              </span>
            )}
        </div>
      </nav>
    );
  }
}

export default Header;
