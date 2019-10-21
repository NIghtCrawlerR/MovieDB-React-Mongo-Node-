import React, { Component } from 'react';
import Slider from "react-slick";
import Movie from '../Movie'
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'

export default class MoviesPopular extends Component {
    constructor() {
        super()
        this.state = {
            movies: []
        }
    }
    componentDidMount() {
        console.log('componentDidMount')
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f173a387483cd86fc18ab172d5d822ae&language=ru&page=1')
            .then(res => {
                this.setState({ movies: res.data.results })
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    render() {
        var settings = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <div>
                <h3>Popular</h3>
                <div className="">
                    <Slider {...settings}>
                        {this.state.movies ? this.state.movies.map(movie => {
                            return <Movie {...movie} img={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} key={movie.id} />
                        }) : null}
                    </Slider>
                </div>

            </div>
        )
    }
}