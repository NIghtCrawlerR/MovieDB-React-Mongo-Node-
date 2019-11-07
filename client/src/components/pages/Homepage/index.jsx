import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router'
import BrickTabs from '../../BrickTabs'
import Page from './Page'

export default class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {
        if (this.props.history.location.pathname === '/home') {
            return <Redirect from="/home" to='/home/movies' />;
        }
        return (
            <div className="mb-5">
                {/* <PageHeader title="Explore popular movies" /> */}
                <div className="container-fluid">
                    <BrickTabs />
                    <Route path="/home/:page" component={Page} />
                </div>
            </div>

        )
    }
}