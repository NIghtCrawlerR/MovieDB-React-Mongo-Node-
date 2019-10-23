import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import bg from '../../../assets/bg.jpg'
import './index.css'

export default class PageHeader extends Component {
    render() {
        return (
            <div className="page-header">
                <img src={bg} alt="" />
                <div className="container-fluid">
                    <div className="page-header__content">
                        <div className="breadcrumbs">
                            <ul>
                                {this.props.breadcrumbs ? this.props.breadcrumbs.map((link, i) => {
                                    return <li key={i}>{link}</li>
                                }) : null}

                            </ul>
                        </div>
                        <div className="page-header__title">
                            <h3>{this.props.title}</h3>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}