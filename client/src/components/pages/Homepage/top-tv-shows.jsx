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
            tabs: [{
                title: 'Top rated TV shows',
                value: 'top_rated'
            }, {
                title: 'Popular TV shows',
                value: 'popular'
            }]
        }
    }
    // componentDidMount() {
    //     if (Object.keys(this.props.selections.tv).length === 0) {
    //         this.props.getTV('top_rated')
    //         this.props.getTV('popular')
    //     }
    // }
    render() {
        return (
            <ItemsList type="tv" tabs={this.state.tabs} />
        )
    }
}

const mapStateToProps = state => ({
    selections: state.movieSelection
})

export default connect(mapStateToProps, {
    getTV
})(TVShows)