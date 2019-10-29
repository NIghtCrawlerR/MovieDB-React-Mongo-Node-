import React, { Component } from 'react';
import ItemsList from '../../ItemsList'
import { connect } from 'react-redux'
import {
    getMovies
} from '../../../actions/itemsCollectionsActions'

class Movies extends Component {
    constructor() {
        super()

        this.state = {
            tabs: [{
                title: 'Top rated movies',
                value: 'top_rated'
            }, {
                title: 'Popular movies',
                value: 'popular'
            }, {
                title: 'Upcoming movies',
                value: 'upcoming'
            }]
        }
    }
    switchTab(e) {
        console.log(e)
    }
    // componentDidMount() {
    //     console.log('mount')
    //     this.props.getMovies('top_rated')
    //     const { collections } = this.props.selections
    //     // if ( collections && collections.movies.top_rated.length === 0) {
    //     this.props.getMovies('top_rated')
    //     // this.props.getMovies('popular')
    //     // this.props.getMovies('upcoming')
    //     // }
    // }
    render() {
        return (
            <ItemsList type="movies" tabs={this.state.tabs} />
        )
    }
}

const mapStateToProps = state => ({
    selections: state.movieSelection
})

export default connect(mapStateToProps, {
    getMovies
})(Movies)