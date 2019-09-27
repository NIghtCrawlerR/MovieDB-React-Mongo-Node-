import React from 'react';
import { Provider } from 'react-redux'
import RootComponent from "./components/root.component"
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    );
  }
}
