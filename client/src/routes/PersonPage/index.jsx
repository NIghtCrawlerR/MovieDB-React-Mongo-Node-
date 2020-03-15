import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import ItemsList from 'components/ItemsList'
import Head from 'components/Head'
import Image from 'components/Image'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

  changePage(page) {
    this.props.history.push({
      search: `?page=${page.selected + 1}`
    })
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
    this.getPersonInfo(id)
    this.getCredits(id)
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
      <div className="my-5">
        <Head title={`Fiction finder - search`} />

        <div className="container-fluid">
          <Row style={{ padding: "0 15px" }}>
            <Col xs={3}>
              <Image path={profile_path} size={780} />
            </Col>

            <Col xs={9}>
              <h3>{name}</h3>
              <p>Place of birth: {place_of_birth}</p>
              <p>Birthday: {new Date(birthday).toLocaleDateString()}</p>
              {deathday ?
                <p> Deathday : {new Date(deathday).toLocaleDateString()}</p>
                : null}
              <p>{biography}</p>
            </Col>
          </Row>

          <ItemsList loading={loading} items={credits} type={page} />
        </div>
      </div>
    )
  }
}

export default withRouter(PersonPage);
