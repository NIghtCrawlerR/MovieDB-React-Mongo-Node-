import React, { Component } from 'react';
import axios from 'axios';

import SearchPopup from './SearchPopup';
import Icon from '../common/Icon';
import Input from '../common/Input';
import './index.scss';

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
      query: "",
    };

    this.isTyping = this.isTyping.bind(this);

    this.searchField = React.createRef();
    this.searchPopup = React.createRef();
  }

  showPopup = () => {
    this.searchPopup.current.instanceRef.open();
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

  isTyping(event) {
    const { timeout } = this.state;
    const { target: { value, name } } = event;

    this.setState({
      [name]: value,
    });

    const encodeQuery = encodeURIComponent(value.toLowerCase());

    if (timeout) clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(() => {
        this.search(encodeQuery);
      }, 1000),
    });
  }

  render() {
    const { search, searchResult } = this.state;

    return (
      <div className="search-field">
        <Icon name="search" />
        <Input
          ref={this.searchField}
          type="text"
          name="search"
          value={search}
          onChange={this.isTyping}
          onClick={this.showPopup}
          placeholder="Search..."
        />
        <SearchPopup
          ref={this.searchPopup}
          items={searchResult}
        />
      </div>
    );
  }
}
