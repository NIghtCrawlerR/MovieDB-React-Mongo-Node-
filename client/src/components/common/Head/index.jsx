import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function Head(props) {
  const {
    title,
    ogTitle,
    ogUrl,
    ogImage,
  } = props;

  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={ogTitle} />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:image" content={ogImage} />

    </Helmet>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  ogTitle: PropTypes.string,
  ogUrl: PropTypes.string,
  ogImage: PropTypes.string,
};

Head.defaultProps = {
  title: '',
  ogTitle: '',
  ogUrl: '',
  ogImage: '',
};

export default Head;
