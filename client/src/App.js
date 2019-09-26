import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'

import MoviesList from "./components/movies-list.component"
import MoviesCollection from "./components/movies-collection.component"
import EditMovie from "./components/edit-movie.component"
import CreateMovie from "./components/create-movie.component"
import Message from "./components/message.component"
import Auth from "./components/auth"

import axios from 'axios'
import store from './store'


import { setInStorage, getFromStorage, removeFromStorage } from './utils/storage'

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


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
      isLogin: false,
      userId: '',
      loading: true
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
    if (!appData) {
      this.setState({ loading: false })
      return !1
    }

    //verify user
    axios.get('http://localhost:4000/api/users/verify?token=' + appData.token)
      .then(res => {
        if (res.data.success) {
          this.setState({ isLogin: true, userId: res.data.userData.userId, loading: false })
        }
        console.log(res.data.userData.userId)
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })

    //get movies collection
    axios.post('http://localhost:4000/api/users/movies/get', { userId: getFromStorage('app_data').userId, getIds: true })
      .then(res => {
        let addData = getFromStorage('app_data')
        addData.movies = res.data.movies
        setInStorage('app_data', addData)
        console.log(addData)
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
    if (this.state.loading) {
      return (<p>Loading...</p>)
    } else {
      return (
        <Provider store={store}>
          <Router>
            <nav className="navbar bg-red">
              <Link to="/" className="navbar-brand text-white">Movie database</Link>
              <div>
                {!this.state.isLogin ? (
                  <div>
                    <Link to="/login" className="btn btn-sm btn-purple mr-2">Login</Link>
                    <Link to="/register" className="btn btn-sm btn-purple mr-2">Register</Link>
                  </div>
                ) : (
                    <div>
                      <Link to="/create" className="btn btn-sm btn-purple mr-2">Add movie</Link>
                      <span className="dropdown dropleft">
                        <span className="action text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-user-circle"></i>
                        </span>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                          <Link to="/collection" className="dropdown-item text-info">Collection</Link>
                          {/* <div onClick={this.logout}><i className="fas fa-sign-out-alt white"></i></div> */}
                          <Link to="/logout" className="dropdown-item text-info" onClick={this.logout}>Logout</Link>
                        </div>
                      </span>
                    </div>

                  )}
              </div>
            </nav>
            <div className="container">

              <div className="d-none">
                2. add form component same for add and edit <br />
              </div>
              <div className="box">

                <Route path="/" exact render={(props) => (<MoviesList {...props} showMsg={this.showMsg.bind(this)} />)} />
                <Route path="/collection" render={(props) => (<MoviesCollection {...props} showMsg={this.showMsg.bind(this)} />)} />
                <Route path="/edit/:id" render={(props) => (<EditMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
                <Route path="/create" render={(props) => (<CreateMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
                <Route path="/login" render={(props) => (<Auth {...props} loginForm showMsg={this.showMsg.bind(this)} />)} />
                <Route path="/register" render={(props) => (<Auth {...props} registerForm showMsg={this.showMsg.bind(this)} />)} />
              </div>
              {isMsg(this.state.showMsg, this.state.message)}

            </div>
            {/* { this.state.isLogin ? '' : <Redirect exact from="/" to="/login" /> } */}
          </Router>
        </Provider>

      );
    }

  }
}
