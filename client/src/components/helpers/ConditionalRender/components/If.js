import React from 'react';
import PropTypes from 'prop-types';

export default class If extends React.Component {
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
