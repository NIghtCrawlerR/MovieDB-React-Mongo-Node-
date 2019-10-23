import React, { Component } from 'react';
import MoviesSlider from './MoviesSlider'
import PageHeader from './common/PageHeader'
import axios from 'axios'
import { connect } from 'react-redux'
import { getTopMovies, getPopularMovies, getTopTV, getPopularTV } from '../actions/movieSelectionActions'

class Homepage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moviesPopular: [],
            moviesTopRated: [],
            tvPopular: [],
            tvTopRated: []
        }
    }
    componentDidMount() {
        const { moviesPopular, moviesTopRated, tvPopular, tvTopRated } = this.props.movies
        if (moviesPopular.length === 0) this.props.getPopularMovies()
        if (moviesTopRated.length === 0) this.props.getTopMovies()
        if (tvPopular.length === 0) this.props.getPopularTV()
        if (tvTopRated.length === 0) this.props.getTopTV()
    }
    render() {
        const { moviesPopular, moviesTopRated, tvPopular, tvTopRated } = this.props.movies
        return (
            <div className="mb-5">
                <PageHeader title="Explore popular movies" />
                <div className="container-fluid">
                    <div className="d-none"> 
                        <h3>Task list</h3>
                        <ul>
                            <li>рекомендации\похожие фильмы в коллекции</li>
                            <li>после добавления нового фильма в каталоге не подгружаются остальные</li>
                            <li>доработать апи при добавлении фильмов</li>
                            <li>добавить описания (возможно ссылки на трейлеры тд)</li>
                            <li>доработать валидацию форм</li>
                        </ul>
                    </div>
                    <MoviesSlider title="Popular movies" movies={moviesPopular} />
                    <MoviesSlider title="Top rated movies" movies={moviesTopRated} />
                    <MoviesSlider title="Popular TV shows" movies={tvPopular} />
                    <MoviesSlider title="Top Rated TV shows" movies={tvTopRated} />
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    movies: state.movieSelection
})

export default connect(mapStateToProps, {
    getTopMovies,
    getPopularMovies,
    getTopTV,
    getPopularTV
})(Homepage)