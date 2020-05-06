import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import RootComponent from 'routes/IndexRoute';
import store from './store';
import history from './history';

import 'bootstrap/dist/css/bootstrap.min.css';

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
