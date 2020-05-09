import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import { WISHLIST_TABS } from 'config/constants';
import PageHeader from 'components/PageHeader';
import { Tabs } from 'components/UI';
import Items from './components/Items';
import Filter from './components/Filter';

import './index.scss';

const Wishlist = ({ history: { location: { pathname } } }) => {
  const [filterParams, setFilter] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  if (pathname === '/wishlist') {
    return <Redirect to="/wishlist/movies" />;
  }
  return (
    <div>
      <PageHeader title="Personal wishlist" />
      <div className="wishlist container-fluid">
        <Tabs path="/wishlist" tabs={WISHLIST_TABS} link />

        <Filter
          applyFilter={setFilter}
          setSearchQuery={setSearchQuery}
        />
        <Route path="/wishlist/:collection" render={(props) => (
          <Items filterParams={filterParams} searchQuery={searchQuery} />
        )} />
      </div>
    </div>
  );
}

export default withRouter(Wishlist);
