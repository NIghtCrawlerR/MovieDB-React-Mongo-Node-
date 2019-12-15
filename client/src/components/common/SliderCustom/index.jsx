import React, { Component } from 'react';
import Slider from 'react-slick';
import Icon from '../Icon';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './index.css';

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="items-slider__arrow prev" onClick={onClick}>
      <Icon name="chevron-left" />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="items-slider__arrow next" onClick={onClick}>
      <Icon name="chevron-right" />
    </div>
  );
}

class SliderCustom extends Component {
  render() {
    const { children } = this.props;

    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      centerPadding: '100px',
      slidesToShow: 6,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 860,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    };

    return (
      <Slider {...settings}>
        {children}
      </Slider>
    );
  }
}

export default SliderCustom;
