import React, { Component } from 'react';
import axios from 'axios';

import Slider from '../SliderCustom';
import PageTitle from '../PageTitle';
import Item from '../Item';

import { GET_ITEM_RECOMMENDED_URL } from 'config/constants';

class ItemsRecommended extends Component {
  mounted = false;

  state = {
    items: [],
  };

  componentDidMount() {
    this.mounted = true;

    this.getRecomended();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;

    if (prevProps.id !== id) {
      this.getRecomended();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getRecomended() {
    const { page, id } = this.props;

    const request = {
      url: GET_ITEM_RECOMMENDED_URL(page, id),
      method: 'get',
    }

    axios(request)
      .then(({ data }) => {
        if (data.success && this.mounted) {
          this.setState({ items: data.data });
        }
      })
      .catch(err => console.error(err))
  }

  render() {
    const { items } = this.state;
    const { page } = this.props;

    return (
      items && items.length > 0 && (
        <div className="items-slider mt-5">
          <PageTitle title="Also you may like:" buttonBack={false} />
          <Slider>
            {items.map((item) => (
              <Item
                {...item}
                type={page}
                key={item.id}
              />
            ))}
          </Slider>
        </div>
      )
    );
  }
}

export default ItemsRecommended;
