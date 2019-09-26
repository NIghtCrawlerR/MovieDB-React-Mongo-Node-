import { FETCH_POSTS, FETCH_MOVIES, NEW_POST } from './types'
import axios from 'axios'

export const fetchPosts = () => dispatch => {
    console.log('fetching')
    dispatch({
        type: FETCH_POSTS,
        payload: [1, 2, 3]
    })
}

export const fetchMovies = () => dispatch => {
    axios.get('http://localhost:4000/movies')
        .then(res => {
            dispatch({
                type: FETCH_MOVIES,
                payload: res.data
            })
        })
        .catch(err => console.log(err))

}

export const createPost = (postData) => dispatch => {
    console.log('createPost')
    dispatch({
        type: NEW_POST,
        payload: ['new post']
    })
}