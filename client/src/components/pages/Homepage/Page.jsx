import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Tabs from '../../common/Tabs'
import List from './List'

export default class Page extends Component {
    constructor() {
        super()

        this.state = {
            tabs: {
                games: [
                    { title: 'Must play', value: 'must-play' },
                    { title: 'Top games of 2017', value: 'top-games-of-2017' },
                    { title: 'Epic games', value: 'epic-games-6' }
                ],
                movies: [
                    { title: 'Top rated movies', value: 'top_rated' },
                    { title: 'Popular movies', value: 'popular' },
                    { title: 'Upcoming movies', value: 'upcoming' }
                ],
                tv: [
                    { title: 'Top rated TV shows', value: 'top_rated' },
                    { title: 'Popular TV shows', value: 'popular' }
                ],
                books: []
            }
        }
    }

    render() {
        const { params } = this.props.match
        return (
            <React.Fragment>
                <Tabs path={`home/${params.page}`} tabs={this.state.tabs[params.page]} />
                <Route path={`/home/:page/:collection`} component={List} />
            </React.Fragment>
        )
    }
}
