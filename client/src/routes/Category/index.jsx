import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { flowRight } from 'lodash';

import { Loader } from 'components/UI';
import SliderTabs from 'components/SliderTabs';
import { If } from 'components/helpers/ConditionalRender';
import {
  createCollection,
  deleteCollection,
  getCollectionsFromCategory,
} from 'actions';
import CollectionForm from './components/CollectionForm';
import Collection from './components/Collection';


import './index.scss';

class Category extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    categoryCollections: PropTypes.array.isRequired,
  };

  state = {
    loading: false,
  };

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
      userData: { isAdmin },
    } = this.props;

    this.setState({ loading: true });

    getCollectionsFromCategory(category)
      .then((collectionsCount) => {
        this.setState({ loading: false });

        if (!isAdmin && collectionsCount === 0) {
          history.push(`/catalog/${category}`);
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  createCollection = (collection) => {
    const { createCollection, userData } = this.props;
    createCollection(userData.id, collection);
  }

  createTabs = (collections, category) => {
    const all = {
      title: `All ${category}`,
      value: 'all',
      link: `catalog/${category}`,
    };
    const tabs = collections.map((collection) => {
      const { title, alias } = collection;
      return {
        title,
        value: alias,
        link: `collection/${category}/${alias}`,
        image: collection.image || '',
      };
    });

    return [all, ...tabs];
  }

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  removeColection(id) {
    this.props.deleteCollection(id);
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
        <If condition={userData.isAdmin}>
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
    );
  }
}

const mapStateToProps = ({ collections, user }) => ({
  categoryCollections: collections.categoryCollections,
  userData: user,
});

export default flowRight(
  withRouter,
  connect(mapStateToProps, {
    createCollection,
    deleteCollection,
    getCollectionsFromCategory,
  }),
)(Category);
