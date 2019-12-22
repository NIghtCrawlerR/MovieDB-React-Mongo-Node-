import React from 'react';

function Overview(props) {
  const { overview } = props;

  return (
    <div className="overview">
      <h3 className="text-uppercase mt-5">Overview</h3>
      <div className="overview" dangerouslySetInnerHTML={{ __html: overview }} />
    </div>
  );
}

export default Overview;