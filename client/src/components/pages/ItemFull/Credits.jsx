import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import InfoBlock from './InfoBlock';

const BASE_URL = process.env.REACT_APP_MOVIE_DB_URL;
const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

class Credits extends React.Component {
  constructor() {
    super();

    this.state = {
      cast: [],
      directing: [],
      production: [],
      writing: [],
    };
  }

  componentDidMount() {
    const { id, category } = this.props;

    this.getCredits(id, category);
  }

  getCredits(id, category) {
    const cat = category === 'movies' ? 'movie' : category;

    axios.get(`${BASE_URL}/${cat}/${id}/credits?api_key=${API_KEY}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          cast: data.cast.filter((cast) => cast.order < 10),
          directing: data.crew.filter((member) => member.job === 'Director'),
          production: data.crew.filter((member) => member.job === 'Producer'),
          writing: data.crew.filter((member) => member.department === 'Writing'),
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const castListFromArray = (array, category) => {
      return array.map((member) => (
        <Link key={member.id} to={`/search/${category}/cast/${member.id}`}>{member.name}</Link>))
        .reduce((prev, curr) => [prev, ', ', curr]);
    };

    const { cast, directing, production, writing } = this.state;
    const { category } = this.props;

    return (
      <div>
        {cast.length > 0 && <InfoBlock title="В ролях:" data={castListFromArray(cast, category)} />}
        {directing.length > 0 && <InfoBlock title="Режиссер:" data={castListFromArray(directing, category)} />}
        {production.length > 0 && <InfoBlock title="Продюсеры:" data={castListFromArray(production, category)} />}
        {writing.length > 0 && <InfoBlock title="Сценарий:" data={castListFromArray(writing, category)} />}
      </div>
    );
  }
}

export default Credits;
