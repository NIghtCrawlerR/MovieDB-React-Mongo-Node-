import React, { Component } from 'react';
import './css/message.css';

export default class Message extends Component {
    

    render() {
        return (
            <div className="message error">
                <div className="icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div className="ml-4">
                    <h3>Title</h3>
                    <p>Message text</p>
                </div>
            </div>
        )
    }
}