import React from 'react'
import Input from '../../common/Input';

class Filter extends React.Component {
  state = {
    values: {},
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    const { applyFilter } = this.props;

    const values = this.state.values;

    if (value !== '-1') {
      values[name] = value
    } else {
      delete values[name]
    }

    this.setState({ values }, () => {
      applyFilter(this.state.values)
    });
  };

  render() {
    const { values } = this.state;

    return (
      <div>
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
      </div>
    )
  }
}

export default Filter;
