import React, { Component } from 'react';
import Movie from '../../Movie'
import PageTitle from '../../common/PageTitle'
import Loader from '../../common/Loader'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import { connect } from 'react-redux'
import {
    getMovies,
    getTV,
    getGames
} from '../../../actions/itemsCollectionsActions'

import './index.css'

class List extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     title: this.props.tabs[0].title,
        //     activeTab: this.props.tabs[0].value
        // }
    }

    onSelect(i) {
        const { collections, type } = this.props
        // if(Object.keys(collections[type]).length) {
        //     this.props.getMovies('top_rated')
        // }
        this.setState({
            title: this.props.tabs[i].title,
            activeTab: this.props.tabs[i].value
        }, (prev, next) => {
            if (!collections[type][this.state.activeTab]) {
                switch (type) {
                    case 'movies':
                        this.props.getMovies(this.state.activeTab)
                        break;
                    case 'tv':
                        this.props.getTV(this.state.activeTab)
                        break;
                    case 'games':
                        this.props.getGames(this.state.activeTab)
                        break;
                    default:
                        return;
                }

            }
        })
    }

    getItems(page, collection) {
        if (this.props.collections[page][collection] &&
            this.props.collections[page][collection].length > 0) return !1

        switch (page) {
            case 'movies':
                this.props.getMovies(collection)
                break;
            case 'tv':
                this.props.getTV(collection)
                break;
            case 'games':
                this.props.getGames(collection)
                break;
            default:
                return;
        }
    }

    componentDidUpdate(prevProps) {
        const { params } = this.props.match
        if (params.collection !== prevProps.match.params.collection ||
            params.page !== prevProps.match.params.page) {
            this.getItems(params.page, params.collection)
        }
    }

    componentDidMount() {
        const { params } = this.props.match
        this.getItems(params.page, params.collection)
    }

    render() {
        const { collections, match } = this.props
        const { page, collection } = match.params
        return (
            <div className="top-list mt-4">
                <React.Fragment>
                    <div className="movies_wrap">
                        {
                            collections[page][collection] ?
                                collections[page][collection].map((movie, i) => {
                                    return <Movie {...movie} type={page} img={movie.poster_path ? `http://image.tmdb.org/t/p/w300${movie.poster_path}` : movie.background_image} key={movie.id} _id={movie.id} />
                                })
                                :
                                null
                        }
                    </div>
                </React.Fragment>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    collections: state.movieSelection
})

export default connect(mapStateToProps, {
    getMovies,
    getTV,
    getGames
})(List)