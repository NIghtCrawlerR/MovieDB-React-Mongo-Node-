import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import './index.scss';

const Input = (props) => {

  const {
    type,
    error,
    className,
    outlined,
    label,
    value,
    errorMessage,
    ...rest
  } = props;

  const id = uuidv4();

  return (
    <div className="input__wrap">
      <input
        className={classNames('input', `input--${type}`, className, {
          'input--outlined': outlined,
          'input--error': error,
          'input--active': !!value,
        })}
        id={id}
        type={type}
        value={value}
        {...rest}
      />
      {label && <label className="input__label">{label}</label>}
      {errorMessage && errorMessage}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  checked: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  error: '',
  errorMessage: '',
  value: '',
  required: false,
  placeholder: '',
  onChange: () => { },
  onClick: () => { },
  outlined: false,
  checked: false,
};


export default Input;
