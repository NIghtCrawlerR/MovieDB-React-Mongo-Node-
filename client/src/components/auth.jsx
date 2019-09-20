import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';

import { setInStorage, getFromStorage } from '../utils/storage'

export default class Form extends Component {
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
            passwordErrorMessage: ''
        }
    }

    componentDidMount() {
        // console.log(this.props)
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
        
        if(action === 'login') {
           axios.post('http://localhost:4000/api/users/login', {email: this.state.email, password: this.state.password})
            .then((res) => {
                if (res.data.success) {
                    setInStorage('app_data', { token: res.data.token })
                } else {
                    this.setState({
                        errorMessage: res.data.message
                    })
                }
                console.log(res)
            })
            .catch((err) => console.log(err)) 
        } else {
            axios.post('http://localhost:4000/api/users/register', {email: this.state.email, password: this.state.password})
            .then((res) => {
                // if (res.data.success) {
                //     setInStorage('app_data', { token: res.data.token })
                // }
                console.log('register successful. now you cal log in')
                console.log(res)
            })
            .catch((err) => console.log(err)) 
        }
        
        // const newMovie = {}
        // for (let key in this.state) newMovie[key] = this.state[key]

        // if (this.props.mode === 'edit') {
        //     axios.post('http://localhost:4000/movies/update/' + this.state.id, newMovie)
        //         .then(res => this.props.showMsg(res.data.status, res.data.text))
        // }
        // else {
        //     axios.post('http://localhost:4000/movies/add', newMovie)
        //         .then(res => {
        //             this.setState({
        //                 title: '',
        //                 img: '',
        //                 genre: '',
        //                 liked: false,
        //                 watched: 0
        //             })
        //             this.props.showMsg(res.data.status, res.data.text)
        //         })
        // }
    }

    render() {
        const isReg = this.props.registerForm

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
                    <small className="text-red">{ this.state.emailErrorMessage }</small>
                    <br />
                    <label>Password</label>
                    <input className="form-control" type="password" name="password" onChange={this.changeHandler} value={this.state.password} required />
                    <small className="text-red">{ this.state.passwordErrorMessage }</small>
                    <br />
                    {isReg ? (
                       <div>
                        <label>Confirm Password</label>
                        <input className="form-control" type="password" name="passwordConfirm" onChange={this.changeHandler} value={this.state.passwordConfirm} required={this.props.registerForm} />
                        <br />
                    </div> 
                    ) : ('')}
                    
                    <div>
                        <small className="text-red">{ this.state.errorMessage }</small>
                    </div>
                    

                    <input type="submit" className="btn btn-purple mt-3" value={isReg ? 'Register' : 'Log in'} />
                </form>
            </div>
        )
    }
}