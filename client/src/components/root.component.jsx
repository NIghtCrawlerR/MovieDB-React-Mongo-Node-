import React from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router'
import history from '../history'
import Homepage from "./pages/Homepage"
import Catalog from './pages/Catalog'
import Collection from './pages/Collection'
import Wishlist from './pages/Wishlist'
import BugReport from "./pages/BugReport"
import Auth from './pages/Auth'
import ItemFull from './pages/ItemFull'
import Search from './pages/Search'

import Header from './partials/Header'
import Sidebar from './partials/Sidebar'
import Footer from './partials/Footer'

import Message from './StatusMessage'

import store from '../store'
import { getFromStorage, removeFromStorage } from '../utils/storage'
import { connect } from 'react-redux'
import { verifyUser, logout, userGet } from '../actions/userActions'
import { getGenres } from '../actions/itemsCollectionsActions'

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
                this.showMsg('error', 'Error: Something went wrong. Try to login again')
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
            })
            .then(() => {
                this.props.userGet(store.getState().user.userId) //get user data
                    .then(() => {
                        console.log('get user')
                        this.setState({ loading: false })
                    })
                    .catch(err => {
                        console.log('get user error')
                        this.showMsg('error', `Error: ${err}`)
                    })
            })
            .catch(err => {
                this.showMsg('error', 'Error: Server error. Unable to get user. Try to login again')
                this.setState({ loading: false })
            })
    }



    componentDidMount() {
        this.props.getGenres('movie')
        this.updateUser()
    }

    logout(e) {
        e.preventDefault()
        this.props.logout(getFromStorage('token'))
            .then(res => {
                removeFromStorage('token')
                history.push('/home')
            })
    }

    render() {
        if(this.props.history.location.pathname === '/') {
            return <Redirect to="/home" />    
        }
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
                    <div className="app">
                        <div className="sidebar__wrap p-0">
                            <Sidebar isLogin={this.props.user.isLogin} />
                        </div>
                        <div className="main-content p-0">
                            <Header {...this.props} onClick={this.logout} />
                            <Route path={`/details/:page/:id`} render={(props) => (<ItemFull {...props} />)} />
                            <Route path="/home" render={(props) => (<Homepage {...props} />)} />
                            <Route path="/catalog/:page" render={(props) => (<Catalog {...props} />)} />
                            <Route path="/collection/:page/:collection" render={(props) => (<Collection {...props}/>)} />
                            <Route path="/wishlist" render={(props) => (<Wishlist {...props} />)} />
                            <Route path="/search/:page/:role/:id" render={(props) => (<Search {...props} />)} />
                            <Route path="/login" render={(props) => (<Auth {...props} loginForm updateUser={this.updateUser} showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/register" render={(props) => (<Auth {...props} registerForm showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/bug-report" render={(props) => (<BugReport {...props} showMsg={this.showMsg.bind(this)} />)} />

                            {
                                this.state.showMsg ?
                                    <Message
                                        message={this.state.message}
                                        close={this.hideMsg.bind(this)}
                                        sendRequest={this.sendRequest.bind(this)}
                                    /> :
                                    null
                            }

                            <Footer />
                        </div>
                    </div>
               
            );
        }

    }
}

const mapStateToProps = state => ({
    user: state.user,
    genres: state.movieSelection.genres
})

export default connect(mapStateToProps, {
    verifyUser,
    logout,
    userGet,
    getGenres
})(RootComponent)