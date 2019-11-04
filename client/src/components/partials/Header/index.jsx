import React from 'react';
import { Link } from "react-router-dom";
import SearchField from '../../SearchField'
import './index.css'

export default class Header extends React.Component {
    logout(e) {
        this.props.onClick(e)
    }

    render() {
        return (
            <nav className="header navbar bg-red">
                <div className="container-fluid">
                    <SearchField />
                    <div>
                        {!this.props.user.isLogin ? (
                            <div className="sign-in-buttons">
                                <Link to="/login">Login</Link>
                                |
                                <Link to="/register">Register</Link>
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
                                            <Link to="/wishlist" className="dropdown-item text-info">My wishlist</Link>
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