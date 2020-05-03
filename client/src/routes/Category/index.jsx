import React from "react";
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SliderTabs from 'components/SliderTabs';
import CollectionForm from './components/CollectionForm';
import Loader from 'components/Loader';
import Collection from './components/Collection';

import { If } from 'components/helpers/conditional-statement';

import {
  createCollection,
  deleteCollection,
  getCollectionsFromCategory,
} from 'actions';

import './index.scss';

class Category extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    categoryCollections: PropTypes.array.isRequired,
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
    const {
      getCollectionsFromCategory,
      history,
    } = this.props;

    this.setState({ loading: true });

    getCollectionsFromCategory(category)
      .then(collectionsCoount => {
        this.setState({ loading: false });

        if (collectionsCoount === 0) {
          history.push(`/catalog/${category}`);
        }
      })
      .catch(() => {
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
    const {
      userData,
      match: { params: { category } },
      categoryCollections,
    } = this.props;

    return (
      <div className="container-fluid my-4">
        <If condition={userData.group === "admin"}>
          <CollectionForm
            userData={userData}
            category={category}
            createCollection={this.createCollection}
          />
        </If>

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

const mapStateToProps = ({ collections, user }) => ({
  categoryCollections: collections.categoryCollections,
  userData: user,
})

export default withRouter(connect(mapStateToProps, {
  createCollection,
  deleteCollection,
  getCollectionsFromCategory,
})(Category));
