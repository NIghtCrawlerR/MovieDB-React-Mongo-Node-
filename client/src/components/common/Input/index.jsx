import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Input(props) {
  const {
    label, type, name, error, errorMessage, description, value, required, placeholder, onChange,
  } = props;
  return (
    <>
      {label
        ? <label><b>{label}</b></label>
        : null}
      <small>{description}</small>
      <input
        className="form-control"
        data-error={error}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value || ''}
        required={required}
      />
      {errorMessage}
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  errorMessage: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  label: '',
  type: '',
  name: '',
  error: '',
  errorMessage: '',
  description: '',
  value: '',
  required: false,
  placeholder: '',
};

export default Input;
