import React, { Component } from 'react';
import Item from '../Item'
import axios from 'axios'
import Slider from "react-slick";
import PageTitle from '../common/PageTitle'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.css'

const baseUrl = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="items-slider__arrow prev" onClick={onClick}>
            <i className="fas fa-chevron-left"></i>
        </div>
    );
}

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="items-slider__arrow next" onClick={onClick}>
            <i className="fas fa-chevron-right"></i>
        </div>
    );
}

export default class ItemsRecommended extends Component {
    constructor() {
        super()
        this.state = {
            items: []
        }
    }


    getRecomended(page, id, baseUrl, apiKey, lang) {
        page = page === 'movies' ? 'movie' : page
        if (page === 'games') {
            //https://rawg.io/api/games/portal-2/suggested
            axios.get(`https://rawg.io/api/games/${id}/suggested`)
                .then(res => {
                    this.setState({
                        items: res.data.results
                    })
                })
        } else {
            axios.get(`${baseUrl}/${page}/${id}/recommendations?api_key=${apiKey}&language=${lang}&page=1`)
                .then(res => {
                    this.setState({
                        items: res.data.results
                    })
                })
        }

    }

    componentDidMount() {
        let { page, id } = this.props

        this.getRecomended(page, id, baseUrl, apiKey, lang)
    }

    componentDidUpdate(prevProps) {
        let { page, id } = this.props
        if (prevProps.id !== id) {
            this.getRecomended(page, id, baseUrl, apiKey, lang)
        }
    }

    render() {
        const settings = {
            dots: false,
            arrows: true,
            infinite: true,
            centerPadding: '100px',
            slidesToShow: 6,
            slidesToScroll: 2,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
                },
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
                        arrows: false
                    }
                },
            ]
        };
        return (
            <React.Fragment>
                {this.state.items.length > 0 ?
                    <div className="items-slider mt-5">
                        <PageTitle title="Recommended" buttonBack={false} />
                        <Slider {...settings}>
                            {
                                this.state.items.map((item, i) => {
                                    return <Item {...item} type={this.props.page} key={item.id} img={item.poster_path ? `http://image.tmdb.org/t/p/w300${item.poster_path}` : item.background_image} />
                                })
                            }
                        </Slider>
                    </div>
                    : null}
            </React.Fragment>
        )
    }
}