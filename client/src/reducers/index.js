import { combineReducers } from 'redux'
import catalog from './catalog'
import collections from './collections'
import wishlist from './wishlist'
import user from './user'

export default combineReducers({ 
    catalog, 
    collections,
    wishlist,
    user 
})
