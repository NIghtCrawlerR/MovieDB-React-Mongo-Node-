import React, { Component } from 'react';
import './index.css'

export default class Loader extends Component {
    render() {
        return (
            <div className={`${this.props.overlay ? 'spinner__wrap' : ''}`}>
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}