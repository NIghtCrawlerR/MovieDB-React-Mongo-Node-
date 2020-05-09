import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { GET_ITEM_RECOMMENDED_URL } from 'config/constants';
import Slider from '../SliderCustom';
import PageTitle from '../PageTitle';
import Item from '../Item';


const ItemsRecommended = ({ id, page }) => {
  const [items, setItems] = useState([]);

  const getRecomended = () => {
    const request = {
      url: GET_ITEM_RECOMMENDED_URL(page, id),
      method: 'get',
    };

    axios(request)
      .then(({ data }) => {
        if (data.success) {
          setItems(data.data);
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getRecomended();
  }, []);

  useEffect(() => {
    getRecomended();
  }, [id]);


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

export default ItemsRecommended;
