import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios'

import sortOptions from 'utils/sortOptions'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'components/Button';

import './index.css'

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

export default class Filter extends Component {
  constructor() {
    super()

    this.state = {
      isTyping: false,
      timeout: 0,
      filter: {},
      genres: null,
      crew: null,
      genresOptions: [],
      peopleOptions: [],
      showFilter: true
    }

    this.isTyping = this.isTyping.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  isTyping(val) {
    let query = val.toLowerCase()
    let encodeQuery = encodeURIComponent(query);

    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    const that = this
    this.setState({
      isTyping: false,
      timeout: setTimeout(function () {
        if (encodeQuery.length > 0) that.searchPeople(encodeQuery);
      }, 600)
    });
  }

  handleChange = (selected, e) => {
    this.setState(
      {
        [e.name]: selected,
        filter: {
          ...this.state.filter,
          [e.name]: Array.isArray(selected) ? selected.map(item => item.value) : selected ? selected.value : null
        }
      }
    );
  };
  searchPeople(query) {
    axios.get(`${movieApiRoot}/search/person?api_key=${apiKey}&language=${lang}&query=${query}&page=1&include_adult=false`)
      .then(res => {
        this.setState({
          peopleOptions: res.data.results.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
        })
      })
      .catch(err => console.log(err))
  }
  filter(e) {
    let name = e.target.name,
      key = e.target.type === 'checkbox' ? e.target.checked : e.target.value.toLowerCase()

    if (!name) return !1;
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [name]: key
      }
    }))
  }

  onSubmit() {
    this.props.filter(this.state.filter)
  }
  componentDidMount() {
    this.setState({
      genresOptions: this.props.moviesGenres.map(genre => {
        return {
          value: genre.id,
          label: genre.name
        }
      })
    })
    this.searchPeople('a')
  }
  render() {
    const getRange = (start, end) => {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
    const years = getRange(1980, new Date().getFullYear());
    return (
      <div className="filter__wrap">
        <div className="filter">
          <form onChange={this.filter.bind(this)}>
            {this.state.showFilter ?
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
                    <option value=""></option>
                    {years.reverse().map((year, i) => {
                      return <option key={i} value={year}>{year}</option>
                    })}
                  </select>
                </Col>
                {this.props.page !== 'tv'
                  ?
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
                  : null}
                <Col xs={12} sm={6} md={3} className="my-2">
                  <label className="label--sticky">Sort by:</label>
                  <select className="form-control" name="sort" placeholder="Sort by">
                    {sortOptions.map((opt, i) => {
                      return <option key={i} value={opt.value} selected={opt.value === 'popularity.desc'}>{opt.label}</option>
                    })}
                  </select>
                </Col>
                <Col className="my-2">
                  <Button onClick={this.onSubmit}>Submit</Button>
                </Col>
              </Row>
              : null}
          </form>
        </div>
      </div>
    )
  }
}