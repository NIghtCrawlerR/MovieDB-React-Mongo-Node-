import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from 'react-share';

import Head from '../../common/Head';
import CollectionsSelector from '../../CollectionsSelector';
import VideoBlock from './VideoBlock';
import InfoBlock from './InfoBlock';
import ItemsRecommended from '../../ItemsRecommended';
import Loader from '../../common/Loader';
import Credits from './Credits';
import MainInfo from './MainInfo';
import Overview from './Overview';
import TopInfo from './TopInfo';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
  getFullItem,
} from '../../../actions';

import './index.css';

class ItemFull extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };

    this.getItemData = this.getItemData.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { page, id },
      },
      location: { pathname },
      getFullItem,
    } = this.props;

    getFullItem(page, id);

    this.setState({
      shareLink: `https://mern-movie-db.herokuapp.com${pathname}`,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: { page, id } },
    } = this.props;

    if (id !== prevProps.match.params.id) {
      this.props.getFullItem(page, id);
    }
  }

  getItemData() {
    const {
      match: { params: { page } },
      catalog: {
        itemFullInfo: {
          id, title, name, slug,
          genre_ids, genres,
          poster_path, background_image,
          vote_average, rating
        },
      },
    } = this.props;

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

    return newItem;
  }

  deleteFromWishlist() {
    const {
      user: {
        isLogin,
        userId,
      },
      match: { params: { page } },
      catalog: {
        itemFullInfo: { id },
      },
      deleteItemFromWishlist,
    } = this.props;

    if (!isLogin) {
      alert('Login to update your collection.');
      return !1;
    }

    if (window.confirm('Delete item from wishlist?')) {
      deleteItemFromWishlist(page, id, userId);
    }
  }

  addToWishlist() {
    const {
      user,
      match: { params: { page } },
      addItemToWishlist,
    } = this.props;

    if (!user.isLogin) {
      alert('Login to update your collection.');
      return !1;
    }

    addItemToWishlist(page, this.getItemData(), user.userId);
  }

  render() {
    const getGameRating = (rate) => {
      const percent = (rate / 5) * 100;
      const valFromPrecent = (percent * 10) / 100;
      return valFromPrecent.toFixed(2);
    };

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
    } = this.props.catalog.itemFullInfo;

    const { loading, shareLink } = this.state;

    const imageBaseUrl = (size) => (page === 'movies' || page === 'tv' ? `http://image.tmdb.org/t/p/${size}` : '');

    const backgroundStyle = {
      backgroundImage: `url(${backdrop_path ? imageBaseUrl('w1280') + backdrop_path : background_image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    const itemIds = user[page].map((item) => item.id);
    const isInWishlist = itemIds.includes(this.props.catalog.itemFullInfo.id);

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

        <div className="content-wrap container-fluid my-5">
          <Row>
            <Col xs={12} style={{ color: '#fff' }}>
              {user.data.group === 'admin'
                && <CollectionsSelector itemId={+id} itemData={this.getItemData()} category={page} />}
            </Col>
            <Col xs={12} sm={12} md={5} lg={3} className="mb-5">
              {background_image
                ? <img src={background_image} alt="" />
                : <img src={imageBaseUrl('w780') + poster_path} alt="" />}
            </Col>
            <Col xs={12} sm={12} md={7} lg={9} className="item_full__info">
              <TopInfo
                release_date={released || release_date || first_air_date}
                runtime={runtime}
                playtime={playtime}
                number_of_seasons={number_of_seasons}
                number_of_episodes={number_of_episodes}
                rating={vote_average || getGameRating(rating)}
              />

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

              <MainInfo
                genres={genres}
                released={released}
                release_date={release_date}
                first_air_date={first_air_date}
                next_episode_to_air={next_episode_to_air}
                developers={developers}
                publishers={publishers}
                production_companies={production_companies}
                production_countries={production_countries}
                platforms={platforms}
                website={homepage || website}
              />

              <Credits id={id} category={page} />

              {stores
                && (
                  <InfoBlock
                    title="Stores:"
                    data={
                      stores.map((store, i) => <Button key={i} href={store.url} target="_blank" className="mr-2 mb-2" variant="outline-secondary">{store.store.name}</Button>)
                    }
                  />
                )}

              <div className="video" style={{ position: 'relative' }}>
                {page === 'games' ? <VideoBlock gameTitle={name_original} /> : null}

                {videos && videos.results.length > 0
                  ? <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${videos.results[0].key}`} />
                  : null}
              </div>

              <Overview
                overview={overview || description}
              />
            </Col>
            <Col xs={12}>
              <ItemsRecommended page={page} id={id} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  catalog: state.catalog,
});

export default connect(mapStateToProps, {
  addItemToWishlist,
  deleteItemFromWishlist,
  getFullItem,
})(ItemFull);
