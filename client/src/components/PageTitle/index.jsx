import React from 'react';
import PropTypes from 'prop-types';

import { If } from 'components/helpers/conditional-statement';
import Icon from 'components/Icon';
import Button from 'components/Button';
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
        <Button outlined onClick={() => goBack()}>
          <Icon name="arrow-left" />
          <span className="ml-2">Back</span>
        </Button>
      </If>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
  buttonBack: PropTypes.bool,
};

PageTitle.defaultProps = {
  title: "",
  buttonBack: true,
};

export default PageTitle;
