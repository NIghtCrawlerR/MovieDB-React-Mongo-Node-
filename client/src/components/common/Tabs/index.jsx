import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

function Tabs(props) {
  const { tabs, onSelect, path } = props;

  return (
    <div onSelect={onSelect} className="tabs nav mb-5">
      {
        tabs.map((tab) => (
          <div key={tab.value} className="tab-item nav-item">
            <NavLink to={`/${path}/${tab.value}`} className="nav-link">
              {tab.title}
            </NavLink>
          </div>
        ))
      }
    </div>
  );
}

export default Tabs;
