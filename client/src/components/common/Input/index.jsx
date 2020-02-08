import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { If } from '../../helpers/conditional-statement';

import './index.scss';

function Input(props) {
  const {
    label,
    type,
    name,
    error,
    errorMessage,
    description,
    value,
    required,
    readonly,
    placeholder,
    onChange,
  } = props;
  return (
    <div className="input__group">
      <input
        className={classNames("input__field", {
          active: value.length > 0,
        })}
        data-error={error}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value || ''}
        required={required}
        readOnly={readonly}
      />
      <If condition={label}>
        <label className="input__label">{label}</label>
      </If>
      <If condition={description}>
        <small>{description}</small>
      </If>
      {errorMessage}
    </div>
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
  type: 'text',
  name: '',
  error: '',
  errorMessage: '',
  description: '',
  value: '',
  required: false,
  placeholder: '',
};

export default Input;
