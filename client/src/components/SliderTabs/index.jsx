import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { Icon } from 'components/UI';
import { If } from 'components/helpers/ConditionalRender';

import './index.scss';

const SCREEN_WIDTH = document.documentElement.clientWidth;
const SLIDE_WIDTH = 260;
const VISIBLE_ITEMS_COUNT = Math.floor(SCREEN_WIDTH / SLIDE_WIDTH);

function SliderTabs(props) {
  const {
    path,
    tabs,
    loading,
  } = props;

  return (
    <div className="slider-tabs">
      <CarouselProvider
        naturalSlideWidth={30}
        naturalSlideHeight={125}
        totalSlides={tabs.length}
        visibleSlides={VISIBLE_ITEMS_COUNT}
        dragEnabled={false}
      >
        <If condition={tabs.length > VISIBLE_ITEMS_COUNT}>
          <ButtonBack>
            <Icon name="chevron-left" />
          </ButtonBack>
        </If>

        <Slider>
          {tabs.map((tab, i) => (
            <Slide
              index={1}
              key={i}
              className={loading ? 'loading' : null}
            >
              <img src={tab.image} className="slider-item__image" alt="" />
              <NavLink
                key={tab.value}
                activeClassName="active"
                className="slider-item__link"
                to={`${path}/${tab.link}`}
              >
                <If condition={!loading}>
                  {tab.title}
                </If>
              </NavLink>
            </Slide>
          ))}

        </Slider>
        <If condition={tabs.length > VISIBLE_ITEMS_COUNT}>
          <ButtonNext>
            <Icon name="chevron-right" />
          </ButtonNext>
        </If>
      </CarouselProvider>

    </div>
  );
}

SliderTabs.propTypes = {
  path: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

SliderTabs.defaultProps = {
  path: '',
};

export default SliderTabs;
