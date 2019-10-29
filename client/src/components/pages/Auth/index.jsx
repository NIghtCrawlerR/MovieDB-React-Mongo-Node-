import React, { Component } from 'react';
import axios from 'axios';

import { setInStorage } from '../../../utils/storage'

import { connect } from 'react-redux'
import { login } from '../../../actions/userActions'
import Loader from '../../common/Loader'
import PageTitle from '../../common/PageTitle'
import Input from '../../common/Input'

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
                    if (res.data.success) {
                        setInStorage('token', res.data.token)
                        this.props.updateUser()
                        this.props.history.push('/home')
                    }
                    else {
                        this.setState({ errorMessage: res.data.message })
                    }
                    this.setState({ loading: false })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.post('http://localhost:4000/api/users/register', { email: this.state.email, password: this.state.password })
                .then((res) => {

                    this.setState({ loading: false })
                    if (res.data.success) {
                        this.props.history.push('/login')
                    } else {
                        this.setState({ errorMessage: res.data.message })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({ errorMessage: err })
                })
        }
    }

    render() {
        const isReg = this.props.registerForm

        return (
            <div className="form__wrap content">
                {this.state.loading ? <Loader /> : null}
                <PageTitle title={this.props.loginForm ? 'Login' : 'Register'} />

                <br />
                <form onSubmit={this.onSubmit} >
                    <Input label="Email" name="email" value={this.state.email} onChange={this.changeHandler} required
                        errorMessage={<small className="text-red">{this.state.emailErrorMessage}</small>}
                    />
                    <br />
                    <Input label="Password" type="password" name="password" value={this.state.password} onChange={this.changeHandler} required
                        errorMessage={<small className="text-red">{this.state.passwordErrorMessage}</small>}
                    />
                    <br />
                    {isReg ?
                        <Input label="Confirm Password" type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.changeHandler} required
                            errorMessage={<small className="text-red">{this.state.passwordErrorMessage}</small>}
                        /> : null}

                    <div>
                        <small className="text-red">{this.state.errorMessage}</small>
                    </div>


                    <input type="submit" className="btn btn-purple mt-3" value={isReg ? 'Register' : 'Log in'} />
                </form>
            </div>
        )


    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    login
})(AuthForm)