import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import history from '../history'
import MoviesList from "./movies-list.component"
import MoviesCollection from "./movies-collection.component"
import EditMovie from "./edit-movie.component"
import CreateMovie from "./create-movie.component"
import Message from "./message.component"
import Auth from "./auth"
import store from '../store'
import { getFromStorage, removeFromStorage } from '../utils/storage'
import { connect } from 'react-redux'
import { verifyUser, logout, userGet } from '../actions/userActions'

function showStatusMessage(show, msg) {
    if (show) return <Message message={msg} />
}

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
                'text': 'message text'
            },
            loading: true
        }
    }

    showMsg(status, text) {
        this.setState({
            showMsg: true,
            message: {
                'status': status,
                'text': text
            }
        })
        setTimeout(() => {
            this.setState({
                showMsg: false
            })
        }, 5000)
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
                if(!user.data.success) throw new Error('err')
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
                        <Link to="/" className="navbar-brand text-white">Movie database</Link>
                        <div>
                            {!this.props.user.isLogin ? (
                                <div>
                                    <Link to="/login" className="btn btn-sm btn-purple mr-2">Login</Link>
                                    <Link to="/register" className="btn btn-sm btn-purple mr-2">Register</Link>
                                </div>
                            ) : (
                                    <div className="d-flex align-items-center">
                                        <Link to="/create" className="btn btn-sm btn-purple mr-2">Add movie</Link>
                                        <span className="dropdown dropleft">
                                            <span className="action text-white navbar__user-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-user-circle"></i>
                                            </span>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <div className="user-menu__email text-info">
                                                { this.props.user.data ? this.props.user.data.email : '' }
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
                        </div>
                        {showStatusMessage(this.state.showMsg, this.state.message)}

                    </div>
                    {/* { this.state.isLogin ? '' : <Redirect exact from="/" to="/login" /> } */}
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