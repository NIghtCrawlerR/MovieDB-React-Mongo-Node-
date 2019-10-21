import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './index.css'

export default class PageHeader extends Component {
    render() {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="page-title">{ this.props.title }</h3>
                <Link className="btn btn-outline-info" to="/"><i className="fas fa-arrow-left mr-2"></i> Go back</Link>
            </div>
        )
    }
}