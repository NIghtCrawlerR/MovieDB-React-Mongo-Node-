import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Choose, If, Else } from 'components/helpers/conditional-statement';

import './index.scss';

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
            <Choose>
              <If condition={link}>
                <NavLink to={`${path}/${tab.value}`} className="nav-link">
                  {tab.title}
                </NavLink>
              </If>
              <Else>
                <div to={`${path}/${tab.value}`} className={classNames("nav-link", {
                  active: active === tab.value, 
                })}>
                  {tab.title}
                </div>
              </Else>
            </Choose>
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
