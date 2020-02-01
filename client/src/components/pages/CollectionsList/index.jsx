import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SliderTabs from '../../common/SliderTabs';
import CollectionForm from './CollectionForm';
import Loader from '../../common/Loader';
import Collection from './Collection';

import {
  createCollection,
  deleteCollection,
  getCollectionsFromCategory,
} from '../../../actions';

class CollectionsList extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
    showMsg: PropTypes.func,
    categoryCollections: PropTypes.array.isRequired,
  };

  static defaultProps = {
    match: {
      params: {
        category: ""
      },
    },
    showMsg: () => { },
  };

  constructor() {
    super();
    this.state = {
      collections: [],
      loading: false,
      tabs: [],
    };
  }

  componentDidMount() {
    const { match: { params: { category } } } = this.props;
    this.getCollectionsList(category);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { category } } } = this.props;

    if (category !== prevProps.match.params.category) {
      this.getCollectionsList(category);
    }
  }

  getCollectionsList(category) {
    const { getCollectionsFromCategory } = this.props;

    this.setState({ loading: true })
    getCollectionsFromCategory(category)
      .then(() => {
        this.setState({ loading: false })
      })
      .catch((err) => {
        this.setState({ loading: false })
      })
  }

  createCollection = (collection) => {
    const { createCollection, userData } = this.props;
    createCollection(userData.id, collection);
  }

  createTabs(collections, category) {
    const all = {
      title: `All ${category}`,
      value: 'all',
      link: `catalog/${category}`
    }
    const tabs = collections.map(collection => {
      const { title, alias } = collection;
      return {
        title,
        value: alias,
        link: `collection/${category}/${alias}`,
        image: collection.image || ""
      }
    })

    return [all, ...tabs]
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      aliasName: value.toLowerCase().replace(/[^a-z0-9]/g, "-")
    })
  }

  removeColection(id) {
    if (window.confirm('Delete full collection?')) {
      this.props.deleteCollection(id);
    }
  }

  render() {
    const { loading } = this.state;
    const { userData, match, showMsg, categoryCollections } = this.props;
    const { params: { category } } = match;

    return (
      <div className="container-fluid my-4">
        <CollectionForm
          userData={userData}
          showMsg={showMsg}
          category={category}
          createCollection={this.createCollection}
        />
        <SliderTabs tabs={this.createTabs(categoryCollections, category)} loading={loading} />
        {loading ? <Loader /> : (
          categoryCollections.map((collection, i) => (
            <Collection
              key={collection.id + i}
              collection={collection}
              category={category}
              userData={userData}
              removeColection={this.removeColection.bind(this)}
            />
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categoryCollections: state.collections.categoryCollections
})

export default connect(mapStateToProps, {
  createCollection,
  deleteCollection,
  getCollectionsFromCategory,
})(CollectionsList);