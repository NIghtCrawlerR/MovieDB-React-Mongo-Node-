import React, { Component } from 'react';
import './index.css'

export default class Input extends Component {
    changeHandler(e) {
        this.props.onChange(e)
    }
    render() {
        const { label, type, name, error, errorMessage, description, value, required, placeholder } = this.props
        return (
            <React.Fragment>
                {label ?
                    <label><b>{label}</b></label>
                    : null
                }
                {description}
                <input className="form-control" data-error={error} type={type} name={name} placeholder={placeholder} onChange={this.changeHandler.bind(this)} value={value || ''} required={required} />
                {errorMessage}
            </React.Fragment>
        )
    }
}