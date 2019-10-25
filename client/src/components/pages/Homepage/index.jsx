import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router'
import BrickTabs from '../../BrickTabs'
import MovieList from './top-movies'
import TVShowsList from './top-tv-shows'
import GamesList from './top-games'

export default class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: 'movies',
            redirect: false
        }
    }
    switchTabs(tab) {
        this.setState({ activeTab: tab })
    }

    render() {
        if (this.props.history.location.pathname === '/home') {
            return <Redirect to='/home/top-movies' />;
        }
        return (
            <div className="mb-5">
                {/* <PageHeader title="Explore popular movies" /> */}
                <div className="container-fluid">
                    <div className="d-none">
                        <h3>Task list</h3>
                        <ul>
                            <li>рекомендации\похожие фильмы в коллекции</li>
                            <li>после добавления нового фильма в каталоге не подгружаются остальные</li>
                            <li>доработать апи при добавлении фильмов</li>
                            <li>добавить описания (возможно ссылки на трейлеры тд)</li>
                            <li>доработать валидацию форм</li>
                            <li>языки</li>
                            <li>админка</li>
                            <li>не подгружать все коллекции сразу. по клику на таб</li>

                        </ul>
                    </div>
                    {/* <Tabs onSelect={this.switchTabs.bind(this)} render={activeTab => (
                        <ItemsList activeTab={activeTab} />
                    )} /> */}

                    <BrickTabs onSelect={this.switchTabs.bind(this)} />
                    <Route path={`/home/top-movies`} exact component={MovieList} />
                    <Route path={`/home/top-tv-shows`} component={TVShowsList} />
                    <Route path={`/home/top-games`} component={GamesList} />
                    {/* {this.state.activeTab === 'movies' ?
                        <MovieList /> : null
                    }
                    {this.state.activeTab === 'tv' ?
                        <TVShowsList /> : null
                    }
                    {this.state.activeTab === 'games' ?
                        <GamesList /> : null
                    }
                    {this.state.activeTab === 'books' ?
                        'No content' : null
                    } */}
                </div>
            </div>

        )
    }
}