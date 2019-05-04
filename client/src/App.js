import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import MoviesList from "./components/movies-list.component"
import EditMovie from "./components/edit-movie.component"
import CreateMovie from "./components/create-movie.component"
import Message from "./components/message.component"

function isMsg(show, msg) {
  if (show) return <Message message={msg}/>
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMsg: false,
      message: {
        'status': 'warning',
        'text': 'message text'
      }
    }
  }

  showMsg(status, text) {
    this.setState({
      showMsg: true,
      message: {
        'status': status,
        'text':text
      }
    })
    setTimeout(() => {
      this.setState({
        showMsg:false
      })
    }, 5000)
  }

  render() {
    return (
      <Router>
        <nav className="navbar bg-red">
            <Link to="/" className="navbar-brand text-white">Movie database</Link>
            <Link to="/create" className="btn btn-sm btn-purple">Add movie</Link>
        </nav>
        <div className="container">
          
          <div className="d-none">
            2. add form component same for add and edit <br />
          </div>
          <div className="box">

            <Route path="/" exact render={(props) => (<MoviesList {...props} showMsg={this.showMsg.bind(this)} />)} />
            <Route path="/edit/:id" render={(props) => (<EditMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
            <Route path="/create"  render={(props) => (<CreateMovie {...props} showMsg={this.showMsg.bind(this)} />)} />
          </div>
          {isMsg(this.state.showMsg, this.state.message)}

        </div>
      </Router>
    );
  }
}
