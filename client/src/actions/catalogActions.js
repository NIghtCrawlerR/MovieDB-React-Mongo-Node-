import {
    GET_MOVIES_TV,
    GET_GAMES,
    FILTER
} from './types'
import axios from 'axios'

const movieApiRoot = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

export const filterMovies = (movies, filter) => dispatch => {
    let filtered = []
    let filterKeys = Object.keys(filter)

    filtered = movies.filter(item => {
        return filterKeys.every(key => {
            if (key === 'title') return item[key].toLowerCase().indexOf(filter[key]) !== -1
            else return item[key] === filter[key]
        })
    })

    dispatch({
        type: FILTER,
        movies: movies,
        filtered: filtered
    })
}

export const getMoviesTv = (type, page, options) => dispatch => {
    const genres = options && options.genres ? `&with_genres=${options.genres.join(',')}` : ''
    const title = options && options.title ? `&with_keywords=${options.title}` : ''
    const crew = options && options.crew ? `&with_crew=${options.crew}` : ''
    const sort_by = options && options.sort ? `&sort_by=${options.sort}` : '&sort_by=popularity.desc'
    const year = options && options.year ? `&${type === 'tv' ? 'first_air_date_year' : 'primary_release_year'}=${options.year}` : ''

    return new Promise((resolve, reject) => {
        let pageType = type
        if (pageType === 'movies') pageType = 'movie'

        axios.get(
            `${movieApiRoot}/discover/${pageType}?api_key=${apiKey}&language=${lang}${sort_by}&include_adult=false&include_video=false&page=${page}${year}${crew}${genres}${title}`
        )
            .then(res => {
                dispatch({
                    type: GET_MOVIES_TV,
                    pageType: type,
                    list: res.data.results
                })
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

export const getGames = (pageNumber, pageSize) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`https://rawg.io/api/games?page=${pageNumber}&page_size=18`)
            .then(res => {
                dispatch({
                    type: GET_GAMES,
                    games: res.data.results
                })
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}