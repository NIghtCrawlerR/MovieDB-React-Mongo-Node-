import React, { Component } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios'

export default class BugReportForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            email: '',
            loading: false
        }
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    onSubmit(e) {
        e.preventDefault()
        const report = {
            email: this.state.email,
            title: this.state.title,
            body: this.state.body,
            date: new Date()
        }
        axios.post('/api/movies/bugreport', report)
            .then(res => {
                this.props.showMsg(res.data.status, res.data.text)
            })
            .catch(err => {
                this.props.showMsg('Error', 'Something went wrong')
            })
    }


    render() {
        const { title, body, email } = this.state

        return (
            <div className="content movie-form__wrap">
                {this.state.loading ?
                    <div className="spinner__wrap">
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> : null}
                <div className="d-flex justify-content-between">
                    <h3>Bug report</h3>
                    <Link className="btn btn-outline-info" to="/"><i className="fas fa-arrow-left mr-2"></i> Go back</Link>
                </div>
                <br />
                <form onSubmit={this.onSubmit.bind(this)} >
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <label>
                                <b>Title</b> <br />
                                <small>Short description of the bug</small>
                            </label>
                            <input className="form-control" type="text" name="title" onChange={this.changeHandler.bind(this)} value={title || ''} required />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <label>
                                <b>Email</b> <br/>
                                <small>Provide your contact info</small>
                            </label>
                            <input className="form-control" type="text" name="email" onChange={this.changeHandler.bind(this)} value={email || ''} required />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                            <label>
                                <b>Body</b> <br />
                                <small>Describe the way to reproduce the bug as detailed as possible</small>
                            </label>
                            <textarea className="form-control bugreport__textarea" name="body" onChange={this.changeHandler.bind(this)} value={body || ''} required></textarea>
                        </div>
                    </div>

                    <input type="submit" className="btn btn-purple mt-3" value="Send" />
                </form>
            </div>
        )


    }
}

