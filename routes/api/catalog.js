const express = require('express')
const router = express.Router();
const axios = require('axios');

const lib = require('../../config/lib');

const GAME_API_URL = 'https://rawg.io/api/games';

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = 'f173a387483cd86fc18ab172d5d822ae';

const { normalizeData, normalizeDataFull } = lib;

/**
 * Request params for TV and Movie items list
 * 
 * @param {*} query 
 * @param {*} type 
 */
const catalogRequest = (query, type) => ({
  url: `${MOVIE_API_URL}/discover/${type}`,
  method: 'get',
  params: {
    api_key: MOVIE_API_KEY,
    ...query,
  }
});

/**
 * Request params for TV and Movie single item info
 * 
 * @param {*} id 
 * @param {*} type 
 */
const fullItemRequest = (id, type) => ({
  url: `${MOVIE_API_URL}/${type}/${id}`,
  method: 'get',
  params: {
    api_key: MOVIE_API_KEY,
    language: 'ru',
    append_to_response: 'videos'
  }
});

/**
 * Request params for TV and Movie recommendation list
 * 
 * @param {*} id 
 * @param {*} type 
 */
const recommendationRequest = (id, type) => ({
  url: `${MOVIE_API_URL}/${type}/${id}/recommendations`,
  method: 'get',
  params: {
    api_key: MOVIE_API_KEY,
    language: 'ru',
    page: 1,
  }
});

/*
 * MOVIES
 */
router.get('/movies', (req, res) => {
  const { query } = req;

  axios(catalogRequest(query, 'movie'))
    .then(({ data }) => {
      const { results, page, total_pages, total_results } = data;

      return res.send({
        success: true,
        page,
        total_results,
        total_pages,
        results: normalizeData(results),
      })
    })
    .catch(err => {
      return res.send({
        success: false,
        err,
      })
    })
})

router.get('/movies/:id', (req, res) => {
  const { params: { id } } = req;

  axios(fullItemRequest(id, 'movie'))
    .then(({ data }) => {
      return res.send({
        success: true,
        data: normalizeDataFull(data),
      })
    })
})

router.get('/movies/:id/recommended', (req, res) => {
  const { params: { id } } = req;

  axios(recommendationRequest(id, 'movie'))
    .then(({ data }) => {
      return res.send({
        success: true,
        data: normalizeData(data.results),
      })
    })
    .catch(err => {
      return res.send({
        success: false,
        err,
      })
    })
})

/*
 * TV
 */
router.get('/tv', (req, res) => {
  const { query } = req;

  axios(catalogRequest(query, 'tv'))
    .then(({ data }) => {
      const { results, page, total_pages, total_results } = data;

      return res.send({
        success: true,
        page,
        total_results,
        total_pages,
        results: normalizeData(results),
      })
    })
    .catch(err => {
      return res.send({
        success: false,
        err,
      })
    })
})

router.get('/tv/:id', (req, res) => {
  const { params: { id } } = req;

  axios(fullItemRequest(id, 'tv'))
    .then(({ data }) => {
      return res.send({
        success: true,
        data: normalizeDataFull(data),
      })
    })
})

router.get('/tv/:id/recommended', (req, res) => {
  const { params: { id } } = req;

  axios(recommendationRequest(id, 'tv'))
    .then(({ data }) => {
      return res.send({
        success: true,
        data: normalizeData(data.results),
      })
    })
    .catch(err => {
      return res.send({
        success: false,
        err,
      })
    })
})

/*
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
        success: true,
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
        success: true,
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
        success: true,
        data: normalizeData(data.results),
      })
    })
    .catch(err => {
      return res.send({
        success: false,
        err,
      })
    })
})

module.exports = router;
