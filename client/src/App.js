import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import MoviesList from "./components/movies-list.component"
import EditMovie from "./components/edit-movie.component"
import CreateMovie from "./components/create-movie.component"
import Message from "./components/message.component"
import Auth from "./components/auth"

import axios from 'axios'

import { setInStorage, getFromStorage, removeFromStorage } from './utils/storage'

function isMsg(show, msg) {
  if (show) return <Message message={msg} />
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this)

    this.state = {
      showMsg: false,
      message: {
        'status': 'warning',
        'text': 'message text'
      },
      isLogin: false
    }
  }

  showMsg(status, text) {
    this.setState({
      showMsg: true,
      message: {
        'status': status,
        'text': text
      }
    })
    setTimeout(() => {
      this.setState({
        showMsg: false
      })
    }, 5000)
  }

  componentDidMount() {
    const appData = getFromStorage('app_data')
    if (!appData) return !1
    axios.get('http://localhost:4000/api/users/verify?token=' + appData.token)
      .then(res => {
        if (res.data.success) {
          this.setState({ isLogin: true })
        }
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  logout(e) {
    e.preventDefault()

    axios.get('http://localhost:4000/api/users/logout?token=' + getFromStorage('app_data').token)
      .then(res => {
        if (res.data.success) {
          removeFromStorage('app_data')
          this.setState({ isLogin: false })
        }
        console.log(res)
      })
      .catch(err => console.log(err))
    console.log(getFromStorage('app_data'))
  }

  render() {
    // let signInButtons

    // function signInButtons() {
    //   if (this.state.isLogin) {
    //     return (
    //       <div>

    //       </div>
    //       )
    //   }
    // }

    return (
      <Router>
        <nav className="navbar bg-red">
          <Link to="/" className="navbar-brand text-white">Movie database</Link>
          <div>
            isLogin: {this.state.isLogin ? 'true' : 'false'}

            {!this.state.isLogin ? (
              <div>
                <Link to="/login" className="btn btn-sm btn-purple mr-2">Login</Link>
                <Link to="/register" className="btn btn-sm btn-purple mr-2">Register</Link>
              </div>
            ) : (
                <div>
                  <Link to="/create" className="btn btn-sm btn-purple mr-2">Add movie</Link>
                  <Link to="/logout" className="btn btn-sm btn-purple" onClick={this.logout}>Logout</Link>
                </div>
              )}



          </div>
        </nav>
        <div className="container">

          <div className="d-none">
            2. add form component same for add and edit <br />
          </div>
          <div className="box">

            <Route path="/movies" exact render={(props) => (<MoviesList {...props} showMsg={this.showMsg.bind(this)} />)} />
            <Route path="/edit/:id" render={(props) => (<EditMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
            <Route path="/create" render={(props) => (<CreateMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
            <Route path="/login" render={(props) => (<Auth {...props} loginForm showMsg={this.showMsg.bind(this)} />)} />
            <Route path="/register" render={(props) => (<Auth {...props} registerForm showMsg={this.showMsg.bind(this)} />)} />
          </div>
          {isMsg(this.state.showMsg, this.state.message)}

        </div>
      </Router>
    );
  }
}
