import React, { Component } from 'react';
import Item from '../Item'
import Loader from '../common/Loader'

import './index.css'

export default class List extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.loading ?
                        <Loader /> :
                        <div className="movies_wrap">
                            {
                                this.props.items && this.props.items.length > 0 ?
                                    this.props.items.map((item, i) => {
                                        return <Item wishlist={this.props.wishlist} {...item} type={this.props.type} key={item ? item.id : i} img={item.poster_path ? `http://image.tmdb.org/t/p/w300${item.poster_path}` : item.background_image} />
                                    })
                                    :
                                    <p>No data</p>
                            }
                        </div>

                }
            </React.Fragment>
        )
    }
}