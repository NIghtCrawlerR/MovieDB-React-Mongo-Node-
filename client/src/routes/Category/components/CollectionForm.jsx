import React from 'react';

import Input from 'components/Input';
import Button from 'components/Button';

class CollectionForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      aliasName: "",
    };
  }

  createCollection = () => {
    const { title, aliasName } = this.state;
    const { createCollection, category } = this.props;

    if (!title || !aliasName) return !1;

    const collection = {
      title: title,
      alias: aliasName,
      category
    }

    createCollection(collection)
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      aliasName: value.toLowerCase().replace(/[^a-z0-9]/g, "-")
    })
  }

  render() {
    const { title, aliasName } = this.state;

    return (
      <div className="collections__form">
        <h3>Create new collection</h3>
        <Input name="title" value={title} onChange={this.onChange} label="Title" />
        <Input name="aliasName" value={aliasName} onChange={this.onChange} label="Alias name" readOnly />
        <div className="mt-2">
          <Button onClick={this.createCollection}>Create</Button>
        </div>
      </div>
    )
  }
}

export default CollectionForm;