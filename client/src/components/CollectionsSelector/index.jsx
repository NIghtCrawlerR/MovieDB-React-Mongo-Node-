import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form'
import Dropdown from 'components/Dropdown'
import DropdownActivator from 'components/Dropdown/DropdownActivator'
import DropdownMenu from 'components/Dropdown/DropdownMenu'
import Button from 'components/Button';

import { updateCollections } from "actions"

class CollectionsSelector extends React.Component {
  handleChange = (e, alias, itemId) => {
    const { target: { checked } } = e;
    const { itemData } = this.props;

    this.props.updateCollections(checked, alias, itemId, itemData)
  }

  render() {
    const { itemId, category, collections } = this.props;
    const collectionsList = collections.filter(el => el.category === category)

    return (
      <div>
        <Dropdown>
          <DropdownActivator className="mb-2">
            <Button>Select collection</Button>
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