import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import ItemsList from 'components/ItemsList';
import ErrorBoundary from 'components/ErrorBoundary';
import PageTitle from 'components/PageTitle';
import { Button, Loader, Input } from 'components/UI';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

class Collection extends React.Component {
  state = {
    collections: [],
    loading: false,
    title: '',
    alias: '',
    image: '',
  };

  componentDidMount() {
    const { category, alias } = this.props.match.params;
    this.getCollectionsList(category, alias);
  }

  getCollectionsList(category, alias) {
    this.setState({ loading: true });

    axios.get(`${host}/api/collection/${category}/${alias}`)
      .then((res) => {
        const collections = res.data;

        this.setState({
          collections,
          loading: false,
          alias: collections.alias,
          title: collections.title,
          image: collections.image,
        });
      })
      .catch((err) => console.log(err));
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
    };

    axios.post(`${host}/api/collection/update/${alias}`, { values });
  }

  render() {
    const {
      collections, loading, title, alias, image,
    } = this.state;
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

          <Button onClick={this.onSubmit}>
            Save
          </Button>
        </div>
        <PageTitle title={collections.title} />
        {loading ? <Loader />
          : (
            <ErrorBoundary>
              <ItemsList items={collections.items} type={category} />
            </ErrorBoundary>
          )}
      </div>
    );
  }
}

export default withRouter(Collection);
