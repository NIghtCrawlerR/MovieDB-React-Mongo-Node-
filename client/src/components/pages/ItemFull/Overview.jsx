import React from 'react';

function Overview(props) {
  const { overview } = props;

  return (
    <span className="overview" dangerouslySetInnerHTML={{ __html: overview }} />
  );
}

export default Overview;