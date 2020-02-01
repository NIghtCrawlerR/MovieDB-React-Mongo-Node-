import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { If } from '../../helpers/conditional-statement';
import Icon from '../Icon';
import './index.css';

function PageTitle(props) {
  const { title, buttonBack } = props;

  return (
    <div className="page-title__wrap">
      <h3 className="page-title">{title}</h3>
      <If condition={buttonBack !== false}>
        <Link className="btn btn-outline-info" to="/">
          <Icon name="arrow-left" />
          Go back
        </Link>
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
