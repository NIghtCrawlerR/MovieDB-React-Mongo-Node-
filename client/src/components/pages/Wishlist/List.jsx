import React, { Component } from 'react';
import Movie from '../../Movie'
import Loader from '../../common/Loader'

import { connect } from 'react-redux'
import { getWishlist } from '../../../actions/itemsCollectionsActions'

class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    getList(collection) {
        // if(collections.wishlist[match.params.collection].length === 0)
        this.setState({ loading: true })
        this.props.getWishlist(collection, this.props.user[collection])
            .then(res => {
                this.setState({ loading: false })
            })

    }

    componentDidMount() {
        this.getList(this.props.match.params.collection)
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.collection !== prevProps.match.params.collection) {
            this.getList(this.props.match.params.collection)
        }
    }

    render() {
        const { match, collections } = this.props
        return (
            <React.Fragment>
                <div className="movies_wrap">
                    {this.state.loading ? <Loader /> : null}
                    {
                        collections.wishlist[match.params.collection].length > 0 ? collections.wishlist[match.params.collection].map((movie, i) => {
                            return <Movie {...movie} type={match.params.collection} userCollection img={movie.poster_path ? `http://image.tmdb.org/t/p/w300${movie.poster_path}` : movie.background_image} key={movie.id} _id={movie.id} />
                        })
                            :
                            <p>List is empty</p>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    collections: state.movieSelection
})

export default connect(mapStateToProps, {
    getWishlist
})(List)