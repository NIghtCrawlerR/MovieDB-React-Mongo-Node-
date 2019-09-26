import React, { Component } from 'react';
import './css/filter.css'

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
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-1 mb-1">
                            <select className="form-control" name="genre">
                                <option value="">All genres</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="animation">Animation</option>
                                <option value="biography">Biography</option>
                                <option value="comedy">Comedy</option>
                                <option value="crime">Crime</option>
                                <option value="documentary">Documentary</option>
                                <option value="drama">Drama</option>
                                <option value="family">Family</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="film-noir">Film-Noir</option>
                                <option value="history">History</option>
                                <option value="horror">Horror</option>
                                <option value="musical">Musical</option>
                                <option value="mystery">Mystery</option>
                                <option value="romance">Romance</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="sport">Sport</option>
                                <option value="thriller">Thriller</option>
                                <option value="war">War</option>
                                <option value="western">Western</option>
                            </select>
                        </div>
                        {
                            this.props.usersCollection ?
                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-sm-6 col-xs-6 mt-1 mb-1">
                                            <select name="watched" className="form-control">
                                                <option value="">All (watched/not watched)</option>
                                                <option value="1">Watched</option>
                                                <option value="0">Not watched</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6 col-xs-6 mt-1 mb-1">
                                            <span><input type="checkbox" id="liked" name="liked" /><label htmlFor="liked">Liked</label></span>
                                        </div>
                                    </div>
                                </div> : null
                        }

                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-1 mb-1">
                            <input type="text" className="form-control" name="title" placeholder="Search" />
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}