import React from 'react';
import { Link } from 'react-router-dom';

import Tabs from 'components/common/Tabs';
import SearchItem from './SearchItem';

class SearchResults extends React.Component {
  state = {
    tabSelected: "movies",
  }

  switchTabs = (tabSelected) => {
    this.setState({
      tabSelected,
    });
  }

  render() {
    const { tabSelected } = this.state;
    const { data } = this.props;

    const releaseData = (date) => {
      return `(${new Date(date).getFullYear()})` || null;
    }

    const tabs = Object.keys(data).map(key => ({ title: key, value: key }));

    if (!tabs.length) return "Start search"

    return (
      <div className="search-results">
        <Tabs
          tabs={tabs}
          active={tabSelected}
          onSelect={this.switchTabs}
        />
        <div className="search-results__wrap">
          <h3 className="search-results__header">{tabSelected}</h3>
          <div className="search-results__list">
            {data[tabSelected] &&
              data[tabSelected].map((item) => {
                return (
                  <SearchItem
                    key={item.id}
                    category={tabSelected}
                    item={item}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
