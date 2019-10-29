import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router'
import BrickTabs from '../../BrickTabs'
import Page from './Page'

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
            return <Redirect from="/home" to='/home/movies' />;
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
                            <li>define exact routes on main page</li>
                        </ul>
                    </div>

                    <BrickTabs onSelect={this.switchTabs.bind(this)} />
                    <Route path="/home/:page" component={Page} />
                </div>
            </div>

        )
    }
}