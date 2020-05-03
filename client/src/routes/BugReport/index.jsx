import React, { Component } from 'react';
import axios from 'axios';

import PageTitle from 'components/PageTitle';
import Head from 'components/Head';
import { Button, Loader, Input } from 'components/UI';

class BugReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      email: '',
      loading: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { email, title, body } = this.state;

    const report = {
      email,
      title,
      body,
      date: new Date(),
    };

    axios.post('/api/movies/bugreport', report)
      .then((res) => {
        this.resetForm();
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  resetForm = () => {
    this.setState({
      email: '',
      title: '',
      body: '',
      loading: false,
    });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { title, body, email, loading } = this.state;

    return (
      <div className="form__wrap content movie-form__wrap">
        <Head title="Fiction finder - Bug report" />
        {loading ? <Loader /> : null}
        <PageTitle title="Bug report" />
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
              <Input
                label="Title"
                name="title"
                value={title}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3">
              <Input
                label="Email"
                name="email"
                value={email}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
              <label>
                <b>Body</b>
                <br />
                <small>Describe the way to reproduce the bug as detailed as possible</small>
              </label>
              <textarea className="form-control bugreport__textarea" name="body" onChange={this.changeHandler} value={body || ''} required />
            </div>
          </div>

          <Button type="submit">
            Send report
          </Button>
        </form>
      </div>
    );
  }
}

export default BugReportForm;
