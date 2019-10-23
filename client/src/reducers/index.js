import { combineReducers } from 'redux'
import movieReducers from './movieReducers'
import movieSelectionReducers from './movieSelectionReducers'
import userReducers from './userReducers'

export default combineReducers({ 
    app: movieReducers, 
    movieSelection: movieSelectionReducers,
    user: userReducers 
})
