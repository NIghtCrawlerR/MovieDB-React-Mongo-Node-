import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../common/Icon';
import './index.css';

function Message(props) {
  const { message, close } = props;
  return (
    <div className={`message ${message.status}`}>
      <div
        className="close-message-button"
        role="button"
        tabIndex={0}
        onClick={close}
        onKeyUp={close}
      >
        <Icon name="times" />
      </div>
      <div className="d-flex">
        <div className="icon">
          {message.status === 'error'
            ? <Icon name="exclamation-circle" />
            : <Icon name="check-circle" />}
        </div>
        <div className="ml-4">
          <h3>{message.status}</h3>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  close: PropTypes.func.isRequired,
};

export default Message;
