import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { If } from 'components/helpers/conditional-statement';

import './index.scss';

class Input extends React.Component {
  static propTypes = {
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
    outlined: PropTypes.bool,
    checked: PropTypes.bool,
  };

  static defaultProps = {
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
    outlined: false,
    checked: false,
  };

  render() {
    const {
      label,
      type,
      errorMessage,
      description,
      value,
      outlined,
    } = this.props;

    const id = uuidv4();

    return (
      <div className="input__group">
        <input
          id={id}
          className={classNames({
            active: value.length > 0,
            "input__field--outlined": outlined,
            "input__field": type !== "checkbox",
            "checkbox": type === "checkbox",
          })}
          {...this.props}
        />
        <If condition={label}>
          <label htmlFor={id} className="input__label">{label}</label>
        </If>
        <If condition={description}>
          <small>{description}</small>
        </If>
        {errorMessage}
      </div>
    );
  }
}


export default Input;
