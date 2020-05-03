import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import { Image } from 'components/UI';
import InfoBlock from './InfoBlock';

const BASE_URL = process.env.REACT_APP_MOVIE_DB_URL;
const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

const ProfileImage = ({ name, category, id, profile_path }) => (
  <OverlayTrigger
    placement="bottom"
    overlay={
      <Tooltip>
        {name}
      </Tooltip>
    }
  >
    <Link to={`/search/${category}/cast/${id}`} className="cast-profile-link">
      <Image path={profile_path} />
    </Link>
  </OverlayTrigger>
)

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
        <ProfileImage
          key={member.id}
          name={member.name}
          id={member.id}
          profile_path={member.profile_path}
          category={category}
        />
      ));
    };

    const { cast, directing, production, writing } = this.state;
    const { category } = this.props;

    return (
      <div>
        {/* Cast */}
        {cast.length > 0 && <InfoBlock className="cast-wrap" title="В ролях:" data={castListFromArray(cast, category)} />}

        {/* Directing */}
        {directing.length > 0 && <InfoBlock className="cast-wrap" title="Режиссер:" data={castListFromArray(directing, category)} />}

        {/* Production */}
        {production.length > 0 && <InfoBlock className="cast-wrap" title="Продюсеры:" data={castListFromArray(production, category)} />}

        {/* Writing */}
        {writing.length > 0 && <InfoBlock className="cast-wrap" title="Сценарий:" data={castListFromArray(writing, category)} />}
      </div>
    );
  }
}

export default Credits;
