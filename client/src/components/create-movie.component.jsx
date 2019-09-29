import React, { Component } from 'react';

import Form from './movie-form.component'

export default class CreateMovie extends Component {
    render() {
        return (
            <div className="mt-3">
                <Form mode="add" id={this.props.match.params.id} showMsg={this.props.showMsg}/>
            </div>
        )
    }
}