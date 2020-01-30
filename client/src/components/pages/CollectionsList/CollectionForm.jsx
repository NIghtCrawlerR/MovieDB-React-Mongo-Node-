import React from 'react';
import Form from 'react-bootstrap/Form';

class CollectionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: true,
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
    const { showForm, title, aliasName } = this.state;
    const { userData } = this.props;

    return (
      <div className="container-fluid mt-4">
        {showForm &&
          userData.group === "admin" &&
          <div className="add-collection my-3">
            <div className="mt-2">
              <Form.Control type="text" name="title" value={title} onChange={this.onChange} placeholder="Title" />
            </div>
            <div className="mt-2">
              <Form.Control type="text" name="aliasName" value={aliasName} onChange={this.onChange} placeholder="Alias name" readOnly />
            </div>
            <div className="mt-2">
              <button className="btn btn-success" onClick={this.createCollection}>Create</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default CollectionsList;