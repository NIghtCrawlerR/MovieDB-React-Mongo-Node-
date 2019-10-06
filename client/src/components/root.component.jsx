import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import history from '../history'
import MoviesList from "./movies-list.component"
import MoviesCollection from "./movies-collection.component"
import EditMovie from "./edit-movie.component"
import CreateMovie from "./create-movie.component"
import Message from "./message.component"
import Auth from "./auth"
import BugReportForm from "./bug-report-form.component"
import store from '../store'
import { getFromStorage, removeFromStorage } from '../utils/storage'
import { connect } from 'react-redux'
import { verifyUser, logout, userGet } from '../actions/userActions'

import axios from 'axios'
import './css/footer.css'

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
                    <nav className="navbar bg-red">
                        <Link to="/" className="navbar-brand text-white">Movie DB</Link>
                        <div>
                            {!this.props.user.isLogin ? (
                                <div>
                                    <Link to="/login" className="btn btn-sm btn-purple mr-2">Login</Link>
                                    <Link to="/register" className="btn btn-sm btn-purple mr-2">Register</Link>
                                </div>
                            ) : (
                                    <div className="d-flex align-items-center">
                                        <Link to="/create" className="btn btn-sm btn-purple mr-2">Add movie</Link>
                                        <span className="dropdown user-menu">
                                            <span className="action text-white navbar__user-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-user-circle"></i>
                                            </span>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <div className="user-menu__email text-default">
                                                    {this.props.user.data ?
                                                        <div>
                                                            <b>{this.props.user.data.email}</b> <br />
                                                            <small>
                                                                <b>User group:</b> {this.props.user.data.group} <br />
                                                                <b>Permissions:</b> {this.props.user.data.group === 'admin' ?
                                                                    'Edit movie, add movie' : this.props.user.data.group === 'user' ?
                                                                        '-' : 'All'
                                                                }
                                                            </small>

                                                        </div>
                                                        : ''}
                                                </div>
                                                <div className="dropdown-divider"></div>
                                                <Link to="/collection" className="dropdown-item text-info">Collection</Link>
                                                {/* <div onClick={this.logout}><i className="fas fa-sign-out-alt white"></i></div> */}
                                                <Link to="/logout" className="dropdown-item text-info" onClick={this.logout}>Logout</Link>
                                            </div>
                                        </span>
                                    </div>

                                )}
                        </div>
                    </nav>
                    <div className="container">

                        <div className="d-none">
                            2. add form component same for add and edit <br />
                        </div>
                        <div className="box">

                            <Route path="/" exact render={(props) => (<MoviesList {...props} showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/collection" render={(props) => (<MoviesCollection {...props} showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/edit/:id" render={(props) => (<EditMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/create" render={(props) => (<CreateMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/login" render={(props) => (<Auth {...props} loginForm updateUser={this.updateUser} showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/register" render={(props) => (<Auth {...props} registerForm showMsg={this.showMsg.bind(this)} />)} />
                            <Route path="/bug-report" render={(props) => (<BugReportForm {...props} showMsg={this.showMsg.bind(this)} />)} />
                        </div>
                      
                        {
                            this.state.showMsg ?
                                <Message
                                    message={this.state.message}
                                    close={this.hideMsg.bind(this)}
                                    sendRequest={this.sendRequest.bind(this)}
                                /> :
                                null
                        }
                    </div>
                    <Link to="/bug-report" className="bug-report-button">
                        <i className="fa fa-bug" aria-hidden="true"></i>
                        <p className="bug-report-button__tooltip">If you find bugs please let me know</p>
                    </Link>
                    <footer className="footer">
                        <div className="footer__contacts">
                            <p>
                                <a href="tel:+380973606572"><i className="fas fa-phone"></i> +380973606572</a>
                            </p>
                            <p>
                                <a href="mailto:angelina.ratnykova@gmail.com"><i className="fas fa-envelope"></i> angelina.ratnykova@gmail.com</a>
                            </p>
                        </div>
                        <div className="footer__social">
                            <a href="https://github.com/NIghtCrawlerR" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/angelina-ratnykova-338154135/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://www.facebook.com/angelina.ratnicova" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-square"></i>
                            </a>
                        </div>
                    </footer>
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