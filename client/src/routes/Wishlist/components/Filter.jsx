import React from 'react';

import { Input, Checkbox } from 'components/UI';
import './Filter.scss';

class Filter extends React.Component {
  state = {
    values: {},
    searchQuery: '',
  };

  changeHandler = ({ target: { name, value } }) => {
    const { applyFilter } = this.props;
    const { values } = this.state;

    if (!value || value !== '-1') {
      values[name] = value;
    } else {
      delete values[name];
    }

    applyFilter({}) // TODO: not correct sollution, try to solve it

    this.setState({ values }, () => applyFilter(values));
  };

  setSearchQuery = ({ target: { value } }) => {
    const { setSearchQuery } = this.props;

    const newValue = value.toLowerCase();
    setSearchQuery(newValue);
    this.setState({ searchQuery: newValue });
  }

  render() {
    const { values, searchQuery } = this.state;

    return (
      <div className="Filter">
        <select
          name="watched"
          onChange={this.changeHandler}
        >
          <option value="-1">all</option>
          <option value="0">not watched</option>
          <option value="1">watched</option>
        </select>
        <Checkbox
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
    );
  }
}

export default Filter;
