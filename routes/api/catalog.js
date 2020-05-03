const express = require('express')
const router = express.Router();
const axios = require('axios');

const lib = require('../../config/lib');

const GAME_API_URL = 'https://rawg.io/api/games';

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = 'f173a387483cd86fc18ab172d5d822ae';

const { normalizeData, normalizeDataFull } = lib;

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
        page,
        total_results,
        total_pages,
        results: normalizeData(results),
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
        page,
        total_results,
        total_pages,
        results: normalizeData(results),
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
        count,
        next,
        previous,
        results: normalizeData(results),
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
