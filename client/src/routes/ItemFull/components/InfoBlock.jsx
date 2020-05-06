import React from 'react';
import classNames from 'classnames';

const InfoBlock = ({ title, data, className }) => (
  <div className={classNames('info-block', className)}>
    {title && <p className="info-block__title">{title}</p>}
    <p className="info-block__data">{data}</p>
  </div>
);

export default InfoBlock;
