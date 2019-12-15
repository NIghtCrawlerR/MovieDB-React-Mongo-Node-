import React from 'react';

function InfoBlock(props) {
  const { title, data } = props;

  return (
    <div className="info-block">
      {title && <p className="info-block__title">{title}</p>}
      <p className="info-block__data">{data}</p>
    </div>
  );
}

export default InfoBlock;