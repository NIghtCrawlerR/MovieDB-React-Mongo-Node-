import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import axios from 'axios';

import Form from './movie-form.component'

export default class EditMovie extends Component {
    render() {
        return (
            
            <div className="mt-3 content">
                <Form mode="edit" id={this.props.match.params.id} showMsg={this.props.showMsg}/>
            </div>
        )
    }
}