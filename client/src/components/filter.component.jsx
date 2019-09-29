import React, { Component } from 'react';
import './css/filter.css'

import { genres } from '../utils/genres'

export default class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeFilters: {

            }
        }
    }
    setChecked(e) {
        // e.target.value = e.target.value == '0' ? '0' : '0'
        // console.log(e.target.checked)
    }

    filter(e) {
        let name = e.target.name,
            key = e.target.type === 'checkbox' ? e.target.checked : e.target.value.toLowerCase()

        let filter = this.state.activeFilters;

        if (key) filter[name] = key
        else delete filter[name]

        this.props.filter(filter)
    }



    render() {
        return (
            <div className="filter">
                <form onChange={this.filter.bind(this)}>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 my-1">
                            <select className="form-control" name="genre">
                                <option value="">All genres</option>
                                {genres.map((genre, i) => {
                                    return <option value={genre} key={i}>{genre}</option>
                                })}
                            </select>
                        </div>
                        {
                            this.props.usersCollection ?
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-sm-6 col-xs-6 my-1">
                                            <select name="watched" className="form-control">
                                                <option value="">All (watched/not watched)</option>
                                                <option value={true}>Watched</option>
                                                <option value={false}>Not watched</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6 col-xs-6 my-1">
                                            <span><input type="checkbox" id="liked" name="liked" /><label htmlFor="liked">Liked</label></span>
                                        </div>
                                    </div>
                                </div> : null
                        }

                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 my-1 filter__search-input">
                            <input type="text" className="form-control" name="title" placeholder="Search" />
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}