import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

const Route = ({ children, privateRoute, ...rest }) => {
  const token = localStorage.getItem('token');

  if (privateRoute && !token) {
    return <Redirect to="/login" />;
  }

  return (
    <ReactRoute {...rest}>
      {children}
    </ReactRoute>
  );
};

Route.propTypes = {
  privateRoute: PropTypes.bool,
  children: PropTypes.node,
};

Route.defaultProps = {
  privateRoute: false,
  children: null,
};

export default Route;
