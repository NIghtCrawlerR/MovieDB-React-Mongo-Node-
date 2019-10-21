import React, { Component } from 'react';
import './index.css'

export default class Loader extends React.Component {
    render() {
        return (
            <div className="spinner__wrap">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}