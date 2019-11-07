import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import SearchResults from './SearchResults'
import axios from 'axios'
import './index.css'

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL
const gameApiRoot = process.env.REACT_APP_GAME_API
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <span
//         ref={ref}
//         onClick={e => {
//             e.preventDefault();
//             onClick(e);
//         }}
//     >
//         {children}
//     </span>
// ));

export default class SearchField extends Component {
    constructor() {
        super()

        this.isTyping = this.isTyping.bind(this)

        this.state = {
            isTyping: false,
            timeout: 0,
            searchResult: {},
            dropdown: false
        }
    }
    isTyping(e) {
        let query = e.target.value.toLowerCase()
        let encodeQuery = encodeURIComponent(query);

        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        const that = this
        this.setState({
            isTyping: false,
            timeout: setTimeout(function () {
                that.search(encodeQuery);
            }, 1000)
        });
    }
    search(query) {
        axios.get(`${movieApiRoot}/search/movie?api_key=${apiKey}&language${lang}&query=${query}&page=1`)
            .then(res => {
                if (res.data.results.length > 0) {
                    this.setState(prevState => ({
                        searchResult: {
                            ...prevState.searchResult,
                            movies: res.data.results
                        }
                    }))
                }
            })
            .catch(err => console.log('Error: ' + err))

        axios.get(`${movieApiRoot}/search/tv?api_key=${apiKey}&language${lang}&query=${query}&page=1`)
            .then(res => {
                if (res.data.results.length > 0) {
                    this.setState(prevState => ({
                        searchResult: {
                            ...prevState.searchResult,
                            tv: res.data.results
                        }
                    }))
                }
            })
            .catch(err => console.log('Error: ' + err))

        axios.get(`${gameApiRoot}/games?search=${query}`)
            .then(res => {
                if (res.data.results.length > 0) {
                    this.setState(prevState => ({
                        searchResult: {
                            ...prevState.searchResult,
                            games: res.data.results
                        }
                    }))
                }
            })
            .catch(err => console.log('Error: ' + err))
        //https://api.themoviedb.org/3/search/movie?api_key=f173a387483cd86fc18ab172d5d822ae&language=ru&query=war%20photographer&page=1
        //https://api.themoviedb.org/3/search/tv?api_key=f173a387483cd86fc18ab172d5d822ae&language=ru&query=simpsons&page=1
        //https://rawg.io/api/games?search=assassins creed
        console.log(query)
    }

    onClick(e) {
        console.log('link click')
        this.onToggle(false)
        // if (this.state.dropdown && e.target) e.target.blur()
    }
    onToggle(toggle) {
        if(toggle) {
            this.refs['search-field'].focus()
        }
        this.setState({
            dropdown: toggle
        })
    }

    render() {
        return (
            <div className="search-field d-flex align-items-center">
                <i className="fas fa-search"></i>
                <Form.Control ref="search-field" type="text" onChange={this.isTyping} onClick={this.onClick.bind(this)} placeholder="Search..." />
                <Dropdown onToggle={this.onToggle.bind(this)} show={this.state.dropdown} >
                    <Dropdown.Toggle className={this.state.dropdown ? '' : ''} ></Dropdown.Toggle>

                    {Object.keys(this.state.searchResult).length > 0 ?
                        <Dropdown.Menu >
                            <SearchResults data={this.state.searchResult} onClick={this.onClick.bind(this)} />
                        </Dropdown.Menu>
                        : null
                    }
                </Dropdown>

            </div>
        )
    }
}