import React from "react";
import axios from "axios"

import BrickTabs from '../../common/BrickTabs';
import AddCollectionForm from './AddCollectionForm';
import Loader from '../../common/Loader';
import CollectionSlider from './CollectonSlider';

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

    if(category !== prevProps.match.params.category) {
      this.getCollectionsList(category);
    }
  }

  getCollectionsList(category) {
    this.setState({ loading: true });

    axios.get(`${host}/api/collection/get/${category}`)
      .then(res => {
        const collections = res.data
        this.setState({
          collections,
          loading: false,
          tabs: this.createTabs(collections, category)
        })
      })
      .catch(err => console.log(err))
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
    if (window.confirm('Delete funn collection?')) {
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
    const { collections, loading, tabs } = this.state;
    const { userData, match, showMsg } = this.props;

    return (
      <div className="container-fluid my-4">
        <AddCollectionForm userData={userData} showMsg={showMsg} category={match.params.category} />
        <BrickTabs tabs={tabs} main={false} />
        {loading ? <Loader /> : (
          collections.map(collection => (
            <CollectionSlider
              key={collection.id}
              collection={collection}
              category={match.params.category}
              userData={userData}
              removeColection={this.removeColection.bind(this)}
            />
          ))
        )}

      </div>
    )
  }
}

export default CollectionsList;