import React, { Component } from 'react';
import './index.css'

export default class Input extends Component {
    changeHandler(e) {
        this.props.onChange(e)
    }
    render() {
        return (
            <React.Fragment>
                <label><b>{this.props.label}</b></label>
                {this.props.description}
                <input className="form-control" data-error={this.props.error} type={this.props.type} name={this.props.name} onChange={this.changeHandler.bind(this)} value={this.props.value || ''} required={this.props.required} />
                {this.props.errorMessage}
            </React.Fragment>
        )
    }
}