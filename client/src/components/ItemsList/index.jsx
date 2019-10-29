import React, { Component } from 'react';
import Movie from '../Movie'
import PageTitle from '../common/PageTitle'
import Loader from '../common/Loader'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import { connect } from 'react-redux'
import {
    getMovies,
    getTV,
    getGames
} from '../../actions/itemsCollectionsActions'

import './index.css'

class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.tabs[0].title,
            activeTab: this.props.tabs[0].value
        }
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

    componentDidMount() {
        switch (this.props.type) {
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

    render() {
        const { collections, type } = this.props
        return (
            <div className="top-list mt-4">
                {Object.keys(collections[type]).length === 0 || !collections[type][this.state.activeTab] ?
                    <Loader /> :

                    <React.Fragment>
                        <Tab.Container defaultActiveKey="0">
                            <Nav onSelect={this.onSelect.bind(this)} className="tabs mb-5">
                                {
                                    this.props.tabs.map((tab, i) =>
                                        <Nav.Item key={i} className="tab-item">
                                            <Nav.Link eventKey={i}>
                                                {tab.title}
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                }
                            </Nav>
                            <PageTitle title={this.state.title} buttonBack={false} />
                            <Tab.Content>
                                {
                                    Object.keys(collections[type]).map((key, i) =>
                                        <Tab.Pane key={i} eventKey={i}>
                                            <div className="movies_wrap">
                                                {
                                                    collections[type][key].map((movie, i) => {
                                                        return <Movie {...movie} type={type} img={movie.poster_path ? `http://image.tmdb.org/t/p/w300${movie.poster_path}` : movie.background_image} key={movie.id} _id={movie.id} />
                                                    })
                                                }
                                            </div>

                                        </Tab.Pane>
                                    )
                                }
                            </Tab.Content>
                        </Tab.Container>
                    </React.Fragment>
                }
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
})(ItemsList)