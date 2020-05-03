import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'components/UI';
import Dropdown from 'components/Dropdown';
import DropdownActivator from 'components/Dropdown/DropdownActivator';
import DropdownMenu from 'components/Dropdown/DropdownMenu';
import SearchField from './components/SearchField';
import UserMenu from './UserMenu';

import './index.scss';

const Header = ({ logout, user: { email, isLogin } }) => {
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
                  logout={logout}
                />
              </DropdownMenu>
            </Dropdown>
          )}
      </div>
    </nav>
  );
}

export default Header;
