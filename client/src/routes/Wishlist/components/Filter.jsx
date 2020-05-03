import React from 'react'

import { Input } from 'components/UI';

class Filter extends React.Component {
  state = {
    values: {},
    searchQuery: '',
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    const { applyFilter } = this.props;

    const { values } = this.state;

    if (!value || value !== '-1') {
      values[name] = value
    } else {
      delete values[name]
    }

    this.setState({ values }, () => {
      applyFilter(values)
    });
  };

  setSearchQuery = ({ target: { value } }) => {
    this.setState({ searchQuery: value.toLowerCase() }, (e) => {
      this.props.setSearchQuery(this.state.searchQuery);
    })
  }

  render() {
    const { values, searchQuery } = this.state;

    return (
      <div className="wishlist__filter">
        <select
          name="watched"
          onChange={this.changeHandler}
        >
          <option value="-1">all</option>
          <option value="0">not watched</option>
          <option value="1">watched</option>
        </select>
        <Input
          type="checkbox"
          name="liked"
          value={values.liked === '1' ? '-1' : '1'}
          label="Only liked"
          onChange={this.changeHandler}
        />
        <Input
          name="title"
          value={searchQuery}
          label="Search by title"
          outlined
          onChange={this.setSearchQuery}
        />
      </div>
    )
  }
}

export default Filter;
