import React, { Component } from 'react';
import Select from 'react-select';
import { sortOptions } from '../../utils/sortOptions'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '../common/Input'

import axios from 'axios'
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
            showFilter: false
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
            }, 1000)
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
                        <Row>
                            <Col>
                                <button type="button" className="btn btn-sm btn-primary" onClick={() => this.setState({ showFilter: !this.state.showFilter })}>
                                    <i className="fas fa-filter"></i>
                                </button>
                            </Col>
                            <Col>
                                <Input type="text" name="title" placeholder="Search" value={this.state.filter.title || ""} onChange={this.filter.bind(this)} />
                            </Col>
                        </Row>
                        {this.state.showFilter ?
                            <Row className="mt-4">
                                <Col>
                                    <label><b>Genres:</b></label>
                                    <Select
                                        name="genres"
                                        value={this.state.genres}
                                        onChange={this.handleChange.bind(this)}
                                        options={this.state.genresOptions}
                                        isMulti
                                    />
                                </Col>
                                <Col>
                                    <label><b>Year:</b></label>
                                    <select className="form-control" name="year" placeholder="year">
                                        <option value=""></option>
                                        {years.reverse().map((year, i) => {
                                            return <option key={i} value={year}>{year}</option>
                                        })}
                                    </select>
                                </Col>
                                <Col>
                                    <label><b>Dyrectory:</b></label>
                                    <Select
                                        value={this.state.crew}
                                        onChange={this.handleChange.bind(this)}
                                        onInputChange={this.isTyping}
                                        name="crew"
                                        options={this.state.peopleOptions}
                                        isSearchable
                                    />
                                </Col>
                                <Col>
                                    <label><b>Sort by:</b></label>
                                    <select className="form-control" name="sort" placeholder="Sort by">
                                        {sortOptions.map((opt, i) => {
                                            return <option key={i} value={opt.value} selected={opt.value === 'popularity.desc'}>{opt.label}</option>
                                        })}
                                    </select>
                                </Col>
                                <Col>
                                    <button type="button" className="btn btn-success" onClick={this.onSubmit}>Submit</button>
                                </Col>
                            </Row>
                            : null}
                    </form>
                </div>
            </div>
        )
    }
}