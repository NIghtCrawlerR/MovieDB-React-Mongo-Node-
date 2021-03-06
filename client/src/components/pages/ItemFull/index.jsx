import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from '../../common/Loader'
import ItemsRecommended from '../../ItemsRecommended'
import InfoBlock from './InfoBlock'
import VideoBlock from './VideoBlock'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
} from 'react-share'
import Head from '../../common/Head'
import { connect } from 'react-redux'

import {
    addItemToWishlist,
    deleteItemFromWishlist
} from '../../../actions/itemsCollectionsActions'

import './index.css'

const baseUrl = process.env.REACT_APP_MOVIE_DB_URL
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY
const lang = 'ru'

class ItemFull extends Component {
    constructor() {
        super()
        this.state = {
            itemData: {},
            descriptionFull: true,
            loading: false,
            cast: [],
            directing: [],
            production: [],
            writing: []
        }
    }

    addToWishlist() {
        let { page } = this.props.match.params
        const { user } = this.props
        const { id, title, name, genre_ids, genres, poster_path, background_image, vote_average, rating, slug } = this.state.itemData

        if (!user.isLogin) {
            alert('Login to add movie to your collection.')
            return !1
        }

        const newItem = {
            id: id,
            title: title || null,
            name: name || null,
            genre_ids: genre_ids || null,
            genres: genres || null,
            poster_path: poster_path || null,
            background_image: background_image || null,
            vote_average: vote_average || null,
            rating: rating || null,
            slug: slug || null,
            itemType: page,
            shareLink: ''
        }

        this.props.addItemToWishlist(page, newItem, user.userId)
    }

    deleteFromWishlist() {
        let { page } = this.props.match.params
        const { id } = this.state.itemData
        const { user } = this.props

        if (!user.isLogin) {
            alert('Login to add movie to your collection.')
            return !1
        }

        if (window.confirm("Delete item from wishlist?")) {
            this.props.deleteItemFromWishlist(page, id, user.userId)
        }
    }

    toggleDescription() {
        this.setState({ descriptionFull: !this.state.descriptionFull })
    }

    getCredits(id, page) {
        //https://api.themoviedb.org/3/movie/474350/credits?api_key=f173a387483cd86fc18ab172d5d822ae
        axios.get(`${baseUrl}/${page}/${id}/credits?api_key=${apiKey}`)
            .then(res => {
                const data = res.data
                this.setState({
                    cast: data.cast.filter(cast => cast.order < 10),
                    directing: data.crew.filter(member => member.job === 'Director'),
                    production: data.crew.filter(member => member.job === 'Producer'),
                    writing: data.crew.filter(member => member.department === 'Writing')
                })
            })
            .catch(err => console.log(err))
    }

    getItem(page, id, baseUrl, apiKey, lang) {
        this.setState({ loading: true })
        page = page === 'movies' ? 'movie' : page

        if (page === 'games') {
            axios.get(`https://rawg.io/api/games/${id}`)
                .then(res => {
                    this.setState({
                        itemData: res.data,
                        loading: false
                    })
                    return res.data
                })
                .catch(err => console.log('error: ', err))
        } else {
            axios.get(`${baseUrl}/${page}/${id}?api_key=${apiKey}&language=${lang}&append_to_response=videos`)
                .then(res => {
                    this.setState({
                        itemData: res.data,
                        loading: false
                    })
                    this.getCredits(id, page)
                })
                .catch(err => console.log('error: ', err))
        }
    }

    componentDidMount() {
        let { page, id } = this.props.match.params
        this.getItem(page, id, baseUrl, apiKey, lang)

        this.setState({
            shareLink: `https://mern-movie-db.herokuapp.com${this.props.location.pathname}`
        })
    }

    componentDidUpdate(prevProps) {
        let { page, id } = this.props.match.params

        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.getItem(page, id, baseUrl, apiKey, lang, 'update')
        }
    }

    render() {
        const { page, id } = this.props.match.params

        const { poster_path, background_image, backdrop_path,
            genres, name, title, original_title, original_name, overview, description,
            vote_average, rating, platforms, website,
            released, release_date, developers, publishers,
            stores, production_companies, production_countries,
            homepage, number_of_seasons, number_of_episodes,
            runtime, playtime, first_air_date, videos, name_original,
            next_episode_to_air } = this.state.itemData

        const imageBaseUrl = (size) => {
            return page === 'movies' || page === 'tv' ? `http://image.tmdb.org/t/p/${size}` : ''
        }

        // const backdrop = backdrop_path ? imageBaseUrl('w780') + backdrop_path : background_image

        const backgroundStyle = {
            backgroundImage: `url(${backdrop_path ? imageBaseUrl('w1280') + backdrop_path : background_image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }

        const itemIds = this.props.user[page].map(item => item.id)
        return (
            <div className="item_full overlay" style={backgroundStyle}>
                <Head
                    title={name || title}
                    ogTitle={name || title}
                    ogImage={background_image || imageBaseUrl('w780') + poster_path}
                    ogUrl={this.state.shareLink}
                />
                {this.state.loading ? <Loader overlay /> : null}
                {/* <PageHeader title={name || title} image={backdrop} /> */}
                {this.state.itemData.id ?
                    <div className="content-wrap container-fluid my-5">
                        <Row>
                            <Col xs={12} sm={12} md={5} lg={3} className="mb-5">
                                {background_image ?
                                    <img src={background_image} alt="" /> :
                                    <img src={imageBaseUrl('w780') + poster_path} alt="" />
                                }
                            </Col>
                            <Col xs={12} sm={12} md={7} lg={9} className="item_full__info">
                                <div className="info-top mb-2">
                                    {released || release_date || first_air_date ?
                                        <span>{new Date(released || release_date || first_air_date).getFullYear()}</span>
                                        : null}
                                    {runtime ? <span>{`${runtime} min`}</span> : ''}
                                    {playtime ? <span>{`${playtime} hours`}</span> : ''}
                                    {number_of_seasons ? <span>{`${number_of_seasons} Seasons`}</span> : null}
                                    {number_of_episodes ? <span>{`${number_of_episodes} Episodes`}</span> : null}
                                    {vote_average ? <span><i className="fas fa-star mr-2"></i>{vote_average}</span> : null}
                                    {rating ? <span><i className="fas fa-star mr-2"></i>{rating}</span> : null}
                                </div>
                                <h3>{name || title}</h3>
                                {original_title || original_name ? <small>{original_title || original_name}</small> : null}
                                {
                                    this.props.user ?
                                        itemIds.includes(this.state.itemData.id) ?
                                            <Button className="my-4" variant="warning" onClick={this.deleteFromWishlist.bind(this)}>In wishlist</Button> :
                                            <Button className="my-4" variant="outline-success" onClick={this.addToWishlist.bind(this)}>Add to wishlist</Button> : null
                                }

                                <div className="share-buttons mb-4">
                                    <FacebookShareButton url={this.state.shareLink}>
                                        <FacebookIcon size={40} round={true} />
                                    </FacebookShareButton>

                                    <TelegramShareButton url={this.state.shareLink}>
                                        <TelegramIcon size={40} round={true} />
                                    </TelegramShareButton>
                                </div>

                                <Row>
                                    <Col xs={12} sm={12} md={6} lg={4}>
                                        {genres ?
                                            <InfoBlock title="Genres:" data={genres.map(genre => genre.name).join(', ')} />
                                            : null}
                                        {released || release_date ?
                                            <InfoBlock title="Release date:" data={new Date(released || release_date).toLocaleDateString()} />
                                            : null}
                                        {first_air_date ?
                                            <InfoBlock title="First air date:" data={new Date(first_air_date).toLocaleDateString()} />
                                            : null}
                                        {next_episode_to_air ?
                                            <InfoBlock title="Next episod date:" data={new Date(next_episode_to_air.air_date).toLocaleDateString()} />
                                            : null}

                                        {rating ? <InfoBlock title="Rating:" data={`${rating}/5`} /> : null}
                                        {vote_average ? <InfoBlock title="Rating:" data={vote_average} /> : null}
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={4}>
                                        {developers ?
                                            <InfoBlock title="Developer:" data={developers.map(developer => developer.name).join(', ')} />
                                            : null}
                                        {publishers ?
                                            <InfoBlock title="Publisher:" data={publishers.map(publisher => publisher.name).join(', ')} />
                                            : null}
                                        {production_companies && production_companies.length > 0 ?
                                            <InfoBlock title="Production companies:" data={production_companies.map(company => company.name).join(', ')} />
                                            : null}
                                        {production_countries ?
                                            <InfoBlock title="Countries:" data={production_countries.map(country => country.name).join(', ')} />
                                            : null}
                                        {platforms ?
                                            <InfoBlock title="Platforms:" data={platforms.map(platform => platform.platform.name).join(', ')} />
                                            : null}
                                    </Col>
                                </Row>

                                {this.state.cast.length > 0
                                    ? <InfoBlock title="В ролях:"
                                        data={this.state.cast.map(member => (<Link key={member.id} to={`/search/${page}/cast/${member.id}`}>{member.name}</Link>))
                                            .reduce((prev, curr) => [prev, ', ', curr])} />
                                    : null}
                                {this.state.directing.length > 0
                                    ? <InfoBlock title="Режиссер:"
                                        data={this.state.directing.map(member => <Link key={member.id} to={`/search/${page}/crew/${member.id}`}>{member.name}</Link>)
                                            .reduce((prev, curr) => [prev, ', ', curr])} />
                                    : null}
                                {this.state.production.length > 0
                                    ? <InfoBlock title="Продюсеры:"
                                        data={this.state.production.map(member => <Link key={member.id} to={`/search/${page}/crew/${member.id}`}>{member.name}</Link>)
                                            .reduce((prev, curr) => [prev, ', ', curr])} />
                                    : null}
                                {this.state.writing.length > 0
                                    ? <InfoBlock title="Сценарий:"
                                        data={this.state.writing.map(member => <Link key={member.id} to={`/search/${page}/crew/${member.id}`}>{member.name}</Link>)
                                            .reduce((prev, curr) => [prev, ', ', curr])} />
                                    : null}

                                {homepage || website ?
                                    <InfoBlock title="Website:" data={<a href={homepage || website} target="blank">{homepage || website}</a>} />
                                    : null}

                                {stores ?
                                    <InfoBlock title="Stores:" data={
                                        stores.map((store, i) => <Button key={i} href={store.url} target="_blank" className="mr-2 mb-2" variant="outline-secondary">{store.store.name}</Button>)
                                    } />
                                    : null}

                                <div className="video" style={{ 'position': 'relative' }}>
                                    {page === 'games' ? <VideoBlock gameTitle={name_original} /> : null}

                                    {videos && videos.results.length > 0 ?
                                        <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${videos.results[0].key}`}></iframe>
                                        : null}
                                </div>

                                {overview ?
                                    <React.Fragment>
                                        <h3 className="text-uppercase mt-5">Overview</h3>
                                        <div className='overview'>
                                            <p>{overview}</p>
                                        </div>
                                    </React.Fragment>
                                    :
                                    null
                                }

                                {description ?
                                    <React.Fragment>
                                        <h3 className="text-uppercase mt-5">Overview</h3>
                                        <div className='overview' dangerouslySetInnerHTML={{ __html: description }} />
                                    </React.Fragment>
                                    : null
                                }

                            </Col>
                            <Col xs={12}>
                                <ItemsRecommended page={page} id={id} />
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

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {
    addItemToWishlist,
    deleteItemFromWishlist
})(ItemFull)