export const MOVIE_API_BASEURL = process.env.REACT_APP_MOVIE_DB_URL;
export const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

export const GAME_API_BASEURL = 'https://rawg.io/api/games';

const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';


/***
 * COLLECTION ENDPOINTS
*/
export const FETCH_COLLECTIONS_URL = `${HOST}/api/collection/get`;
export const ADD_TO_COLLECTION_URL = `${HOST}/api/collection/add`;
export const REMOVE_FROM_COLLECTION_URL = `${HOST}/api/collection/remove`;
export const FECTH_COLLECTION_BY_CATEGORY_URL = (category) => `${HOST}/api/collection/get/${category}`;
export const CREATE_COLLECTION_URL = (userId) => `${HOST}/api/collection/create?userId=${userId}`;
export const UPDATE_COLLECTION_URL = (alias) => `${HOST}/api/collection/update/${alias}`;
export const DELETE_COLLECTION_URL = (id) => `${HOST}/api/collection/delete/${id}`;

/***
 * USER ACTIONS ENDPOINTS
 */
export const LOGIN_URL = `${HOST}/api/users/login`;
export const SIGN_IN_URL = `${HOST}/api/users/register`;
export const LOGOUT_URL = (token) => `${HOST}/api/users/logout?token=${token}`;
export const VERIFY_URL = (token) => `${HOST}/api/users/verify?token=${token}`;
export const FETCH_CURRENT_USER_URL = (userId) => `${HOST}/api/users/current?userId=${userId}`;

/***
 * WISHLIST ENDPOINTS
 */
export const FETCH_WISHLIST_URL = `${HOST}/api/wishlist/get`;
export const ADD_TO_WISHLIST_URL = `${HOST}/api/wishlist/add`;
export const DELETE_FROM_WISHLIST_URL = `${HOST}/api/wishlist/delete`;
export const UPDATE_WISHLIST_URL = `${HOST}/api/wishlist/update`;

/***
 * POSTER URL
 */

 // available width: 300, 780, 1280, original
export const MOVIE_POSTER_BASEURL = (width = 300) => `http://image.tmdb.org/t/p/w${width}`;

/**
 * NAVIGATION
 */
export const NAVIGATION = [
  {
    id: '01',
    name: 'Home',
    icon: 'fas fa-home',
    link: '/home',
  }, {
    id: '02',
    name: 'Movies catalog',
    icon: 'fas fa-film',
    link: '/collections/movies',
  }, {
    id: '03',
    name: 'TV Series catalog',
    icon: 'fas fa-tv',
    link: '/collections/tv',
  }, {
    id: '04',
    name: 'Games catalog',
    icon: 'fas fa-gamepad',
    link: '/collections/games',
  },
  {
    id: '05',
    name: 'Wishlist',
    icon: 'fas fa-heart',
    link: '/wishlist',
    requireAuth: true,
  }, {
    id: '06',
    name: 'Bug report',
    icon: 'fas fa-bug',
    link: '/bug-report',
  },
];
