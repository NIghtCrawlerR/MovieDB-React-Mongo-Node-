import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';

import { setInStorage } from '../utils/storage'

import { connect } from 'react-redux'
import { login } from '../actions/userActions'

class AuthForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            errorMessage: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            loading: false
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    changeHandler(e) {
        let name = e.target.name,
            val = e.target.value

        let newState = {}
        newState[name] = val

        this.setState(newState)
    }

    onSubmit(e) {
        e.preventDefault()

        const action = this.props.loginForm ? 'login' : 'register'
        this.setState({ loading: true })
        if (action === 'login') {
            this.props.login({ email: this.state.email, password: this.state.password })
                .then(res => {
                    setInStorage('token', res.data.token)
                    this.setState({ loading: false })
                    this.props.history.push('/')
                })
        } else {
            axios.post('http://localhost:4000/api/users/register', { email: this.state.email, password: this.state.password })
                .then((res) => {
                    this.setState({ loading: false })
                    this.props.history.push('/login')
                    console.log('register successful. now you cal log in')
                    console.log(res)
                })
                .catch((err) => console.log(err))
        }
    }

    render() {
        const isReg = this.props.registerForm

        if (this.state.loading) {
            return (
                <div className="content">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>

            )
        } else {
            return (
                <div className="content">
                    <div className="d-flex justify-content-between">
                        <h3>{this.props.loginForm ? 'Login' : 'Register'}</h3>
                        <Link className="btn btn-outline-info" to="/"><i className="fas fa-arrow-left mr-2"></i> Go back</Link>
                    </div>
                    <br />
                    <form onSubmit={this.onSubmit} >

                        <label>Email</label>
                        <input className="form-control" type="text" name="email" onChange={this.changeHandler} value={this.state.email} required />
                        <small className="text-red">{this.state.emailErrorMessage}</small>
                        <br />
                        <label>Password</label>
                        <input className="form-control" type="password" name="password" onChange={this.changeHandler} value={this.state.password} required />
                        <small className="text-red">{this.state.passwordErrorMessage}</small>
                        <br />
                        {isReg ? (
                            <div>
                                <label>Confirm Password</label>
                                <input className="form-control" type="password" name="passwordConfirm" onChange={this.changeHandler} value={this.state.passwordConfirm} required={this.props.registerForm} />
                                <br />
                            </div>
                        ) : ('')}

                        <div>
                            <small className="text-red">{this.state.errorMessage}</small>
                        </div>


                        <input type="submit" className="btn btn-purple mt-3" value={isReg ? 'Register' : 'Log in'} />
                    </form>
                </div>
            )
        }

    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    login
})(AuthForm)