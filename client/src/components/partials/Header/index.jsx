import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchField from '../../SearchField';
import Icon from '../../common/Icon';
import './index.scss';

const UserIcon = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="profile-icon"
  >
    <Icon name="user-circle" />
  </span>
));

class Header extends React.Component {
  logout(e) {
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
              <Dropdown alignRight>
                <Dropdown.Toggle as={UserIcon}></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header className="text-right">
                    {data
                      ? <b>{data.email}</b>
                      : null}
                  </Dropdown.Header>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Link to="/wishlist" className="dropdown-item text-info">My wishlist</Link>
                  <Link to="/logout" className="dropdown-item text-info" onClick={this.logout.bind(this)}>Logout</Link>
                </Dropdown.Menu>
              </Dropdown>
            )}
        </div>
      </nav>
    );
  }
}

export default Header;
