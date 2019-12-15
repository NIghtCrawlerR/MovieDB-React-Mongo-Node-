import React, { Component } from 'react';
import axios from 'axios';
import Slider from '../common/SliderCustom';
import PageTitle from '../common/PageTitle';
import Item from '../Item';

const baseUrl = process.env.REACT_APP_MOVIE_DB_URL;
const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
const lang = 'ru';


class ItemsRecommended extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const { page, id } = this.props;

    this.getRecomended(page, id, baseUrl, apiKey, lang);
  }

  componentDidUpdate(prevProps) {
    const { page, id } = this.props;

    if (prevProps.id !== id) {
      this.getRecomended(page, id, baseUrl, apiKey, lang);
    }
  }

  getRecomended(page, id, baseUrl, apiKey, lang) {
    page = page === 'movies' ? 'movie' : page;

    if (page === 'games') {
      // https://rawg.io/api/games/portal-2/suggested
      axios.get(`https://rawg.io/api/games/${id}/suggested`)
        .then((res) => {
          this.setState({
            items: res.data.results,
          });
        });
    } else {
      axios.get(`${baseUrl}/${page}/${id}/recommendations?api_key=${apiKey}&language=${lang}&page=1`)
        .then((res) => {
          this.setState({
            items: res.data.results,
          });
        });
    }
  }

  render() {
    const { items } = this.state;
    const { page } = this.props;

    return (
      <>
        {items.length > 0
          ? (
            <div className="items-slider mt-5">
              <PageTitle title="Also you may like:" buttonBack={false} />
              <Slider>
                {
                  items.map((item) => <Item {...item} type={page} key={item.id} img={item.poster_path ? `http://image.tmdb.org/t/p/w300${item.poster_path}` : item.background_image} />)
                }
              </Slider>
            </div>
          )
          : null}
      </>
    );
  }
}

export default ItemsRecommended;
