import React, { Component } from 'react';
import Movie from '../Movie'
import PageTitle from '../common/PageTitle'

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import './index.css'

export default class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.tabs[0]
        }
    }

    onSelect(i) {
        this.setState({
            title: this.props.tabs[i]
        })
    }

    render() {
        const { items } = this.props
        return (
            <div className="top-list mt-4">
                {Object.keys(items).length === 0 ?
                    'loading...' :

                    <React.Fragment>
                        <Tab.Container defaultActiveKey="0">
                            <Nav onSelect={this.onSelect.bind(this)} className="tabs mb-5">
                                {
                                    this.props.tabs.map((tab, i) =>
                                        <Nav.Item key={i} className="tab-item">
                                            <Nav.Link eventKey={i}>
                                                {tab}
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                }
                            </Nav>
                            <PageTitle title={this.state.title} buttonBack={false} />
                            <Tab.Content>
                                {
                                    Object.keys(items).map((key, i) =>
                                        <Tab.Pane key={i} eventKey={i}>
                                            <div className="movies_wrap">
                                                {
                                                    items[key].map((movie, i) => {
                                                        return <Movie {...movie} slider img={movie.poster_path ? `http://image.tmdb.org/t/p/w300${movie.poster_path}` : movie.background_image} key={movie.id} _id={movie.id} />
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