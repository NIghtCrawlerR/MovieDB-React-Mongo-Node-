import React from "react";
import axios from "axios";

import ItemsList from "../../ItemsList"
import Loader from '../../common/Loader';
import ErrorBoundary from '../../common/ErrorBoundary';
import PageTitle from '../../common/PageTitle';

const host = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''

class CollectionFull extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { category, alias } = this.props.match.params
    this.getCollectionsList(category, alias);
  }

  getCollectionsList(category, alias) {
    this.setState({ loading: true });

    axios.get(`${host}/api/collection/${category}/${alias}`)
      .then(res => {
        const collections = res.data
        this.setState({
          collections,
          loading: false,
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    const { collections, loading } = this.state;

    const { category } = this.props.match.params

    return (
      <div className="container-fluid mt-4">
        <PageTitle title={collections.title} />
        {loading ? <Loader />
          : (
            <ErrorBoundary>
              <ItemsList items={collections.items} type={category} />
            </ErrorBoundary>
          )
        }
      </div>
    )
  }
}

export default CollectionFull;