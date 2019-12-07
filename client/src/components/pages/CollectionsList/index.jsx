import React from "react";
import Form from 'react-bootstrap/Form'
import axios from "axios"
import { connect } from "react-redux";

import ItemsList from "../../ItemsList"

const host = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''

class CollectionsList extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: ["movies", "tv", "games"],
            categorieSelected: null,
            showForm: true,
            title: "",
            aliasName: "",
            collections: {}
        };
    }

    componentDidMount() {
        const { category } = this.props.match.params
        this.getCollections(category);
    }

    getCollections(category) {
        axios.get(`${host}/api/collection/get/${category}`)
            .then(res => {
                const collections = res.data
                this.mapCollections(collections)
            })
            .catch(err => console.log(err))
    }

    mapCollections = (collections) => {

        collections.map(collection => {
            axios.post(`${host}/api/movies/collection`, { ids: collection.items })
                .then(res => {
                    console.log(res.data)
                    this.setState((prevState) => ({
                        collections: {
                            ...prevState.collections,
                            [collection.title]: res.data.collection
                        }
                    }))
                })
                .catch(err => console.log(err))
        })
    }

    createCollection = () => {
        const { title, aliasName, categorieSelected, collections } = this.state;
        const { userData } = this.props;

        if (!title || !aliasName || !categorieSelected) return !1;

        const collection = {
            title: title,
            alias: aliasName,
            category: categorieSelected
        }

        axios.post(`${host}/api/collection/create?userId=${userData.id}`, { collection: collection })
            .then(res => {
                if (res.data.success) {
                    this.props.showMsg("success", "New collection created successfuly!")
                } else throw new Error(res.data.message)
            })
            .catch(err => {
                this.props.showMsg("error", `${err}`)
            })
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
            aliasName: value.toLowerCase().replace(/[^a-z0-9]/g, "-")
        })
    }

    render() {
        const { categories, showForm, title, aliasName, collections } = this.state;
        const { userData, match } = this.props;
        
        return (
            <div className="container-fluid mt-4">
                {showForm &&
                    userData.group === "admin" &&
                    <div className="add-collection my-3">
                        <div className="mt-2">
                            {categories.map((cat, i) => <Form.Check
                                key={i}
                                inline
                                label={cat}
                                type="radio"
                                name="category"
                                id={cat + i}
                                onChange={() => this.setState({ categorieSelected: cat })}
                            />)}
                        </div>
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

                {Object.keys(collections).map((collection, i) => (
                    <div key={i}>
                        <h3>{collection}</h3>
                        <ItemsList items={collections[collection]} type={match.params.category} />
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collectionsList: state.collections.collections
})

export default connect(mapStateToProps)(CollectionsList);