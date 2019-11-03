import React, { Component } from 'react'

export default class InfoBlock extends Component {
    render() {
        return (
            <div className="info-block">
                {this.props.title ? <p className="info-block__title">{this.props.title}</p> : null}
                <p className="info-block__data">{this.props.data}</p>
            </div>
        )
    }
}