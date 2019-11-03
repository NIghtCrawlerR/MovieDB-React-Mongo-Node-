import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Redirect } from 'react-router'
import BrickTabs from '../../BrickTabs'
import Page from './Page'

export default class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
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
                            <li>адаптивка</li>
                            <li>доработать валидацию форм</li>
                            <li>языки</li>
                            <li>при наведении на фильм показывать полное название</li>
                            <li>фильтр</li>
                            <li>liked/watched</li>
                            <li>делиться фильмами с пользователями</li>
                            <li>уведомления</li>
                            <li>прелоадеры</li>
                            <li>баг с ривердейлом</li>
                            <li>задержка при подгрузке картинок, особенно в играх</li>
                        </ul>
                    </div>

                    <BrickTabs />
                    <Route path="/home/:page" component={Page} />
                </div>
            </div>

        )
    }
}