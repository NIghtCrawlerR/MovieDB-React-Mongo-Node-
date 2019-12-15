import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchField from '../../SearchField';
import Icon from '../../common/Icon';
import './index.css';

const UserIcon = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="action text-white navbar__user-icon"
  >
    <Icon name="user-circle" />
  </span>
));

class Header extends React.Component {
  logout(e) {
    this.props.onClick(e);
  }

  render() {
    const {
      user,
      user: {
        data,
      },
    } = this.props;

    return (
      <nav className="header navbar bg-red">
        <div className="container-fluid">
          <SearchField />
          <div>
            {!user.isLogin ? (
              <div className="sign-in-buttons">
                <Link to="/login">Login</Link>
                |
                <Link to="/register">Register</Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Dropdown alignRight className="user-menu">
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
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
