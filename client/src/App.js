import React from 'react';
import { Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import RootComponent from "./components/root.component"
import store from './store'
import history from './history'

import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" render={(props) => (<RootComponent {...props} />)} />
        </Router>
      </Provider>
    );
  }
}
