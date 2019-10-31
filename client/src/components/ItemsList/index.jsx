import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Movie from '../Movie'

import './index.css'

export default class List extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="movies_wrap">
                    {
                        this.props.items ?
                            this.props.items.map((item, i) => {
                                return <Movie {...item} type={this.props.type} key={item.id} img={item.poster_path ? `http://image.tmdb.org/t/p/w300${item.poster_path}` : item.background_image} />
                            })
                            :
                            null
                    }
                </div>
            </React.Fragment>
        )
    }
}