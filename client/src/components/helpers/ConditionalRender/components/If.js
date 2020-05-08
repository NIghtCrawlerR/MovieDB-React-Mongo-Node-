import PropTypes from 'prop-types';

const If = ({ condition, children }) => {
  if (condition) {
    return children;
  }
  return null;
};

If.propTypes = {
  condition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
};

If.defaultProps = {
  children: null,
};

export default If;
