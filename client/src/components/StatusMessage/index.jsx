import React, { Component } from 'react';
import './index.css';

export default class Message extends Component {
    close() {
        this.props.close()
    }
    sendRequest(e) {
        e.preventDefault()
        this.props.sendRequest()
    }
    render() {
        const { message } = this.props
        return (
            <div className={'message ' + message.status}>
                <div className="close-message-button" onClick={this.close.bind(this)}><i className="fas fa-times"></i></div>
                <div className="d-flex">
                    <div className="icon">
                        {message.status === 'error' ?
                            <i className="fas fa-exclamation-circle"></i> :
                            <i className="fas fa-check-circle"></i>}
                    </div>
                    <div className="ml-4">
                        <h3>{message.status}</h3>
                        <p>{message.text}</p>
                    </div>
                </div>
                {message.accessError ?
                    <div>
                        <p>Contact administrator to get access</p>
                        <button className="btn btn-info" onClick={this.sendRequest.bind(this)}>Require access</button>
                    </div> : null}
            </div>
        )
    }
}