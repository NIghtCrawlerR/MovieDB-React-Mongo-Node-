import React from 'react';
import { Link } from 'react-router-dom';
import SearchField from 'components/SearchField';
import Icon from 'components/common/Icon';
import UserMenu from './UserMenu';
import Dropdown from 'components/common/Dropdown';
import DropdownActivator from 'components/common/Dropdown/DropdownActivator';
import DropdownMenu from 'components/common/Dropdown/DropdownMenu';
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
        email,
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
              <Dropdown>
                <DropdownActivator className="user-avatar">
                  <Icon name="user-circle" />
                </DropdownActivator>
                <DropdownMenu>
                  <UserMenu
                    email={email}
                    logout={this.logout}
                  />
                </DropdownMenu>
              </Dropdown>
            )}
        </div>
      </nav>
    );
  }
}

export default Header;
