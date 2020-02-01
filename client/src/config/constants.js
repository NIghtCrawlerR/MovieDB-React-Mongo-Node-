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
