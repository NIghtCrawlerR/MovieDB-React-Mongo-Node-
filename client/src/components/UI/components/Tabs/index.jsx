import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Choose, If, Else } from 'components/helpers/ConditionalRender';

import './index.scss';


const Tabs = ({ tabs, path, link, onSwitch }) => {
  const [activeTab, setActive] = useState(tabs[0].value);

  const switchTab = value => {
    setActive(value);
    onSwitch(value);
  }

  return (
    <div className="tabs nav">
      {tabs.map(({ value, title }) => (
        <div
          key={value}
          className="tab-item nav-item"
          onClick={() => switchTab(value)}
        >
          <Choose>
            <If condition={!!link}>
              <NavLink to={`${path}/${value}`} className="nav-link">
                {title}
              </NavLink>
            </If>
            <Else>
              <div className={classNames('nav-link', {
                active: activeTab === value,
              })}
              >
                {title}
              </div>
            </Else>
          </Choose>
        </div>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  })),
  path: PropTypes.string,
  onSwitch: PropTypes.func,
  link: PropTypes.bool,
};

Tabs.defaultProps = {
  tabs: [],
  path: '',
  link: false,
  onSwitch: () => { },
};

export default Tabs;
