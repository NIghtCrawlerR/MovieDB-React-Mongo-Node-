import React from 'react';
import PropTypes from 'prop-types';
import bg from '../../../assets/bg2.jpg';
import './index.css';

function PageHeader(props) {
  const { title, text, image } = props;
  const background = image || bg;

  return (
    <div className="page-header">
      <img src={background} alt="" />
      <div className="container-fluid">
        <div className="page-header__content">
          <div className="page-header__title">
            <h3>{title}</h3>
          </div>
          {text && <p className="page-header__text">{text}</p>}
        </div>
      </div>
    </div>
  );
}

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
