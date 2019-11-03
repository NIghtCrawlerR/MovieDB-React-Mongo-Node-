import React from 'react';
import { NavLink } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navigation: [
                {
                    name: 'Home',
                    icon: 'fas fa-home',
                    link: '/home'
                }, {
                    name: 'Movies catalog',
                    icon: 'fas fa-film',
                    link: '/catalog/movies'
                }, {
                    name: 'TV Series catalog',
                    icon: 'fas fa-tv',
                    link: '/catalog/tv'
                }, {
                    name: 'Games catalog',
                    icon: 'fas fa-gamepad',
                    link: '/catalog/games'
                }, 
                // {
                //     name: 'Books catalog',
                //     icon: 'fas fa-book-open',
                //     link: '/catalog/books'
                // }, 
                {
                    name: 'Bug report',
                    icon: 'fas fa-bug',
                    link: '/bug-report'
                }
            ]
        }
    }
    render() {
        return (
            <div className="sidebar">
                <ListGroup className="sidebar-nav">
                    {this.state.navigation.map((item, i) => {
                        return (
                            <ListGroup.Item key={i}>
                                <NavLink activeClassName="active" to={item.link}>
                                    <i className={item.icon}></i>
                                </NavLink>
                            </ListGroup.Item>
                        )
                    })}

                </ListGroup>
            </div>
        )
    }
}