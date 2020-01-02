import React from "react";
import axios from "axios"
import { connect } from 'react-redux';

import BrickTabs from '../../common/BrickTabs';
import CollectionForm from './CollectionForm';
import Loader from '../../common/Loader';
import Collection from './Collection';

import {
  createCollection,
  getCollectionsFromCategory,
} from '../../../actions';

const host = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''

class CollectionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: [],
      loading: false,
      tabs: [],
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params
    this.getCollectionsList(category);
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params

    if (category !== prevProps.match.params.category) {
      this.getCollectionsList(category);
    }
  }

  getCollectionsList(category) {
    const { getCollectionsFromCategory } = this.props;
    getCollectionsFromCategory(category);
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
      axios.delete(`${host}/api/collection/delete/${id}`)
        .then(res => {
          const { data } = res;
          if (data.success) {
            this.props.showMsg("success", data.message)
          }
        })
        .catch(err => console.log(err))
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
        <BrickTabs tabs={this.createTabs(categoryCollections, category)} main={false} />
        {loading ? <Loader /> : (
          categoryCollections.map(collection => (
            <Collection
              key={collection.id}
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
  getCollectionsFromCategory,
})(CollectionsList);