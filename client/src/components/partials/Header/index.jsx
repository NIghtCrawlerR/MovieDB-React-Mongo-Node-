import React from 'react';
import { Link } from "react-router-dom";
import SearchField from '../../SearchField'
import Dropdown from 'react-bootstrap/Dropdown'
import './index.css'

const UserIcon = React.forwardRef(({ children, onClick }, ref) => (
    <span ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }} className="action text-white navbar__user-icon">
        <i className="fas fa-user-circle"></i>
    </span>
));

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
                                    <Dropdown alignRight className="user-menu">
                                        <Dropdown.Toggle as={UserIcon}></Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Header className="text-right">
                                                {this.props.user.data ?
                                                    <b>{this.props.user.data.email}</b>
                                                    : null}
                                            </Dropdown.Header>
                                            <Dropdown.Divider></Dropdown.Divider>
                                            <Link to="/wishlist" className="dropdown-item text-info">My wishlist</Link>
                                            <Link to="/logout" className="dropdown-item text-info" onClick={this.logout.bind(this)}>Logout</Link>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                            )}
                    </div>
                </div>
            </nav>
        )
    }
}