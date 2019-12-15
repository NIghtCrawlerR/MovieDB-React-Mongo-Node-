import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from 'react-share';

import Head from '../../common/Head';
import VideoBlock from './VideoBlock';
import InfoBlock from './InfoBlock';
import ItemsRecommended from '../../ItemsRecommended';
import Loader from '../../common/Loader';
import Credits from './Credits';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
} from '../../../actions/itemsCollectionsActions';

import './index.css';

const baseUrl = process.env.REACT_APP_MOVIE_DB_URL;
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
const lang = 'ru';

class ItemFull extends Component {
  constructor() {
    super();
    this.state = {
      itemData: {},
      descriptionFull: true,
      loading: false,
    };
  }

  componentDidMount() {
    const { page, id } = this.props.match.params;
    this.getItem(page, id, baseUrl, apiKey, lang);

    this.setState({
      shareLink: `https://mern-movie-db.herokuapp.com${this.props.location.pathname}`,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: { page, id } },
    } = this.props;

    if (id !== prevProps.match.params.id) {
      this.getItem(page, id, baseUrl, apiKey, lang, 'update');
    }
  }

  getItem(page, id, baseUrl, apiKey, lang) {
    this.setState({ loading: true });
    page = page === 'movies' ? 'movie' : page;

    const requestUrl = page === 'games'
      ? `https://rawg.io/api/games/${id}`
      : `${baseUrl}/${page}/${id}?api_key=${apiKey}&language=${lang}&append_to_response=videos`;

    axios.get(requestUrl)
      .then((res) => {
        this.setState({
          itemData: res.data,
          loading: false,
        });
        return res.data;
      })
      .catch((err) => console.log('error: ', err));
  }

  deleteFromWishlist() {
    const {
      user,
      match: { params: { page } },
      deleteItemFromWishlist,
    } = this.props;

    const { id } = this.state.itemData;

    if (!user.isLogin) {
      alert('Login to add movie to your collection.');
      return !1;
    }

    if (window.confirm('Delete item from wishlist?')) {
      deleteItemFromWishlist(page, id, user.userId);
    }
  }

  addToWishlist() {
    const {
      user,
      match: { params: { page } },
      addItemToWishlist,
    } = this.props;

    const {
      itemData: {
        id, title, name, genre_ids, genres, poster_path, background_image, vote_average, rating, slug,
      },
    } = this.state;

    if (!user.isLogin) {
      alert('Login to add movie to your collection.');
      return !1;
    }

    const newItem = {
      id,
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
      shareLink: '',
    };

    addItemToWishlist(page, newItem, user.userId);
  }

  render() {
    const getGameRating = (rate) => {
      const percent = (rate / 5) * 100;
      const valFromPrecent = (percent * 10) / 100;
      return valFromPrecent.toFixed(2);
    };

    const listFromArray = (array) => array.map((item) => item.name).join(', ');

    const {
      match: {
        params: { page, id },
      },
      user,
    } = this.props;

    const {
      poster_path, background_image, backdrop_path,
      genres, name, title, original_title, original_name, overview, description,
      vote_average, rating, platforms, website,
      released, release_date, developers, publishers,
      stores, production_companies, production_countries,
      homepage, number_of_seasons, number_of_episodes,
      runtime, playtime, first_air_date, videos, name_original,
      next_episode_to_air,
    } = this.state.itemData;

    const { itemData, loading, shareLink } = this.state;

    const imageBaseUrl = (size) => (page === 'movies' || page === 'tv' ? `http://image.tmdb.org/t/p/${size}` : '');

    // const backdrop = backdrop_path ? imageBaseUrl('w780') + backdrop_path : background_image

    const backgroundStyle = {
      backgroundImage: `url(${backdrop_path ? imageBaseUrl('w1280') + backdrop_path : background_image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    const itemIds = user[page].map((item) => item.id);
    const isInWishlist = itemIds.includes(this.state.itemData.id);

    return (
      <div className="item_full overlay" style={backgroundStyle}>
        <Head
          title={name || title}
          ogTitle={name || title}
          ogImage={background_image || imageBaseUrl('w780') + poster_path}
          ogUrl={shareLink}
        />
        {loading && <Loader overlay />}
        {/* <PageHeader title={name || title} image={backdrop} /> */}
        {itemData.id
          ? (
            <div className="content-wrap container-fluid my-5">
              <Row>
                <Col xs={12} sm={12} md={5} lg={3} className="mb-5">
                  {background_image
                    ? <img src={background_image} alt="" />
                    : <img src={imageBaseUrl('w780') + poster_path} alt="" />}
                </Col>
                <Col xs={12} sm={12} md={7} lg={9} className="item_full__info">
                  <div className="info-top mb-2">
                    {released || release_date || first_air_date
                      ? <span>{new Date(released || release_date || first_air_date).getFullYear()}</span>
                      : null}
                    {runtime && <span>{`${runtime} min`}</span>}
                    {playtime && <span>{`${playtime} hours`}</span>}
                    {number_of_seasons && <span>{`${number_of_seasons} Seasons`}</span>}
                    {number_of_episodes && <span>{`${number_of_episodes} Episodes`}</span>}
                    {vote_average || rating ? (
                      <span>
                        <i className="fas fa-star mr-2" />
                        {vote_average || getGameRating(rating)}
                      </span>
                    ) : null}
                  </div>
                  <h3>{name || title}</h3>
                  {(original_title || original_name) && <small>{original_title || original_name}</small>}
                  {
                    this.props.user
                      ? isInWishlist
                        ? <Button className="my-4" variant="warning" onClick={this.deleteFromWishlist.bind(this)}>In wishlist</Button>
                        : <Button className="my-4" variant="outline-success" onClick={this.addToWishlist.bind(this)}>Add to wishlist</Button> : null
                  }

                  <div className="share-buttons mb-4">
                    <FacebookShareButton url={shareLink}>
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>

                    <TelegramShareButton url={shareLink}>
                      <TelegramIcon size={40} round />
                    </TelegramShareButton>
                  </div>

                  <Row>
                    <Col xs={12} sm={12} md={6} lg={4}>
                      {genres
                        ? <InfoBlock title="Genres:" data={genres.map((genre) => genre.name).join(', ')} />
                        : null}
                      {released || release_date
                        ? <InfoBlock title="Release date:" data={new Date(released || release_date).toLocaleDateString()} />
                        : null}
                      {first_air_date
                        ? <InfoBlock title="First air date:" data={new Date(first_air_date).toLocaleDateString()} />
                        : null}
                      {next_episode_to_air
                        ? <InfoBlock title="Next episod date:" data={new Date(next_episode_to_air.air_date).toLocaleDateString()} />
                        : null}

                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4}>
                      {developers && <InfoBlock title="Developer:" data={listFromArray(developers)} />}
                      {publishers && <InfoBlock title="Publisher:" data={listFromArray(publishers)} />}
                      {production_companies && production_companies.length > 0
                        ? <InfoBlock title="Production companies:" data={listFromArray(production_companies)} />
                        : null}
                      {production_countries && <InfoBlock title="Countries:" data={listFromArray(production_countries)} />}
                      {platforms && <InfoBlock title="Platforms:" data={listFromArray(platforms)} />}
                    </Col>
                  </Row>

                  <Credits id={id} category={page} />

                  {homepage || website
                    ? <InfoBlock title="Website:" data={<a href={homepage || website} target="blank">{homepage || website}</a>} />
                    : null}

                  {stores
                    ? (
                      <InfoBlock
                        title="Stores:"
                        data={
                          stores.map((store, i) => <Button key={i} href={store.url} target="_blank" className="mr-2 mb-2" variant="outline-secondary">{store.store.name}</Button>)
                        }
                      />
                    )
                    : null}

                  <div className="video" style={{ position: 'relative' }}>
                    {page === 'games' ? <VideoBlock gameTitle={name_original} /> : null}

                    {videos && videos.results.length > 0
                      ? <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${videos.results[0].key}`} />
                      : null}
                  </div>

                  {overview
                    ? (
                      <>
                        <h3 className="text-uppercase mt-5">Overview</h3>
                        <div className="overview">
                          <p>{overview}</p>
                        </div>
                      </>
                    )
                    : null}

                  {description
                    ? (
                      <>
                        <h3 className="text-uppercase mt-5">Overview</h3>
                        <div className="overview" dangerouslySetInnerHTML={{ __html: description }} />
                      </>
                    )
                    : null}

                </Col>
                <Col xs={12}>
                  <ItemsRecommended page={page} id={id} />
                </Col>
              </Row>
            </div>
          )
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  addItemToWishlist,
  deleteItemFromWishlist,
})(ItemFull);
