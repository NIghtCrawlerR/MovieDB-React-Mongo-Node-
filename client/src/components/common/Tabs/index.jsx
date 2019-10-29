import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './index.css'

export default class Tabs extends Component {
    render() {
        return (
            <React.Fragment>
                <div onSelect={this.props.onSelect} className="tabs nav mb-5">
                    {
                        this.props.tabs.map((tab, i) =>
                            <div key={i} className="tab-item nav-item">
                                <NavLink to={`/${this.props.path}/${tab.value}`} className="nav-link">
                                    {tab.title}
                                </NavLink>
                            </div>

                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}