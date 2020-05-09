import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import './index.scss';

const Checkbox = ({ label, checked, ...rest }) => {
  const id = uuidv4();

  return (
    <div className="Checkbox__wrap">
      <input
        type="checkbox"
        className="Checkbox"
        id={id}
        {...rest}
      />
      {label && <label htmlFor={id} className="Checkbox__label">{label}</label>}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  label: null,
};


export default Checkbox;
