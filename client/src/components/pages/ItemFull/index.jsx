import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PageHeader from '../../common/PageHeader'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './index.css'

export default class ItemFull extends Component {
    constructor() {
        super()
        this.state = {
            itemData: {},
            descriptionFull: true
        }
    }

    toggleDescription() {
        this.setState({ descriptionFull: !this.state.descriptionFull })
    }

    componentDidMount() {
        let { page, id } = this.props.match.params
        const baseUrl = process.env.REACT_APP_MOVIE_DB_URL
        const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
        const lang = 'ru'

        page = page === 'movies' ? 'movie' : page

        if (page === 'games') {
            // https://rawg.io/api/games/portal-2
            axios.get(`https://rawg.io/api/games/${id}`)
                .then(res => {
                    this.setState({
                        itemData: res.data
                    })
                    // console.log(res)
                })
        } else {
            axios.get(`${baseUrl}/${page}/${id}?api_key=${apiKey}&language=${lang}`)
                .then(res => {
                    this.setState({
                        itemData: res.data
                    })
                    // console.log(res)
                })
        }

        // REACT_APP_MOVIE_DB_URL
        //https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=${lang}
        //https://api.themoviedb.org/3/tv/456?api_key=f173a387483cd86fc18ab172d5d822ae&language=en-US
    }
    render() {
        const { page, id } = this.props.match.params

        const { poster_path, background_image, backdrop_path,
            genres, name, title, overview, description,
            vote_average, rating, platforms, website,
            released, release_date, developers, publishers,
            clip, stores, production_companies, production_countries,
            homepage, seasons, in_production } = this.state.itemData

        const imageBaseUrl = page === 'movies' || page === 'tv' ? 'http://image.tmdb.org/t/p/w780' : ''

        const backdrop = backdrop_path ? imageBaseUrl + backdrop_path : background_image
        return (
            <div className="item_full">
                <PageHeader title={name || title} image={backdrop} />
                {this.state.itemData.id ?
                    <div className="container-fluid my-5">
                        <Row>
                            <Col xs={12} sm={12} md={5} lg={3}>
                                {background_image ?
                                    <img src={background_image} alt="" /> :
                                    <img src={imageBaseUrl + poster_path} alt="" />
                                }


                            </Col>
                            <Col xs={12} sm={12} md={7} lg={9}>
                                <h3>{name || title}</h3>
                                {clip ?
                                    <video playsInline controls poster={clip.preview} src={clip.clip}></video>
                                    : null}
                                <p className="movie__genres mt-2">
                                    {genres.map(genre => genre.name).join(', ')}
                                </p>
                                {developers ? <p>Developers: {developers.map(developer => developer.name).join(', ')}</p> : null}
                                {publishers ? <p>Publishers: {publishers.map(publisher => publisher.name).join(', ')}</p> : null}
                                {production_companies ? <p>Production companies: {production_companies.map(company => company.name).join(', ')}</p> : null}
                                {production_countries ? <p>Countries: {production_countries.map(country => country.name).join(', ')}</p> : null}
                                {released ? <p>Release date: {released}</p> : null}
                                {release_date ? <p>Release date: {release_date}</p> : null}
                                {website ? <p>Website: <a href={website} target="blank">{website}</a></p> : null}
                                {homepage ? <p>Homepag: <a href={homepage} target="blank">{homepage}</a></p> : null}

                                {seasons ?
                                    seasons.map(season => {
                                        if (season.name !== 'Specials') {
                                            return (
                                                <p>{season.name} - {season.episode_count} episodes ({season.air_date}) </p>
                                            )
                                        }
                                    })
                                    :
                                    null
                                }

                                {platforms ?
                                    platforms.map(platform => platform.platform.name).join(', ')
                                    :
                                    null
                                }
                                {rating ?
                                    <p>Rating: {rating}/5</p> :
                                    <p>Rating: {vote_average}</p>
                                }

                                {stores ? stores.map(store => <span className="stores mx-2"><a href={store.url}>{store.store.name}</a></span>) : null}

                                {overview ?
                                    <div onClick={this.toggleDescription.bind(this)} className={`overview ${this.state.descriptionFull ? 'short' : ''}`}>
                                        <p>{overview}</p>
                                    </div> :
                                    null
                                }

                                {description ?
                                    <div onClick={this.toggleDescription.bind(this)} className={`overview ${this.state.descriptionFull ? 'short' : ''}`} dangerouslySetInnerHTML={{ __html: description }} />
                                    : null
                                }

                            </Col>
                        </Row>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}