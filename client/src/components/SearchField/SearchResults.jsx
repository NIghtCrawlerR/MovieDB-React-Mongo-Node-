import React from 'react';
import { Link } from 'react-router-dom';

import Tabs from '../common/Tabs';

class SearchResults extends React.Component {
  state = {
    tabs: [
      { title: 'Movies', value: 'movies' },
      { title: 'TV', value: 'tv' },
      { title: 'Games', value: 'games' },
    ],
    tabSelected: "movies",
  }

  switchTabs = (tabSelected) => {
    this.setState({
      tabSelected,
    });
  }

  render() {
    const { tabs, tabSelected } = this.state;
    const { data } = this.props;

    const releaseData = (date) => {
      return `(${new Date(date).getFullYear()})` || null;
    }

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
                  <Link to={`/details/${tabSelected}/${item.slug || item.id}`} key={item.id}>
                    <div className="search-item">
                      <div className="search-item__image">
                        {item.poster_path
                          ? <img src={`http://image.tmdb.org/t/p/w300${item.poster_path}`} alt="" />
                          : <img src={item.background_image} alt="" />
                        }
                      </div>

                      <div className="search-item__body">
                        <h5>
                          {item.name || item.title}
                          {releaseData(item.released || item.release_date || item.first_air_date)}
                        </h5>
                        <p>{item.overview ? `${item.overview.slice(0, 100)}...` : null}</p>
                      </div>
                    </div>
                  </Link>
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
