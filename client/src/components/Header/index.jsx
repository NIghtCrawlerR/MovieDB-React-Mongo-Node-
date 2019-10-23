import React from 'react';
import { Link, NavLink } from "react-router-dom";
import './index.css'

export default class Header extends React.Component {
    logout(e) {
        this.props.onClick(e)
    }

    render() {
        return (
            <nav className="header navbar bg-red">
                <div className="container-fluid">
                    <div className="nav-items">
                        {/* <Link to="/" className="navbar-brand text-white">Movie DB</Link> */}
                        <NavLink exact to="/" className="navbar-brand text-white">Home</NavLink>
                        <NavLink activeClassName="active" to="/movies" className="text-white">Movies catalog</NavLink>
                    </div>

                    <div>
                        {!this.props.user.isLogin ? (
                            <div>
                                <Link to="/login" className="btn btn-sm btn-purple mr-2">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-purple mr-2">Register</Link>
                            </div>
                        ) : (
                                <div className="d-flex align-items-center">
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
                                            <Link to="/collection" className="dropdown-item text-info">My wishlist</Link>
                                            <Link to="/logout" className="dropdown-item text-info" onClick={this.logout.bind(this)}>Logout</Link>
                                        </div>
                                    </span>
                                </div>

                            )}
                    </div>
                </div>
            </nav>
        )
    }
}