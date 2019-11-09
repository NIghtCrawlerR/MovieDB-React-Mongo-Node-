import React, { Component } from 'react';
import Input from '../../common/Input'
import Loader from '../../common/Loader'
import PageTitle from '../../common/PageTitle'
import Head from '../../common/Head'
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
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true })
        const report = {
            email: this.state.email,
            title: this.state.title,
            body: this.state.body,
            date: new Date()
        }
        axios.post('/api/movies/bugreport', report)
            .then(res => {
                this.setState({
                    email: '',
                    title: '',
                    body: '',
                    loading: false
                })
                this.props.showMsg(res.data.status, res.data.text)
            })
            .catch(err => {
                this.setState({ loading: false })
                this.props.showMsg('Error', 'Something went wrong')
            })
    }


    render() {
        const { title, body, email } = this.state

        return (
            <div className="form__wrap content movie-form__wrap">
                <Head title="Fiction finder - Bug report" />
                {this.state.loading ? <Loader /> : null}
                <PageTitle title="Bug report" />
                <br />
                <form onSubmit={this.onSubmit.bind(this)} >
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <Input label="Title" name="title" value={title} onChange={this.changeHandler.bind(this)} required description={
                                <small>Short description of the bug</small>
                            } />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
                            <Input label="Email" name="email" value={email} onChange={this.changeHandler.bind(this)} required description={
                                <small>Provide your contact info</small>
                            } />
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

