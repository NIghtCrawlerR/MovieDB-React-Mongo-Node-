import React from 'react';
import axios from 'axios';

import './index.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });

    if (process.env.NODE_ENV === "production") {
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
    if (this.state.hasError) {
      return (
        <div className="error__wrap">
          <h2>Oops, something went wrong :(</h2>
          <p>The error: {this.state.error.toString()}</p>
          <p>Where it occured: {this.state.info.componentStack}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;