import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';

function BrickTabs(props) {
  const {
    main,
    path,
    tabs,
  } = props;

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.value}
          activeClassName="active"
          className={`nav-link tab-container ${main ? 'main' : ''}`}
          to={`${path}/${tab.link}`}
        >
          {/* <img src={tab.img} alt="" /> */}
          <div className="tab-body">
            <h3 className="tab-title">
              {tab.title}
            </h3>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

BrickTabs.propTypes = {
  main: PropTypes.bool.isRequired,
  path: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

BrickTabs.defaultProps = {
  path: '',
};

export default BrickTabs;
