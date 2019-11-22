import React, { Component } from 'react';
import Select from 'react-select';
import { genres } from '../../utils/genres'
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
            peopleOptions: []
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
                console.log(res.data)
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
        return (
            <div className="filter">
                <form onChange={this.filter.bind(this)}>
                    Genres:
                    <div className="mb-2">
                        <Select
                            name="genres"
                            value={this.state.genres}
                            onChange={this.handleChange.bind(this)}
                            options={this.state.genresOptions}
                            isMulti
                        />
                    </div>
                    Title:
                    <div className="mb-2 filter__search-input">
                        <input type="text" className="form-control" name="title" placeholder="Search" />
                    </div>
                    Year:
                    <div className="mb-2 filter__search-input">
                        <input type="number" className="form-control" name="year" placeholder="Year" />
                    </div>
                    Dyrectory:
                    <div className="mb-2">
                        <Select
                            value={this.state.crew}
                            onChange={this.handleChange.bind(this)}
                            onInputChange={this.isTyping}
                            name="crew"
                            options={this.state.peopleOptions}
                            isSearchable
                        />
                    </div>
                    Sort by:
                    <select className="form-control" name="sort" placeholder="Sort by">
                        <option value=""></option>
                        <option value="popularity.asc">popularity.asc</option>
                        <option value="popularity.desc">popularity.desc</option>
                        <option value="release_date.asc">release_date.asc</option>
                        <option value="release_date.desc">release_date.desc</option>
                        <option value="original_title.asc">original_title.asc</option>
                        <option value="original_title.desc">original_title.desc</option>
                        <option value="vote_average.asc">vote_average.asc</option>
                        <option value="vote_average.desc">vote_average.desc</option>
                    </select>
                    <div className="row">
                        {/* <div className="col-xs-6 col-sm-6 col-md-3 my-1">
                            <span><input type="checkbox" id="watched" name="watched" /><label htmlFor="watched">watched</label></span>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-1">
                            <span><input type="checkbox" id="liked" name="liked" /><label htmlFor="liked">Liked</label></span>
                        </div> */}

                        {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 my-1">
                            <select className="form-control" name="genre">
                                <option value="">All genres</option>
                                {genres.map((genre, i) => {
                                    return <option value={genre} key={i}>{genre}</option>
                                })}
                            </select>
                        </div> */}

                        {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 my-1 filter__search-input">
                            <input type="text" className="form-control" name="title" placeholder="Search" />
                        </div> */}
                    </div>
                    <div>
                        <button type="button" className="btn btn-success" onClick={this.onSubmit}>Submit</button>
                    </div>
                </form>

            </div>
        )
    }
}