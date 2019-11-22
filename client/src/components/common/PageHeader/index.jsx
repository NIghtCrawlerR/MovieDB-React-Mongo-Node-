import React, { Component } from 'react'
// import { Link } from "react-router-dom";
import bg from '../../../assets/bg2.jpg'
import './index.css'

export default class PageHeader extends Component {
    render() {
        const background = this.props.image ? this.props.image : bg
        const { title, text } = this.props
        return (
            <div className="page-header">
                <img src={background} alt="" />
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
                            <h3>{title}</h3>
                        </div>
                        {this.props.text ? <p className="page-header__text">{text}</p> : null}
                    </div>
                </div>

            </div>
        )
    }
}