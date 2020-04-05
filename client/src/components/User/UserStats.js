import React  from 'react';
import { Image, Tag } from 'react-bulma-components';

import level from './level.png';
import diamonds from './diamonds.png';
import money from './money.png';

import './user.css';

const stats = {
  level: { icon: level, color: 'info'},
  diamonds: { icon: diamonds, color: 'success'},
  money: { icon: money, color: 'warning'},
};

export default ({ text, type, pad }) => {
  const { [type]:stat } = stats;
  return (
    <Tag className={`user-${type}`} color={stat.color}>
      <Image size={16} alt={type} src={stat.icon} />
      <span className='has-text-weight-bold'>
        {String(text).padStart(pad, 0)}
      </span>
    </Tag>
  );
};
