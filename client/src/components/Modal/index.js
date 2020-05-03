import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'components/UI';
import { If } from '../helpers/ConditionalRender';

import { toggleModal } from 'actions';

import './index.scss';

class Modal extends React.Component {
  closeModal = () => {
    const { toggleModal } = this.props;

    toggleModal(false, null)
  }

  render() {
    const { settings: { isModalOpen, errorBody } } = this.props;

    if (!isModalOpen) return null;

    return (
      <div className="modal__overlay">
        <div className="modal__wrap">
          <div className="modal__close">
            <Icon
              name="times"
              onClick={this.closeModal}
            />
          </div>

          <div className="modal__body">
            <div className="modal__title">
              Ooops! Something went wrong.
            </div>
            <div className="modal__text">
              <If condition={errorBody && errorBody.message}>
                <p>{errorBody.message}</p>
              </If>
              <If condition={errorBody}>
                <p>{JSON.stringify(errorBody)}</p>
              </If>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps, {
  toggleModal,
})(Modal);