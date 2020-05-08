import React, { useState, useEffect } from 'react';
import { get } from 'lodash';

import { Tabs } from 'components/UI';
import SearchItem from './SearchItem';

const SearchResults = ({ data }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const newTabs = Object.keys(data).map((key) => ({ title: key, value: key }));

    setTabs(newTabs);
    setActiveTab(get(newTabs, '0.value', null));
  }, [data]);

  if (!tabs.length) return 'Start search';

  return (
    <div className="search-results">
      <Tabs tabs={tabs} onSwitch={(value) => setActiveTab(value)} />

      <div className="search-results__wrap">
        <h3 className="search-results__header">{activeTab}</h3>
        <div className="search-results__list">
          {data[activeTab]
            && data[activeTab].map((item) => (
              <SearchItem
                key={item.id}
                category={activeTab}
                item={item}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
