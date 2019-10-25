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
            tabs: ['Top rated movies', 'Popular movies', 'Upcoming movies']
        }
    }
    componentDidMount() {
        if (Object.keys(this.props.selections.movies).length === 0) {
            this.props.getMovies('top_rated')
            this.props.getMovies('popular')
            this.props.getMovies('upcoming')
        }
    }
    render() {
        return (
            <ItemsList tabs={this.state.tabs} items={this.props.selections.movies} />
        )
    }
}

const mapStateToProps = state => ({
    selections: state.movieSelection
})

export default connect(mapStateToProps, {
    getMovies
})(Movies)