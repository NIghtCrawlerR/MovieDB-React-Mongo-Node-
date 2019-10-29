import React from 'react';
import { NavLink } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import bg1 from '../../assets/tab-1.png'
import bg2 from '../../assets/tab-2.jpg'
import bg3 from '../../assets/tab-3.jpg'
import bg4 from '../../assets/tab-4.jpg'

import './index.css'

export default class BrickButtons extends React.Component {
    constructor() {
        super()
        this.state = {
            tabs: [
                {
                    title: 'Movies',
                    value: 'movies',
                    link: 'top-movies',
                    exact: 'true',
                    img: bg1
                }, {
                    title: 'TV shows',
                    value: 'tv',
                    link: 'top-tv-shows',
                    img: bg2
                }, {
                    title: 'Games',
                    value: 'games',
                    link: 'top-games',
                    img: bg3
                }, {
                    title: 'Books',
                    value: 'books',
                    link: 'top-books',
                    img: bg4
                }
            ],
            tabItems: ['movies', 'tv', 'games', 'books']
        }
    }

    render() {
        return (
            <div className="tabs">
                <Row>
                    {this.state.tabs.map((tab, i) => {
                        return (
                            <Col key={i}>
                                <NavLink activeClassName="active" className="nav-link" to={`/home/${tab.link}`}>
                                    <Card text="white">
                                        <img src={tab.img} alt="" />
                                        <Card.Body>
                                            <Card.Title className="title">{tab.title}</Card.Title>
                                            <Card.Text className="text">{tab.text}</Card.Text>

                                        </Card.Body>
                                    </Card>
                                </NavLink>
                            </Col>
                        )
                    })}
                </Row>
                {this.props.render ? this.props.render(this.state.activeTab) : null}
            </div>
        )
    }
}