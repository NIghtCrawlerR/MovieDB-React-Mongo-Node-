import React, { Component } from 'react';
import ItemsList from '../../ItemsList'
import { connect } from 'react-redux'
import {
    getGames
} from '../../../actions/itemsCollectionsActions'

class Games extends Component {
    constructor() {
        super()

        this.state = {
            tabs: ['Must play', 'Top games of 2017', 'Epic games']
        }
    }
    componentDidMount() {
        if (Object.keys(this.props.selections.games).length === 0) {
            this.props.getGames('must-play')
            this.props.getGames('top-games-of-2017')
            this.props.getGames('epic-games-6')
        }
        setTimeout(() => {
            console.log(this.props)
        }, 400)
    }
    render() {
        return (
            <ItemsList tabs={this.state.tabs} items={this.props.selections.games} />
        )
    }
}

const mapStateToProps = state => ({
    selections: state.movieSelection
})

export default connect(mapStateToProps, {
    getGames
})(Games)