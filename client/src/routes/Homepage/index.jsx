import React from 'react';

import BrickTabs from 'components/BrickTabs';
import SliderTabs from 'components/SliderTabs';
import Head from 'components/Head';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import { catalogTabs } from 'config/constants';

import { If } from 'components/helpers/ConditionalRender';

import './index.scss';

class Homepage extends React.Component {
  createTabs = (category) => {
    const { collections } = this.props;

    return collections.filter(collection => collection.category === category).map(collection => {
      const { title, alias, image } = collection;
      return {
        title,
        value: alias,
        link: `collection/${category}/${alias}`,
        image,
      }
    })
  }

  render() {
    const movies = this.createTabs("movies");
    const tv = this.createTabs("tv");
    const games = this.createTabs("games");

    return (
      <div className="homapage">
        <Head title="Fiction finder - Collections" />
        <PageHeader
          title="Discover your favourite movies, tv shows and games"
          text="All in one place. Online library with more than 100 000 items. Find here everything you want."
        />
        <div className="container-fluid mt-5">
          <BrickTabs path="/collections" main tabs={catalogTabs} />

          <If condition={!!movies.length}>
            <div className="homepage__collection-group">
              <PageTitle title="Movies collections" buttonBack={false} />
              <SliderTabs tabs={this.createTabs("movies")} />
            </div>
          </If>

          <If condition={!!tv.length}>
            <div className="homepage__collection-group">
              <PageTitle title="TV collections" buttonBack={false} />
              <SliderTabs tabs={this.createTabs("tv")} />
            </div>
          </If>

          <If condition={!!games.length}>
            <div className="homepage__collection-group">
              <PageTitle title="Games collections" buttonBack={false} />
              <SliderTabs tabs={this.createTabs("games")} />
            </div>
          </If>
        </div>
      </div>
    );
  }
}

export default Homepage;
