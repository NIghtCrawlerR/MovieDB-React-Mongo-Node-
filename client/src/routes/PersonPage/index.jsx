import React, { Component } from 'react';
import ItemsList from 'components/ItemsList'
import Head from 'components/common/Head'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from 'axios'

const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY

class PersonPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {},
      credits: [],
      loadingCredits: false
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
    this.setState({ loadingCredits: true })
    const { params } = this.props.match
    const page = params.page === 'movies' ? 'movie' : 'tv'
    axios(`https://api.themoviedb.org/3/person/${id}/${page}_credits?api_key=${apiKey}&language=en-US`)
      .then(res => {
        this.setState({
          credits: res.data[params.role],
          loadingCredits: false
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    const { match } = this.props
    this.getPersonInfo(match.params.id)
    this.getCredits(match.params.id)
  }

  render() {
    const { match } = this.props
    const {
      person: {
        name,
        biography,
        birthday,
        deathday,
        place_of_birth,
        profile_path,
      },
      credits
    } = this.state

    const { page } = match.params
    const baseImage = 'http://image.tmdb.org/t/p/w780/'
    return (
      <div className="my-5">
        <Head title={`Fiction finder - search`} />

        <div className="container-fluid">
          <Row style={{ padding: "0 15px" }}>
            <Col xs={3}>
              <img src={baseImage + profile_path} alt="" />
            </Col>
            <Col xs={9}>
              <h3>{name}</h3>
              <p>place_of_birth: {place_of_birth}</p>
              <p>birthday: {new Date(birthday).toLocaleDateString()}</p>
              {deathday ?
                <p> deathday : {new Date(deathday).toLocaleDateString()}</p>
                : null}
              <p>{biography}</p>
            </Col>
          </Row>
          <ItemsList loading={this.state.loadingCredits} items={credits} type={page} />
        </div>
      </div>
    )
  }
}

export default PersonPage;
