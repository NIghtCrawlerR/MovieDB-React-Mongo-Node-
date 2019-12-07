import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'

import { updateCollections } from "../../actions/itemsCollectionsActions"

class CollectionsSelector extends React.Component {
    constructor() {
        super();

        this.state = {
            checked: []
        };
    }

    // updateCollections = (checked, alias, itemId) => {
    //     this.props.updateCollections(checked, alias, itemId)
    // }

    handleChange = (e, alias, itemId) => {
        this.props.updateCollections(e.target.checked, alias, itemId, this.props.itemData)
    }

    render() {
        const { itemId, category, collections } = this.props;


        const collectionsList = collections.filter(el => el.category === category)

        return (
            <div>
                {
                    collectionsList.map(item => <Form.Check
                        key={item._id}
                        onChange={e => this.handleChange(e, item.alias, itemId)}
                        label={item.title}
                        id={item._id + itemId}
                        checked={item.items.includes(itemId)}
                    />)
                }
            </div>
        )
    }
}

CollectionsSelector.propTypes = {
    collections: PropTypes.array,
}

CollectionsSelector.defaultProps = {
    collections: [],
}

const mapStateToProps = state => ({
    collections: state.collections.collections
})

export default connect(
    mapStateToProps,
    {
        updateCollections,
    }
)(CollectionsSelector);