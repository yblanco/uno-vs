import React  from 'react';
import {  Tag } from 'react-bulma-components';

import Icons from '../Icons';

import './user.css';

export default ({ user, stat }) => {
  return (
    <Tag className={`user-${stat.type}`} color={stat.type}>
      <Icons type={stat.name} />
      {' '}
      <span className='has-text-weight-bold'>
        {String(user[stat.name]).padStart(stat.pad, 0)}
      </span>
    </Tag>
  );
};
