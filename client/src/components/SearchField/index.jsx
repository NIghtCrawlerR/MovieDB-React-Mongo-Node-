import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SearchResults from './SearchResults';
import Icon from '../common/Icon';
import './index.css';

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL;
const gameApiRoot = process.env.REACT_APP_GAME_API;
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
const lang = 'ru';

export default class SearchField extends Component {
  constructor() {
    super();

    this.state = {
      timeout: 0,
      searchResult: {},
      dropdown: false,
    };

    this.isTyping = this.isTyping.bind(this);

    this.searchField = React.createRef();
  }

  onClick(e) {
    this.onToggle(false);
  }

  onToggle(toggle) {
    if (toggle) {
      this.searchField.current.focus();
    }
    this.setState({
      dropdown: toggle,
    });
  }

  search(query) {
    axios.get(`${movieApiRoot}/search/movie?api_key=${apiKey}&language${lang}&query=${query}&page=1`)
      .then((res) => {
        if (res.data.results.length > 0) {
          this.setState((prevState) => ({
            searchResult: {
              ...prevState.searchResult,
              movies: res.data.results,
            },
          }));
        }
      })
      .catch((err) => console.log(`Error: ${err}`));

    axios.get(`${movieApiRoot}/search/tv?api_key=${apiKey}&language${lang}&query=${query}&page=1`)
      .then((res) => {
        if (res.data.results.length > 0) {
          this.setState((prevState) => ({
            searchResult: {
              ...prevState.searchResult,
              tv: res.data.results,
            },
          }));
        }
      })
      .catch((err) => console.log(`Error: ${err}`));

    axios.get(`${gameApiRoot}/games?search=${query}`)
      .then((res) => {
        if (res.data.results.length > 0) {
          this.setState((prevState) => ({
            searchResult: {
              ...prevState.searchResult,
              games: res.data.results,
            },
          }));
        }
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  isTyping(e) {
    const query = e.target.value.toLowerCase();
    const encodeQuery = encodeURIComponent(query);

    const { timeout } = this.state;

    if (timeout) {
      clearTimeout(timeout);
    }
    const that = this;
    this.setState({
      timeout: setTimeout(() => {
        that.search(encodeQuery);
      }, 1000),
    });
  }

  render() {
    const { dropdown, searchResult } = this.state;

    return (
      <div className="search-field">
        <Icon name="search" />
        <Form.Control ref={this.searchField} type="text" onChange={this.isTyping} onClick={this.onClick.bind(this)} placeholder="Search..." />
        <Dropdown onToggle={this.onToggle.bind(this)} show={dropdown}>
          <Dropdown.Toggle className={dropdown ? '' : ''}></Dropdown.Toggle>

          {Object.keys(searchResult).length > 0
            ? (
              <Dropdown.Menu>
                <SearchResults data={searchResult} onClick={this.onClick.bind(this)} />
              </Dropdown.Menu>
            )
            : null}
        </Dropdown>

      </div>
    );
  }
}
