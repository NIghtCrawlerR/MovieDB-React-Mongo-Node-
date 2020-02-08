import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import SearchResults from './SearchResults';
import Icon from '../common/Icon';
import { Choose, If, Else } from '../helpers/conditional-statement';

class SearchPopup extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  handleClickOutside(event) {
    console.log(event)
    this.close();
  };

  open = () => {
    this.setState({
      isOpen: true,
    });
  };

  close = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { isOpen } = this.state;
    const { items } = this.props;

    if (!isOpen) return null;

    return (
      <div className="search-popup">
        <div className="search-popup__close">
          <Icon
            name="times"
            onClick={() => this.close()}
          />
        </div>
        <Choose>
          <If condition={!Object.keys(items).length}>
            <p>Start searching.</p>
          </If>
          <Else>
            <SearchResults data={items} onClick={() => {}} />
          </Else>
        </Choose>

      </div>
    );
  }
}

export default SearchPopup;
