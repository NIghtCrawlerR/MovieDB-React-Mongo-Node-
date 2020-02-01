import React from 'react';
import PropTypes from 'prop-types';

export class If extends React.Component {
  static propTypes = {
    condition: PropTypes.any,
  };

  static defaultProps = {
    condition: null,
  };

  render() {
    const { condition, children } = this.props;

    if (condition) {
      return children;
    }
    return null;
  }
}

export class Else extends React.Component {
  render() {
    const { children } = this.props;

    return children;
  }
}

export class Choose extends React.Component {
  render() {
    const { children } = this.props;

    if (children[0].props.condition) {
      return children[0];
    }

    return children[1];
  }
}
