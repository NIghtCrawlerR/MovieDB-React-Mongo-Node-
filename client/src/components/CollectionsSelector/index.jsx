import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form'
import Dropdown from 'components/common/Dropdown'
import DropdownActivator from 'components/common/Dropdown/DropdownActivator'
import DropdownMenu from 'components/common/Dropdown/DropdownMenu'

import { updateCollections } from "actions"

class CollectionsSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: []
    };
  }

  handleChange = (e, alias, itemId) => {
    this.props.updateCollections(e.target.checked, alias, itemId, this.props.itemData)
  }

  render() {
    const { itemId, category, collections } = this.props;
    const collectionsList = collections.filter(el => el.category === category)

    return (
      <div>
        <Dropdown>
          <DropdownActivator className="mb-2">
            Select collection
          </DropdownActivator>

          <DropdownMenu>
            {
              collectionsList.map(item => (
                <Form.Check
                  key={item._id}
                  onChange={e => this.handleChange(e, item.alias, itemId)}
                  label={item.title}
                  id={item._id + itemId}
                  checked={item.items.includes(itemId)}
                />
              ))
            }
          </DropdownMenu>
        </Dropdown>

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