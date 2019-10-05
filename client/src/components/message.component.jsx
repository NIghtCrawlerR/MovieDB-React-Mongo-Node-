import React, { Component } from 'react';
import './css/message.css';

export default class Message extends Component {

    render() {
        const { message } = this.props
        return (
            <div className={'message ' + message.status}>
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
        )
    }
}