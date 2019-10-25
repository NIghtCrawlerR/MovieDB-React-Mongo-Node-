import { combineReducers } from 'redux'
import movieReducers from './movieReducers'
import itemsCollectionsReducers from './itemsCollectionsReducers'
import userReducers from './userReducers'

export default combineReducers({ 
    app: movieReducers, 
    movieSelection: itemsCollectionsReducers,
    user: userReducers 
})
