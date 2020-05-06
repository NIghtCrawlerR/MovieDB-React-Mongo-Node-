import React from 'react';

import If from './If';
import Else from './Else';
import ElseIf from './ElseIf';

export default class Choose extends React.Component {
  renderBody = (children) => {
    if (!Array.isArray(children)) {
      return children;
    }

    const bodyIf = children.find(({ type }) => type === If);
    const bodyElseIf = children.find((child) => child.type === ElseIf && child.props.condition);
    const bodyElse = children.find(({ type }) => type === Else);

    if (bodyIf.props.condition) {
      return bodyIf.props.children;
    } if (bodyElseIf) {
      return bodyElseIf.props.children;
    }
    return bodyElse.props.children;
  }

  render() {
    const { children } = this.props;

    return this.renderBody(children);
  }
}
