import React from 'react';
import PropTypes from 'prop-types';

class For extends React.Component {
  static propTypes = {
    arr: PropTypes.array.isRequired,
  };

  render() {
    const { arr, render } = this.props;

    return (
      arr.map((item) => {
        render(item)
      })
    );
  }
}

export default For;