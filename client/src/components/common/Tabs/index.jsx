import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';

function Tabs(props) {
  const { tabs, onSelect, path, link, active } = props;

  return (
    <div className="tabs nav mb-3">
      {
        tabs.map((tab) => (
          <div
            key={tab.value}
            className="tab-item nav-item"
            onClick={() => onSelect(tab.value)}
          >
            {link ?
              <NavLink to={`${path}/${tab.value}`} className="nav-link">
                {tab.title}
              </NavLink>
              :
              <div to={`${path}/${tab.value}`} className={`nav-link ${active === tab.value ? 'active' : ''}`}>
                {tab.title}
              </div>
            }
          </div>
        ))
      }
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.array,
  path: PropTypes.string,
  onSelect: PropTypes.func,
};

Tabs.defaultProps = {
  tabs: [],
  path: "",
  onSelect: () => { },
};


export default Tabs;
