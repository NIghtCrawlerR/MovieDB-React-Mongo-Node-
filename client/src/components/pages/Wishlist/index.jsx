import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import axios from 'axios';
import Movie from '../../Movie'
// import Filter from './MovieFilter'
import PageHeader from '../../common/PageHeader'
import Tabs from '../../common/Tabs'
import Items from './Items'
import { getFromStorage } from '../../../utils/storage'
import { connect } from 'react-redux'
import {
    filterMovies
} from '../../../actions/userActions'
import { getWishlist } from '../../../actions/itemsCollectionsActions'

class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            filtered: [],
            loading: false,
            tabs: [{
                title: 'Movies',
                value: 'movies'
            }, {
                title: 'TV Shows',
                value: 'tv'
            }, {
                title: 'Games',
                value: 'games'
            }]
        }
    }

    filter(filter) {
        this.props.filterMovies(this.props.user.movies, filter)
    }

    componentDidMount() {
        const token = getFromStorage('token')
        if (!token) {
            this.props.history.push('/')
            return !1
        }
    }

    render() {
        if (this.props.history.location.pathname === '/wishlist') {
            return <Redirect to='/wishlist/movies' />;
        }
        return (
            <div>
                <PageHeader title="Personal wishlist" />
                <div className="container-fluid">
                    <Tabs path="wishlist" tabs={this.state.tabs} />
                    <Route path="/wishlist/:collection" render={(props) => (<Items {...props} user={this.props.user} />)} />
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    collections: state.movieSelection
})

export default connect(mapStateToProps, {
    filterMovies,
    getWishlist
})(Wishlist)