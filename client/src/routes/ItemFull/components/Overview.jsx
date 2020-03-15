import React from 'react';

const Overview = ({ overview }) => (
  <span className="overview" dangerouslySetInnerHTML={{ __html: overview }} />
);

export default Overview;