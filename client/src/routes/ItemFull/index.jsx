import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from 'react-share';

import Head from 'components/common/Head';
import CollectionsSelector from 'components/CollectionsSelector';
import VideoBlock from './components/VideoBlock';
import InfoBlock from './components/InfoBlock';
import ItemsRecommended from 'components/ItemsRecommended';
import Loader from 'components/common/Loader';
import Credits from './components/Credits';
import MainInfo from './components/MainInfo';
import Overview from './components/Overview';
import TopInfo from './components/TopInfo';
import Tabs from 'components/common/Tabs';

import {
  addItemToWishlist,
  deleteItemFromWishlist,
  getFullItem,
} from 'actions';

import './index.scss';

class ItemFull extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tabs: [
        { title: 'Main info', value: 'main-info' },
        { title: 'Cast and crew', value: 'cast-and-crew', categories: ['games'] },
        { title: 'Trailers', value: 'trailers' },
      ],
      tabSelected: 'main-info',
      shareLink: '',
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

    addItemToWishlist(page, this.getItemData(), user.id);
  }

  switchTabs = (tabSelected) => {
    this.setState({
      tabSelected,
    });
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
      catalog: { itemFullInfo },
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
    } = itemFullInfo;

    const { loading, shareLink, tabs, tabSelected } = this.state;

    const imageBaseUrl = (size) => (page === 'movies' || page === 'tv' ? `http://image.tmdb.org/t/p/${size}` : '');

    const backgroundStyle = {
      backgroundImage: `url(${backdrop_path ? imageBaseUrl('w1280') + backdrop_path : background_image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    const itemIds = user[page].map((item) => item.id);
    const isInWishlist = itemIds.includes(this.props.catalog.itemFullInfo.id);

    const tabsFiltered = tabs.filter(tab => !tab.categories || !tab.categories.includes(page))

    return (
      <div className="item-full overlay" style={backgroundStyle}>
        <Head
          title={name || title}
          ogTitle={name || title}
          ogImage={background_image || imageBaseUrl('w780') + poster_path}
          ogUrl={shareLink}
        />
        {loading && <Loader overlay />}

        <div className="content-wrap container-fluid item-full__info">
          <div>
            {/* Collections selector dropdown */}
            <div style={{ color: '#fff' }}>
              {user.group === 'admin'
                && <CollectionsSelector itemId={+this.getItemData().id} itemData={this.getItemData()} category={page} />}
            </div>

            <div className="item-full__info-wrap">
              {/* Left block */}
              <div className="item-full__column-left">

                {/* Top info */}
                <h3 className="item-full__title">{name || title}</h3>
                {(original_title || original_name) && <p className="item-full__original-title">{original_title || original_name}</p>}

                <TopInfo
                  release_date={released || release_date || first_air_date}
                  runtime={runtime}
                  playtime={playtime}
                  number_of_seasons={number_of_seasons}
                  number_of_episodes={number_of_episodes}
                  rating={vote_average || getGameRating(rating)}
                />

                {/* Buttons */}
                <div className="share-buttons mb-4">
                  <FacebookShareButton url={shareLink}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>

                  <TelegramShareButton url={shareLink}>
                    <TelegramIcon size={40} round />
                  </TelegramShareButton>
                </div>

                {
                  this.props.user
                    ? isInWishlist
                      ? <Button className="my-4" variant="warning" onClick={this.deleteFromWishlist.bind(this)}>In wishlist</Button>
                      : <Button className="my-4" variant="outline-success" onClick={this.addToWishlist.bind(this)}>Add to wishlist</Button> : null
                }

                {/* Overview */}
                <div>
                  {background_image
                    ? <img src={background_image} alt="" />
                    : <img src={imageBaseUrl('w780') + poster_path} alt="" />}
                  <Overview
                    overview={overview || description}
                  />
                </div>
              </div>

              {/* Right block */}
              <div className="item-full__column-right">
                <Tabs
                  tabs={tabsFiltered}
                  active={tabSelected}
                  onSelect={this.switchTabs}
                />

                {/* Tabs content */}
                <div className="tabs-content">
                  {tabSelected === 'main-info' &&
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
                  }

                  {tabSelected === 'cast-and-crew' && page !== 'games' &&
                    <Credits id={id} category={page} />
                  }

                  {tabSelected === 'trailers' &&
                    <div>
                      {page === 'games' ? <VideoBlock gameTitle={name_original} /> : null}

                      {videos && videos.results.length > 0
                        ? <iframe width="100%" height="400px" title="trailer" src={`https://www.youtube.com/embed/${videos.results[0].key}`} />
                        : null}
                    </div>
                  }

                  {stores
                    && (
                      <InfoBlock
                        title="Stores:"
                        data={
                          stores.map((store, i) => <Button key={i} href={store.url} target="_blank" className="mr-2 mb-2" variant="outline-secondary">{store.store.name}</Button>)
                        }
                      />
                    )}
                </div>
              </div>
            </div>
            <ItemsRecommended page={page} id={id} />
          </div>
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
