import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { If } from '../../helpers/conditional-statement';
import Icon from '../Icon';
import './index.css';

const goBack = () => {
  window.history.back();
};

const PageTitle = props => {
  const { title, buttonBack } = props;

  return (
    <div className="page-title__wrap">
      <h3 className="page-title">{title}</h3>
      <If condition={buttonBack !== false}>
        <button className="btn btn-outline-info" onClick={() => goBack()}>
          <Icon name="arrow-left" />
          <span className="ml-2">Back</span>
        </button>
      </If>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  buttonBack: PropTypes.bool,
};

PageTitle.defaultProps = {
  buttonBack: true,
};

export default PageTitle;
