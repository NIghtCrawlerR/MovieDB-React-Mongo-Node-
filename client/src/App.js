import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import MoviesList from "./components/movies-list.component"
import EditMovie from "./components/edit-movie.component"
import CreateMovie from "./components/create-movie.component"
import Message from "./components/message.component"

function showMsg(show) {
  if (show) return <Message />
}

export default class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMsg: false
    }
  }

  render() {
    return (
      <Router>

        <div className="container">
          <nav className="navbar bg-red">
            <Link to="/" className="navbar-brand text-white">Movie database</Link>
            <Link to="/create" className="btn btn-sm btn-purple">Add movie</Link>
          </nav>
          <div>
            1. show info msg after actions <br />
            2. add form component same for add and edit <br />
            3. watched labels <br />
            4. watched buttons <br />
            5. filter <br />
          </div>
          <div className="box">

            <Route path="/" exact component={MoviesList} />
            <Route path="/edit/:id" component={EditMovie} />
            <Route path="/create" component={CreateMovie} />
          </div>
          {showMsg(this.state.showMsg)}

        </div>
      </Router>
    );
  }
}
