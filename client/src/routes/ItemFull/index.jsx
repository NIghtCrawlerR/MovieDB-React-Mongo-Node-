import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from 'react-share';

import Head from 'components/Head';
import CollectionsSelector from 'components/CollectionsSelector';
import { Button, Loader, Icon, Image, Tabs } from 'components/UI';

import VideoBlock from './components/VideoBlock';
import InfoBlock from './components/InfoBlock';
import ItemsRecommended from 'components/ItemsRecommended';
import Credits from './components/Credits';
import MainInfo from './components/MainInfo';
import Overview from './components/Overview';
import TopInfo from './components/TopInfo';

import { ITEM_FULL_TABS } from 'config/constants';

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
      tabSelected: 'main-info',
      shareLink: '',
    };
  }

  componentDidMount() {
    const {
      match: { params: { page, id } },
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
      getFullItem,
    } = this.props;

    if (id !== prevProps.match.params.id) {
      getFullItem(page, id);
    }
  }

  getItemData = (category) => {
    const {
      catalog: {
        itemFullInfo: {
          id, title, slug, genres, poster, rating,
        },
      },
    } = this.props;

    const newItem = {
      id,
      title,
      genres,
      poster,
      rating,
      slug,
      itemType: category,
      shareLink: '',
    };

    return newItem;
  }

  deleteFromWishlist = (category, itemId) => {
    const {
      user: {
        isLogin,
        id,
      },
      deleteItemFromWishlist,
    } = this.props;

    if (!isLogin) {
      alert('Login to update your collection.');
      return !1;
    }

    if (window.confirm('Delete item from wishlist?')) {
      deleteItemFromWishlist(category, itemId, id);
    }
  }

  addToWishlist = (category) => {
    const {
      user,
      addItemToWishlist,
    } = this.props;

    if (!user.isLogin) {
      alert('Login to update your collection.');
      return !1;
    }

    addItemToWishlist(category, this.getItemData(category), user.id);
  }

  switchTabs = (tabSelected) => {
    this.setState({
      tabSelected,
    });
  }

  render() {
    const {
      match: { params: { page, id } },
      user,
      catalog: { itemFullInfo },
    } = this.props;

    const {
      id: itemId,
      title,
      poster,
      backdrop_path,
      original_title,
      overview,
      rating,
      genres,
      website,
      release_date,
      platforms,
      stores,
      publishers,
      developers,
      production_companies,
      production_countries,
      number_of_seasons,
      number_of_episodes,
      next_episode_to_air,
      runtime,
      playtime,
      videos,
    } = itemFullInfo;

    const { loading, shareLink, tabSelected } = this.state;

    const imageBaseUrl = (size) => (page === 'movies' || page === 'tv' ? `http://image.tmdb.org/t/p/${size}` : '');

    const backgroundStyle = {
      backgroundImage: `url(${poster ? imageBaseUrl('w1280') + poster : backdrop_path})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    const itemIds = user[page].map((item) => item.id);
    const isInWishlist = itemIds.includes(itemFullInfo.id);

    const tabsFiltered = ITEM_FULL_TABS.filter(tab => !tab.categories || !tab.categories.includes(page))
    const ratingValue = rating;
    const releaseDate = release_date || null;

    return (
      <div className="item-full overlay" style={backgroundStyle}>
        <Head
          title={title}
          ogTitle={title}
          ogUrl={shareLink}
        />
        {loading && <Loader overlay />}

        <div className="content-wrap container-fluid item-full__info">
          <div>
            {/* Collections selector dropdown */}
            <div style={{ color: '#fff' }}>
              {user.isAdmin
                && <CollectionsSelector itemId={itemId} itemData={this.getItemData(page)} category={page} />}
            </div>

            <div className="item-full__info-wrap">
              {/* Left block */}
              <div className="item-full__column-left">

                {/* Top info */}
                <h3 className="item-full__title">{title}</h3>
                {original_title && <p className="item-full__original-title">{original_title}</p>}

                <TopInfo
                  release_date={releaseDate}
                  runtime={runtime}
                  playtime={playtime}
                  number_of_seasons={number_of_seasons}
                  number_of_episodes={number_of_episodes}
                  rating={ratingValue}
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
                      ? <Button variant="success" onClick={() => this.deleteFromWishlist(page, itemId)}><Icon name="minus" /> In wishlist</Button>
                      : <Button variant="warning" onClick={() => this.addToWishlist(page)}><Icon name="plus" /> Add to wishlist</Button> : null
                }

                {/* Overview */}
                <div>
                  <Image path={poster} size={780} />
                  <Overview overview={overview} />
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
                      release_date={release_date}
                      next_episode_to_air={next_episode_to_air}
                      developers={developers}
                      publishers={publishers}
                      production_companies={production_companies}
                      production_countries={production_countries}
                      platforms={platforms}
                      website={website}
                    />
                  }

                  {tabSelected === 'cast-and-crew' && page !== 'games' &&
                    <Credits id={id} category={page} />
                  }

                  {tabSelected === 'trailers' &&
                    <div>
                      {page === 'games' ? <VideoBlock gameTitle={title} /> : null}

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

export default withRouter(connect(mapStateToProps, {
  addItemToWishlist,
  deleteItemFromWishlist,
  getFullItem,
})(ItemFull));
