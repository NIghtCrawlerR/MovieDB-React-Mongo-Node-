import React from 'react';
import { NavLink } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import bg1 from '../../assets/tab-1.png'
import bg2 from '../../assets/tab-2.jpg'
import bg3 from '../../assets/tab-3.jpg'
// import bg4 from '../../assets/tab-4.jpg'

import './index.css'

export default class BrickButtons extends React.Component {
    render() {
        const { main, render, path, tabs } = this.props
        return (
            <div className="tabs">
                <Row>
                    {tabs.map((tab, i) => {
                        return (
                            <Col key={i}>
                                <NavLink activeClassName="active" className="nav-link" to={`/${path}/${tab.link}`} >
                                    <Card className={main ? 'main' : ''} text="white">
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
                {render ? this.props.render(this.state.activeTab) : null}
            </div>
        )
    }
}