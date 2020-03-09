import React from 'react';
import { Link } from 'react-router-dom';

import SearchField from 'components/SearchField';
import Icon from 'components/common/Icon';
import UserMenu from './UserMenu';
import Dropdown from 'components/common/Dropdown';
import DropdownActivator from 'components/common/Dropdown/DropdownActivator';
import DropdownMenu from 'components/common/Dropdown/DropdownMenu';

import './index.scss';

const Header = ({ onClick, user: { email, isLogin } }) => {
  return (
    <nav className="header">
      <div className="header__content">
        <SearchField />

        {!isLogin ? (
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
              <DropdownMenu right>
                <UserMenu
                  email={email}
                  logout={onClick}
                />
              </DropdownMenu>
            </Dropdown>
          )}
      </div>
    </nav>
  );
}

export default Header;
