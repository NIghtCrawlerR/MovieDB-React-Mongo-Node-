import React, { Component } from 'react';
import ItemsList from '../../ItemsList'
import { connect } from 'react-redux'
import {
    getTV
} from '../../../actions/itemsCollectionsActions'

class TVShows extends Component {
    constructor() {
        super()

        this.state = {
            tabs: ['Top rated TV shows', 'Popular TV shows']
        }
    }
    componentDidMount() {
        if (Object.keys(this.props.selections.tv).length === 0) {
            this.props.getTV('top_rated')
            this.props.getTV('popular')
        }
    }
    render() {
        return (
            <ItemsList tabs={this.state.tabs} items={this.props.selections.tv} />
        )
    }
}

const mapStateToProps = state => ({
    selections: state.movieSelection
})

export default connect(mapStateToProps, {
    getTV
})(TVShows)