
const convertGameRating = rate => {
  const percent = (rate / 5) * 100;
  const valFromPrecent = (percent * 10) / 100;
  return +valFromPrecent.toFixed(1);
};

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
    rating: convertGameRating(rating) || vote_average,
  }))
};

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
    rating: convertGameRating(rating) || vote_average,
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
};

module.exports = {
  normalizeData,
  normalizeDataFull,
}
