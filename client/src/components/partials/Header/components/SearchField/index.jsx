import React, { Component } from 'react';
import axios from 'axios';

import { Icon, Input } from 'components/UI';
import { Dropdown, DropdownActivator, DropdownMenu } from 'components/Dropdown';
import SearchResults from './components/SearchResults';

import './index.scss';

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL;
const gameApiRoot = process.env.REACT_APP_GAME_API;
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
const lang = 'ru';

export default class SearchField extends Component {
  state = {
    timeout: 0,
    searchResult: {},
    dropdown: false,
    query: '',
  };

  updateState = (category, results) => {
    this.setState((prevState) => ({
      searchResult: {
        ...prevState.searchResult,
        [category]: results,
      },
    }));
  }

  makeRequest = (type, url) => {
    axios.get(url)
      .then(({ data }) => {
        if (data.results.length > 0) {
          this.updateState(type, data.results);
        }
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  search(query) {
    const urls = [
      { type: 'movies', url: `${movieApiRoot}/search/movie?api_key=${apiKey}&language${lang}&query=${query}&page=1` },
      { type: 'tv', url: `${movieApiRoot}/search/tv?api_key=${apiKey}&language${lang}&query=${query}&page=1` },
      { type: 'games', url: `${gameApiRoot}/games?search=${query}` },
    ];

    urls.map(({ type, url }) => this.makeRequest(type, url));
  }

  isTyping = (event) => {
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
        <Dropdown>
          <DropdownActivator>
            <Input
              ref={this.searchField}
              type="text"
              name="search"
              value={search}
              onChange={this.isTyping}
              onClick={this.showPopup}
              placeholder="Search..."
            />
          </DropdownActivator>
          <DropdownMenu left>
            <SearchResults data={searchResult} />
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
