import React, { Component } from 'react';
import ItemsList from '../../ItemsList'
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
     
        const ids = this.props.user[collection].map(item => item.id)
      
        this.props.getWishlist(collection, ids)
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
               <ItemsList wishlist loading={this.state.loading} items={collections.wishlist[match.params.collection]} type={match.params.collection} />
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