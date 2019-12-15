import React from 'react';
import BrickTabs from '../../common/BrickTabs';
import Head from '../../common/Head';
import PageHeader from '../../common/PageHeader';
import {
  catalogTabs,
} from '../../../utils/tabs';

export default function Homepage() {
  return (
    <div className="mb-5">
      <Head title="Fiction finder - Collections" />
      <PageHeader
        title="Discover your favourite movies, tv shows and games"
        text="All in one place. Online library with more than 100 000 items. Find here everything you want."
      />
      <div className="container-fluid mt-5">
        <BrickTabs path="/collections" main tabs={catalogTabs} />
      </div>
    </div>
  );
}
