import React, { Component } from 'react';
import Slider from "react-slick";
import Movie from '../Movie'
import PageTitle from '../common/PageTitle'
import Loader from '../common/Loader'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'

export default class MoviesSlider extends Component {
    render() {
        var settings = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 1050,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
            ]
        };
        return (
            <div className="content-box popular__wrap">
                <PageTitle title={this.props.title} buttonBack={false} />
                <div className="mt-4">
                    {this.props.movies.length === 0 ?
                        <Loader /> :
                        <Slider {...settings}>
                            {this.props.movies ? this.props.movies.map(movie => {
                                return <Movie {...movie} slider img={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} key={movie.id} _id={movie.id} />
                            }) : null}
                        </Slider>
                    }

                </div>

            </div>
        )
    }
}