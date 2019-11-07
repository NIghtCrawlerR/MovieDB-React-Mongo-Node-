import React, { Component } from 'react';
import { genres } from '../../utils/genres'
import './index.css'

export default class Filter extends Component {
    constructor() {
        super()

        this.state = {
            filter: {}
        }
    }
    filter(e) {
        let name = e.target.name,
            key = e.target.type === 'checkbox' ? e.target.checked : e.target.value.toLowerCase()

        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: key
            }
        }), () => {
            this.props.filter(this.state.filter)
        })
    }

    render() {
        return (
            <div className="filter">
                <form onChange={this.filter.bind(this)}>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-3 my-1">
                            <span><input type="checkbox" id="watched" name="watched" /><label htmlFor="watched">watched</label></span>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-1">
                            <span><input type="checkbox" id="liked" name="liked" /><label htmlFor="liked">Liked</label></span>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 my-1">
                            <select className="form-control" name="genre">
                                <option value="">All genres</option>
                                {genres.map((genre, i) => {
                                    return <option value={genre} key={i}>{genre}</option>
                                })}
                            </select>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 my-1 filter__search-input">
                            <input type="text" className="form-control" name="title" placeholder="Search" />
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}