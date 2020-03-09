import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { NAVIGATION } from 'config/constants';
import './index.scss';

const Sidebar = ({ isLogin }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__nav">
        {NAVIGATION.map(item => (
          item.requireAuth && !isLogin
            ? null
            : (
              <div className="sidebar__item" key={item.id}>
                <NavLink activeClassName="active" to={item.link}>
                  <i className={item.icon} />
                </NavLink>
              </div>
            )
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default Sidebar;
