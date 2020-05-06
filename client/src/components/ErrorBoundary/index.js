import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './index.scss';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    hasError: false,
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });

    if (process.env.NODE_ENV === 'production') {
      this.sendLog(error, info);
    }
  }

  sendLog = (error, info) => {
    const report = {
      title: error.toString(),
      body: info.componentStack,
      date: new Date(),
    };

    axios.post('/api/movies/bugreport', report);
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="error__wrap">
          <h2>Oops, something went wrong :(</h2>
          <p>
            The error:
            {error.toString()}
          </p>
          <p>
            Where it occured:
            {info.componentStack}
          </p>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
