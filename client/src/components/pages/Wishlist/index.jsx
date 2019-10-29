import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import axios from 'axios';
import Movie from '../../Movie'
// import Filter from './MovieFilter'
import PageHeader from '../../common/PageHeader'
import Tabs from '../../common/Tabs'
import List from './List'
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

    setLike(id) {
        this.setState({
            movies: this.state.movies.map(m => {
                if (m._id === id) m.liked = !m.liked
                return m
            })
        })
        let el = this.state.movies.filter(m => m._id === id)[0]

        axios.post('/movies/update/' + id, el)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    setWatch(id) {
        this.setState({
            movies: this.state.movies.map(m => {
                if (m._id === id) m.watched = !m.watched
                return m
            })
        })
        let el = this.state.movies.filter(m => m._id === id)[0]

        axios.post('/movies/update/' + id, el)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    clickHandler(id, mode) {
        switch (mode) {
            case 'setLike':
                this.setLike(id);
                break;
            case 'setWatch':
                this.setWatch(id);
                break;
            default:
                return;
        }

    }

    componentDidMount() {
        const token = getFromStorage('token')
        if (!token) {
            this.props.history.push('/')
            return !1
        }
    }

    render() {
        return (
            <div>
                <PageHeader title="Personal wishlist" />
                <div className="container-fluid">
                    <Tabs path="wishlist" tabs={this.state.tabs} />
                    <Route path="/wishlist/:collection" render={(props) => (<List {...props} user={this.props.user} />)} />
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