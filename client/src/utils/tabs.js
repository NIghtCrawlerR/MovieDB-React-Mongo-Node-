import bg1 from '../assets/tab-1.png'
import bg2 from '../assets/tab-2.jpg'
import bg3 from '../assets/tab-3.jpg'

export const catalogTabs = [
    {
        title: 'All movies',
        value: 'movies',
        link: 'movies',
        exact: 'true',
        img: bg1
    }, {
        title: 'All TV shows',
        value: 'tv',
        link: 'tv',
        img: bg2
    }, {
        title: 'All Games',
        value: 'games',
        link: 'games',
        img: bg3
    },
]

export const moviesCollectionsTabs = [
    { title: 'Top rated movies', value: 'top_rated', link: 'top_rated' },
    { title: 'Popular movies', value: 'popular', link: 'popular' },
    { title: 'Upcoming movies', value: 'upcoming', link: 'upcoming' }
]

export const tvCollectionsTabs = [
    { title: 'Top rated TV shows', value: 'top_rated', link: 'top_rated' },
    { title: 'Popular TV shows', value: 'popular', link: 'popular' }
]

export const gamesCollectionsTabs = [
    { title: 'Must play', value: 'must-play', link: 'must-play' },
    { title: 'Top games of 2017', value: 'top-games-of-2017', link: 'top-games-of-2017' },
    { title: 'Epic games', value: 'epic-games-6', link: 'epic-games-6' },
]