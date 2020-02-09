import React from "react";
import axios from "axios";

import ItemsList from "../../ItemsList"
import Loader from '../../common/Loader';
import ErrorBoundary from '../../common/ErrorBoundary';
import PageTitle from '../../common/PageTitle';
import Input from '../../common/Input';

const host = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''

class CollectionFull extends React.Component {
  constructor() {
    super();

    this.state = {
      collections: [],
      loading: false,
      title: "",
      alias: "",
      image: "",
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
          alias: collections.alias,
          title: collections.title,
          image: collections.image,
        })
      })
      .catch(err => console.log(err))
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = () => {
    const { title, alias, image } = this.state;

    const values = {
      title,
      alias,
      image,
    }

    axios.post(`${host}/api/collection/update/${alias}`, { values })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  render() {
    const { collections, loading, title, alias, image } = this.state;
    const { match: { params: { category } } } = this.props;

    return (
      <div className="container-fluid mt-4">
        <div className="collections__form">
          <h3>Edit collection</h3>
          <Input
            name="title"
            label="Title"
            className="mb-2"
            value={title}
            onChange={this.changeHandler}
            required
          />
          <Input
            name="alias"
            label="Alias"
            className="mb-2"
            value={alias}
            onChange={this.changeHandler}
          />
          <Input
            name="image"
            label="Image"
            className="mb-2"
            value={image}
            onChange={this.changeHandler}
          />

          <button
            className="btn btn-primary"
            onClick={this.onSubmit}
          >Save</button>
        </div>
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