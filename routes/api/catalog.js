const express = require('express')
const router = express.Router();
const axios = require('axios');

const GAME_API_URL = 'https://rawg.io/api/games';

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = 'f173a387483cd86fc18ab172d5d822ae';

// const convertGameRating = (rate) => {
//   const percent = (rate / 5) * 100;
//   const valFromPrecent = (percent * 10) / 100;
//   return +valFromPrecent.toFixed(1);
// };

const normalizeData = results => {
  return results.map(({
    id, title, name, slug,
    genre_ids, genres, poster_path, background_image,
    vote_average, rating,
  }) => ({
    id,
    slug: slug || id,
    title: title || name,
    genres: genre_ids || genres,
    poster: poster_path || background_image,
    rating: rating || vote_average,
  }))
}

const normalizeDataFull = data => {
  const { id, poster_path, background_image, backdrop_path,
    genres, name, title, original_title, original_name, overview, description,
    vote_average, rating, platforms, website,
    released, release_date, developers, publishers,
    stores, production_companies, production_countries,
    homepage, number_of_seasons, number_of_episodes,
    runtime, playtime, first_air_date, videos,
    next_episode_to_air } = data;

  return {
    id,
    title: title || name,
    poster: poster_path || background_image,
    backdrop_path: backdrop_path || background_image,
    original_title: original_title || original_name,
    overview: overview || description,
    rating: rating || vote_average,
    genres,
    website: website || homepage,
    release_date: release_date || released || first_air_date,
    platforms,
    stores,
    publishers,
    developers,
    production_companies,
    production_countries,
    number_of_seasons,
    number_of_episodes,
    next_episode_to_air,
    runtime,
    playtime,
    videos,
  }
}

/**
 * MOVIES
 */
router.get('/movies', (req, res) => {
  const { query } = req;

  const request = {
    url: `${MOVIE_API_URL}/discover/movie`,
    method: 'get',
    params: {
      api_key: MOVIE_API_KEY,
      ...query,
    }
  }

  axios(request)
    .then(({ data }) => {
      const { results, page, total_pages, total_results } = data;

      return res.send({
        succes: true,
        data: {
          page,
          total_results,
          total_pages,
          results: normalizeData(results),
        },
      })
    })
    .catch(err => {
      return res.send({
        succes: false,
        err,
      })
    })
})

router.get('/movies/:id', (req, res) => {
  const { params: { id } } = req;

  const request = {
    url: `${MOVIE_API_URL}/movie/${id}`,
    method: 'get',
    params: {
      api_key: MOVIE_API_KEY,
      language: 'ru',
      append_to_response: 'videos'
    }
  }

  axios(request)
    .then(({ data }) => {
      return res.send({
        succes: true,
        data: normalizeDataFull(data),
      })
    })
})

router.get('/movies/:id/recommended', (req, res) => {
  const { params: { id } } = req;

  const request = {
    url: `${MOVIE_API_URL}/movie/${id}/recommendations`,
    method: 'get',
    params: {
      api_key: MOVIE_API_KEY,
      language: 'ru',
      page: 1,
    }
  }

  axios(request)
    .then(({ data }) => {
      return res.send({
        succes: true,
        data: normalizeData(data.results),
      })
    })
    .catch(err => {
      return res.send({
        succes: false,
        err,
      })
    })
})

/**
 * TV
 */
router.get('/tv', (req, res) => {
  const { query } = req;

  const request = {
    url: `${MOVIE_API_URL}/discover/tv`,
    method: 'get',
    params: {
      api_key: MOVIE_API_KEY,
      ...query,
    }
  }

  axios(request)
    .then(({ data }) => {
      const { results, page, total_pages, total_results } = data;

      return res.send({
        succes: true,
        data: {
          page,
          total_results,
          total_pages,
          results: normalizeData(results),
        },
      })
    })
    .catch(err => {
      return res.send({
        succes: false,
        err,
      })
    })
})

router.get('/tv/:id', (req, res) => {
  const { params: { id } } = req;

  const request = {
    url: `${MOVIE_API_URL}/tv/${id}`,
    method: 'get',
    params: {
      api_key: MOVIE_API_KEY,
      language: 'ru',
      append_to_response: 'videos'
    }
  }

  axios(request)
    .then(({ data }) => {
      return res.send({
        succes: true,
        data: normalizeDataFull(data),
      })
    })
})

router.get('/tv/:id/recommended', (req, res) => {
  const { params: { id } } = req;

  const request = {
    url: `${MOVIE_API_URL}/tv/${id}/recommendations`,
    method: 'get',
    params: {
      api_key: MOVIE_API_KEY,
      language: 'ru',
      page: 1,
    }
  }

  axios(request)
    .then(({ data }) => {

      return res.send({
        succes: true,
        data: normalizeData(data.results),
      })
    })
    .catch(err => {
      return res.send({
        succes: false,
        err,
      })
    })
})

/**
 * GAMES
 */
router.get('/games', (req, res) => {
  const { query } = req;

  const request = {
    url: GAME_API_URL,
    method: 'get',
    params: {
      ...query,
    }
  }

  axios(request)
    .then(({ data }) => {
      const { count, next, previous, results } = data;

      return res.send({
        succes: true,
        data: {
          count,
          next,
          previous,
          results: normalizeData(results),
        },
      })
    })
})

router.get('/games/:id', (req, res) => {
  const { params: { id } } = req;

  const request = {
    url: `${GAME_API_URL}/${id}`,
    method: 'get',
  }

  axios(request)
    .then(({ data }) => {
      return res.send({
        succes: true,
        data: normalizeDataFull(data),
      })
    })
})

router.get('/games/:id/recommended', (req, res) => {
  const { params: { id } } = req;

  const request = {
    url: `${GAME_API_URL}/${id}/suggested`,
    method: 'get',
  }

  axios(request)
    .then(({ data }) => {
      return res.send({
        succes: true,
        data: normalizeData(data.results),
      })
    })
    .catch(err => {
      return res.send({
        succes: false,
        err,
      })
    })
})

module.exports = router;