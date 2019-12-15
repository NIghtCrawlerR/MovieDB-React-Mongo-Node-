import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../common/Input';
import Loader from '../../common/Loader';
import PageTitle from '../../common/PageTitle';
import Head from '../../common/Head';


export default class BugReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      email: '',
      loading: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const { email, title, body } = this.state;
    const { showMsg } = this.props;

    const report = {
      email,
      title,
      body,
      date: new Date(),
    };

    axios.post('/api/movies/bugreport', report)
      .then((res) => {
        this.setState({
          email: '',
          title: '',
          body: '',
          loading: false,
        });
        showMsg(res.data.status, res.data.text);
      })
      .catch((err) => {
        this.setState({ loading: false });
        showMsg('Error', 'Something went wrong');
      });
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { title, body, email } = this.state;

    return (
      <div className="form__wrap content movie-form__wrap">
        <Head title="Fiction finder - Bug report" />
        {this.state.loading ? <Loader /> : null}
        <PageTitle title="Bug report" />
        <br />
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
              <Input
                label="Title"
                name="title"
                value={title}
                onChange={this.changeHandler.bind(this)}
                required
                description="Short description of the bug"
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
              <Input
                label="Email"
                name="email"
                value={email}
                onChange={this.changeHandler.bind(this)}
                required
                description="Provide your contact info"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
              <label>
                <b>Body</b>
                {' '}
                <br />
                <small>Describe the way to reproduce the bug as detailed as possible</small>
              </label>
              <textarea className="form-control bugreport__textarea" name="body" onChange={this.changeHandler.bind(this)} value={body || ''} required />
            </div>
          </div>

          <input type="submit" className="btn btn-purple mt-3" value="Send" />
        </form>
      </div>
    );
  }
}
