import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import ItemsList from 'components/ItemsList'
import Head from 'components/Head'
import Image from 'components/Image'

import './index.scss';

const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY

class PersonPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {},
      credits: [],
      loading: false
    }
  }

  getPersonInfo(id) {
    axios(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=ru`)
      .then(res => {
        this.setState({ person: res.data })
      })
      .catch(err => console.log(err))
  }

  getCredits(id) {
    this.setState({ loading: true })
    const { match: { params } } = this.props;
    const page = params.page === 'movies' ? 'movie' : 'tv'
    axios(`https://api.themoviedb.org/3/person/${id}/${page}_credits?api_key=${apiKey}&language=en-US`)
      .then(res => {
        this.setState({
          credits: res.data[params.role],
          loading: false
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props

    // Get info about actor
    this.getPersonInfo(id);

    //Get list of movies
    this.getCredits(id);
  }

  render() {
    const { match: { params: { page } } } = this.props;

    const {
      person: {
        name,
        biography,
        birthday,
        deathday,
        place_of_birth,
        profile_path,
      },
      credits,
      loading,
    } = this.state;

    return (
      <div className="person-page">
        <Head title={`Fiction finder - search`} />

        <div className="container-fluid">
          <div className="person-page__wrap">
            <div className="person-page__image-wrap">
              <Image path={profile_path} size={780} />
            </div>

            <div className="person-page__info">
              <h3>{name}</h3>
              <p>Place of birth: {place_of_birth}</p>
              <p>Birthday: {new Date(birthday).toLocaleDateString()}</p>
              {deathday ?
                <p> Deathday : {new Date(deathday).toLocaleDateString()}</p>
                : null}
              <p>{biography}</p>
            </div>
          </div>

          <ItemsList loading={loading} items={credits} type={page} />
        </div>
      </div>
    )
  }
}

export default withRouter(PersonPage);
