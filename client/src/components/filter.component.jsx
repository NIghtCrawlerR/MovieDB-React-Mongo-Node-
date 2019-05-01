import React, { Component } from 'react';
import './css/filter.css'

export default class Filter extends Component {
    search(e) {
        this.props.search(e.target.value)
    }

    render() {
        return (
            <div className="filter">
                <div className="row">
                    <div className="col-3">
                        <select className="form-control">
                            <option value="all">All genres</option>
                        </select>
                    </div>
                    
                    <div className="col-3">
                        <input type="checkbox" id="watched"/>
                        <label htmlFor="watched">watched</label>
                    </div>
                    <div className="col-3">
                        <input type="checkbox" id="liked"/>
                        <label htmlFor="liked">liked</label>
                    </div>
                    <div className="col-3">
                        <input type="text" className="form-control" onChange={this.search.bind(this)} placeholder="Search"/>
                    </div>
                </div>
            </div>
        )
    }
}