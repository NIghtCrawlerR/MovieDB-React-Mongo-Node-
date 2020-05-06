import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPopup = ({ logout, email }) => (
  <div className="user-menu">
    <div className="user-menu__header">
      {email}
    </div>
    <div className="list">
      <Link to="/wishlist" className="list-item">My wishlist</Link>
      <Link to="/logout" className="list-item" onClick={logout}>Logout</Link>
    </div>
  </div>
);

UserPopup.propTypes = {
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserPopup;
