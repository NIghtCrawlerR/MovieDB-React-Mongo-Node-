import React from 'react';
import { Router, Route } from "react-router-dom";
import history from '../history'
import Homepage from "./homepage"
import MoviesCatalog from './movies-catalog.component'
import MoviesCollection from "./movies-collection.component"
import BugReportForm from "./bug-report-form.component"

import Message from './StatusMessage'
import Auth from './Auth'
import Header from './Header'
import Footer from './Footer'
import MovieForm from './movie-form.component'
import BugReportButton from './BugReportButton'

import store from '../store'
import { getFromStorage, removeFromStorage } from '../utils/storage'
import { connect } from 'react-redux'
import { verifyUser, logout, userGet } from '../actions/userActions'

import axios from 'axios'

class RootComponent extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this)
        this.showMsg = this.showMsg.bind(this)
        this.updateUser = this.updateUser.bind(this)

        this.state = {
            showMsg: false,
            message: {
                'status': 'warning',
                'text': 'message text',
                'accessError': false
            },
            loading: true
        }
    }

    hideMsg() {
        this.setState({ showMsg: false })
    }
    showMsg(status, text, accessError, timeout) {

        this.setState({
            showMsg: true,
            message: {
                'status': status,
                'text': text,
                'accessError': accessError
            }
        })
        setTimeout(() => {
            this.setState({
                showMsg: false
            })
        }, timeout || 5000)
    }

    sendRequest() {
        axios.get('/api/users/access/get', { params: { email: this.props.user.data.email } })
            .then((res) => {
                this.showMsg(res.data.status, res.data.text)
            })
            .catch(err => {
                console.log(err)
            })

    }

    updateUser() {
        const token = getFromStorage('token')
        if (!token) {
            this.setState({ loading: false })
            return !1
        }

        //verify user
        this.props.verifyUser(token)
            .then(user => {
                if (!user.data.success) throw new Error('err')
                this.setState({ loading: false })
            })
            .then(() => {
                this.props.userGet(store.getState().user.userId) //get user data
                    .then(() => console.log(this.props))
            })
            .catch(err => {
                this.showMsg('error', 'Error: Server error. Unable to get user. Try to login again')
                this.setState({ loading: false })
            })
    }

    componentDidMount() {
        this.updateUser()
    }

    logout(e) {
        e.preventDefault()
        this.props.logout(getFromStorage('token'))
            .then(res => {
                removeFromStorage('token')
                history.push('/')
            })
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            return (

                <Router history={history}>
                    <Header {...this.props} onClick={this.logout} />

                    <Route path="/" exact render={(props) => (<Homepage {...props} showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/movies" render={(props) => (<MoviesCatalog {...props} showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/collection" render={(props) => (<MoviesCollection {...props} showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/edit/:id" render={(props) => (<MovieForm mode="edit" {...props} showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/create" render={(props) => (<MovieForm mode="create" {...props} showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/login" render={(props) => (<Auth {...props} loginForm updateUser={this.updateUser} showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/register" render={(props) => (<Auth {...props} registerForm showMsg={this.showMsg.bind(this)} />)} />
                    <Route path="/bug-report" render={(props) => (<BugReportForm {...props} showMsg={this.showMsg.bind(this)} />)} />

                    {
                        this.state.showMsg ?
                            <Message
                                message={this.state.message}
                                close={this.hideMsg.bind(this)}
                                sendRequest={this.sendRequest.bind(this)}
                            /> :
                            null
                    }

                    <BugReportButton />
                    <Footer />
                </Router>


            );
        }

    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    verifyUser,
    logout,
    userGet
})(RootComponent)