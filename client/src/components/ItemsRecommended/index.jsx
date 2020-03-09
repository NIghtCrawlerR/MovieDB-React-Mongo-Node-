import React, { Component } from 'react';
import axios from 'axios';
import Slider from '../SliderCustom';
import PageTitle from '../PageTitle';
import Item from '../Item';

import {
  MOVIE_API_BASEURL,
  MOVIE_API_KEY
} from 'config/constants';

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

    this.getRecomended(page, id, MOVIE_API_BASEURL, MOVIE_API_KEY, lang);
  }

  componentDidUpdate(prevProps) {
    const { page, id } = this.props;

    if (prevProps.id !== id) {
      this.getRecomended(page, id, MOVIE_API_BASEURL, MOVIE_API_KEY, lang);
    }
  }

  getRecomended(page, id, MOVIE_API_BASEURL, MOVIE_API_KEY, lang) {
    page = page === 'movies' ? 'movie' : page;

    if (page === 'games') {
      axios.get(`https://rawg.io/api/games/${id}/suggested`)
        .then((res) => {
          this.setState({
            items: res.data.results,
          });
        });
    } else {
      axios.get(`${MOVIE_API_BASEURL}/${page}/${id}/recommendations?api_key=${MOVIE_API_KEY}&language=${lang}&page=1`)
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
      items.length > 0
        ? (
          <div className="items-slider mt-5">
            <PageTitle title="Also you may like:" buttonBack={false} />
            <Slider>
              {
                items.map((item) => {
                  const { poster_path, background_image } = item;

                  return (
                    <Item
                      {...item}
                      type={page}
                      key={item.id}
                      img={poster_path || background_image}
                    />
                  )
                })
              }
            </Slider>
          </div>
        )
        : null
    );
  }
}

export default ItemsRecommended;
