import React from 'react';

import { Link } from 'react-router-dom';
import Media from 'react-bootstrap/Media';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function SearchResults(props) {
  const { data, onClick } = props;
  return (
    Object.keys(data).length > 0
      ? (
        <div className="search-results__wrap">
          <div className="search-results">
            <Tabs defaultActiveKey={Object.keys(data)[0]}>
              {Object.keys(data).map((key, i) => (
                <Tab eventKey={key} key={i} title={key}>
                  <h3 className="text-uppercase my-3">{key}</h3>
                  <ul className="list-unstyled">
                    {
                      data[key].map((item) => {
                        return (
                          <Link to={`/details/${key}/${item.slug || item.id}`} onClick={onClick} key={item.id}>
                            <Media as="li" className="search-item" >
                              <div className="search-item__image">
                                {item.poster_path
                                  ? <img src={`http://image.tmdb.org/t/p/w300${item.poster_path}`} alt="" />
                                  : <img src={item.background_image} alt="" />
                                }
                              </div>

                              <Media.Body>
                                <h5>
                                  {item.name || item.title}
                                  {item.released || item.release_date || item.first_air_date
                                    ? `(${new Date(item.released || item.release_date || item.first_air_date).getFullYear()})` : null}
                                </h5>
                                <p>{item.overview ? `${item.overview.slice(0, 100)}...` : null}</p>
                              </Media.Body>
                            </Media>
                          </Link>
                        );
                      })
                    }
                  </ul>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      ) : null
  );
}

export default SearchResults;
