import React from 'react';
import PropTypes from 'prop-types';

import BrickTabs from 'components/BrickTabs';
import SliderTabs from 'components/SliderTabs';
import Head from 'components/Head';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import { catalogTabs } from 'config/constants';

import './index.scss';

const Homepage = ({ collections }) => {
  const createTabs = (category) => collections
    .filter((collection) => collection.category === category)
    .map(({ title, alias, image }) => ({
      title,
      value: alias,
      link: `collection/${category}/${alias}`,
      image,
    }));

  const renderCollection = (collection) => {
    const tabs = createTabs(collection);

    if (!tabs.length) return null;

    return (
      <div className="homepage__collection-group">
        <PageTitle title="Movies collections" buttonBack={false} />
        <SliderTabs tabs={tabs} />
      </div>
    );
  };

  return (
    <div className="homapage">
      <Head title="Fiction finder - Collections" />
      <PageHeader
        title="Discover your favourite movies, tv shows and games"
        text="All in one place. Online library with more than 100 000 items. Find here everything you want."
      />
      <div className="container-fluid mt-5">
        <BrickTabs path="/collections" main tabs={catalogTabs} />

        {renderCollection('movies')}
        {renderCollection('tv')}
        {renderCollection('games')}
      </div>
    </div>
  );
};

Homepage.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.number),
    image: PropTypes.string,
    _id: PropTypes.string,
    title: PropTypes.string,
    alias: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

export default Homepage;
