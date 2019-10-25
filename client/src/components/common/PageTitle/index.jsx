import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './index.css'

export default class PageTitle extends Component {
    render() {
        return (
            <div className="page-title__wrap">
                <h3 className="page-title">{this.props.title}</h3>
                {this.props.buttonBack === false ? null :
                    <Link className="btn btn-outline-info" to="/"><i className="fas fa-arrow-left mr-2"></i> Go back</Link>
                }

            </div>
        )
    }
}