import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

import { SORT_OPTIONS } from 'config/constants';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'components/UI';

import './index.scss';

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL;
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
const lang = 'ru';

export default class Filter extends Component {
  state = {
    isTyping: false,
    timeout: 0,
    filter: {},
    genres: null,
    crew: null,
    genresOptions: [],
    peopleOptions: [],
  }

  componentDidMount() {
    this.setState({
      genresOptions: this.props.moviesGenres.map((genre) => ({
        value: genre.id,
        label: genre.name,
      })),
    });
    this.searchPeople('a');
  }

  isTyping = (val) => {
    const query = val.toLowerCase();
    const encodeQuery = encodeURIComponent(query);

    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      isTyping: false,
      timeout: setTimeout(() => {
        if (encodeQuery.length > 0) this.searchPeople(encodeQuery);
      }, 600),
    });
  }

  handleChange = (selected, e) => {
    this.setState({
      [e.name]: selected,
      filter: {
        ...this.state.filter,
        [e.name]: Array.isArray(selected) ? selected.map((item) => item.value) : selected ? selected.value : null,
      },
    });
  };

  searchPeople = (query) => {
    axios.get(`${movieApiRoot}/search/person?api_key=${apiKey}&language=${lang}&query=${query}&page=1&include_adult=false`)
      .then((res) => {
        this.setState({
          peopleOptions: res.data.results.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        });
      })
      .catch((err) => console.log(err));
  }

  filter = (e) => {
    const { name } = e.target;
    const key = e.target.type === 'checkbox' ? e.target.checked : e.target.value.toLowerCase();

    if (!name) return !1;
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        [name]: key,
      },
    }));
  }

  onSubmit = () => {
    this.props.filter(this.state.filter);
  }

  render() {
    const getRange = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx);

    const years = getRange(1980, new Date().getFullYear());

    return (
      <div className="filter__wrap">
        <div className="filter">
          <form onChange={this.filter}>
            <Row>
              <Col xs={12} sm={6} md={3} className="my-2">
                <label className="label--sticky">Genres:</label>
                <Select
                  name="genres"
                  value={this.state.genres}
                  onChange={this.handleChange.bind(this)}
                  options={this.state.genresOptions}
                  isMulti
                />
              </Col>
              <Col xs={12} sm={6} md={3} className="my-2">
                <label className="label--sticky">Year:</label>
                <select className="form-control" name="year" placeholder="year">
                  <option value="" />
                  {years.reverse().map((year, i) => <option key={i} value={year}>{year}</option>)}
                </select>
              </Col>
              {this.props.page !== 'tv'
                ? (
                  <Col xs={12} sm={6} md={3} className="my-2">
                    <label className="label--sticky">Dyrectory:</label>
                    <Select
                      value={this.state.crew}
                      onChange={this.handleChange.bind(this)}
                      onInputChange={this.isTyping}
                      name="crew"
                      options={this.state.peopleOptions}
                      isSearchable
                    />
                  </Col>
                )
                : null}
              <Col xs={12} sm={6} md={3} className="my-2">
                <label className="label--sticky">Sort by:</label>
                <select className="form-control" name="sort" placeholder="Sort by">
                  {SORT_OPTIONS.map((opt, i) => <option key={i} value={opt.value} selected={opt.value === 'popularity.desc'}>{opt.label}</option>)}
                </select>
              </Col>
              <Col className="my-2">
                <Button onClick={this.onSubmit}>Submit</Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}
