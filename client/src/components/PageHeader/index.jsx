import React from 'react';
import PropTypes from 'prop-types';

import { If } from 'components/helpers/ConditionalRender';

import bg from 'assets/images/bg2.jpg';
import './index.scss';

const PageHeader = ({ title, text, image }) => (
  <div className="page-header">
    <img className="page-header__background" src={image || bg} alt="" />
    <div className="container-fluid">
      <div className="page-header__content">
        <h3 className="page-header__title">{title}</h3>
        <If condition={text}>
          <p className="page-header__text">{text}</p>
        </If>
      </div>
    </div>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  image: PropTypes.string,
};

PageHeader.defaultProps = {
  text: '',
  image: '',
};

export default PageHeader;
