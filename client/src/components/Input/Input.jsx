import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { If } from 'components/helpers/conditional-statement';

import './index.scss';

class Input extends React.Component {
  render() {
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
      onClick,
    } = this.props;

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
          onClick={onClick}
          value={value || ''}
          required={required}
          readOnly={readonly}
          autoComplete="off"
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
  onChange: PropTypes.func,
  onClick: PropTypes.func,
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
  onChange: () => { },
  onClick: () => { },
};

export default Input;
