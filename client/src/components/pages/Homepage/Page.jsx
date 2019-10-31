import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import Tabs from '../../common/Tabs'
import List from './List'

import Items from './Items'

export default class Page extends Component {
    constructor() {
        super()

        this.state = {
            tabs: {
                games: [
                    { title: 'Must play', value: 'must-play' },
                    { title: 'Top games of 2017', value: 'top-games-of-2017' },
                    { title: 'Epic games', value: 'epic-games-6' },
                    // { title: 'fighting-games', value: 'fighting-games' }
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
                books: [
                    { title: '', value: '' }
                ]
            }
        }
    }

    render() {
        const { params } = this.props.match
        if (this.props.history.location.pathname === '/home/' + params.page) {
            return <Redirect to={`/home/${params.page}/${this.state.tabs[params.page][0].value}`} />;
        }
        return (
            <React.Fragment>
                <Tabs path={`home/${params.page}`} tabs={this.state.tabs[params.page]} />
                <Route path={`/home/:page/:collection`} component={Items} />
            </React.Fragment>
        )
    }
}
