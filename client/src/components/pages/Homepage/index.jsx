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
            return <Redirect from="/home" to='/home/top-movies' />;
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
                            <li>редиректы на главной</li>
                            <li>пагинация</li>
                            <li>при наведении на фильм показывать полное название</li>
                            <li>при клике на фильм переход на страницу с описанием и трейлером</li>
                            <li>фильтр</li>
                            <li>делиться фильмами с пользователями</li>
                            <li>уведомления</li>
                            <li>сделать все табы на главной роутами</li>
                        </ul>
                    </div>

                    <BrickTabs onSelect={this.switchTabs.bind(this)} />
                    <Route path={`/home/top-movies`} exact component={MovieList} />
                    <Route path={`/home/top-tv-shows`} component={TVShowsList} />
                    <Route path={`/home/top-games`} component={GamesList} />
                </div>
            </div>

        )
    }
}