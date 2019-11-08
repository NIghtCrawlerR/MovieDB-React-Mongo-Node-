import React from 'react'
import { Helmet } from "react-helmet";

export default class Head extends React.Component {
    render() {
        return (
            <Helmet>
                {/* <!-- Primary Meta Tags --> */}
                <title>{this.props.ogTitle}</title>
                <meta name="title" content={this.props.ogTitle} />
                {/* <meta name="description" content="This website is so awesome that I really don't think you can handle how much awesome that is happening here." /> */}
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={this.props.ogUrl} />
                <meta property="og:title" content={this.props.ogTitle} />
                {/* <meta property="og:description" content="This website is so awesome that I really don't think you can handle how much awesome that is happening here." /> */}
                <meta property="og:image" content={this.props.ogImage} />
               
            </Helmet>
        )
    }
}