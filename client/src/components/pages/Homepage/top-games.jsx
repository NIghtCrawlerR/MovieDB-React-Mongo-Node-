import React, { Component } from 'react';
import Tabs from '../../common/Tabs'
import ItemsList from '../../ItemsList'
import { connect } from 'react-redux'
import {
    getGames
} from '../../../actions/itemsCollectionsActions'

class Games extends Component {
    constructor() {
        super()

        this.state = {
            tabs: [{
                title: 'Must play',
                value: 'must-play'
            }, {
                title: 'Top games of 2017',
                value: 'top-games-of-2017'
            }, {
                title: 'Epic games',
                value: 'epic-games-6'
            }]
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* <Tabs path="home/games" tabs={this.state.tabs} /> */}
                <ItemsList type="games" tabs={this.state.tabs} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selections: state.movieSelection
})

export default connect(mapStateToProps, {
    getGames
})(Games)