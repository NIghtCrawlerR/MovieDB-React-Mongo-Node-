import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Icon from '../Icon';
import { If } from '../../helpers/conditional-statement';

import './index.scss';

const VISIBLE_ITEMS_COUNT = 5;

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
              className={loading ? 'loading' : null}
            >
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
