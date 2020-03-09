import React from 'react';
import { Link } from 'react-router-dom';

const UserPopup = ({ logout, email }) => {
  return (
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
}

export default UserPopup;
