import React from 'react';

import BrickTabs from 'components/BrickTabs';
import SliderTabs from 'components/SliderTabs';
import Head from 'components/Head';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import { catalogTabs } from 'utils/tabs';

import './index.scss';

class Homepage extends React.Component {
  createTabs = (category) => {
    const { collections } = this.props;

    const tabs = collections.filter(collection => collection.category === category).map(collection => {
      const { title, alias, image } = collection;
      return {
        title,
        value: alias,
        link: `collection/${category}/${alias}`,
        image,
      }
    })

    return [...tabs]
  }

  render() {
    return (
      <div className="homapage">
        <Head title="Fiction finder - Collections" />
        <PageHeader
          title="Discover your favourite movies, tv shows and games"
          text="All in one place. Online library with more than 100 000 items. Find here everything you want."
        />
        <div className="container-fluid mt-5">
          <BrickTabs path="/collections" main tabs={catalogTabs} />

          <div className="homepage__collection-group">
            <PageTitle title="Movies collections" buttonBack={false} />
            <SliderTabs tabs={this.createTabs("movies")} />
          </div>
          <div className="homepage__collection-group">
            <PageTitle title="TV collections" buttonBack={false} />
            <SliderTabs tabs={this.createTabs("tv")} />
          </div>
          <div className="homepage__collection-group">
            <PageTitle title="Games collections" buttonBack={false} />
            <SliderTabs tabs={this.createTabs("games")} />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
