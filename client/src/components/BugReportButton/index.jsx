import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

export default class BugReportButton extends Component {
    render() {
        return (
            <Link to="/bug-report" className="bug-report-button">
                <i className="fa fa-bug" aria-hidden="true"></i>
                <p className="bug-report-button__tooltip">If you find bugs please let me know</p>
            </Link>
        )
    }
}