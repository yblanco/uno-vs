import React  from 'react';
import {  Tag } from 'react-bulma-components';

import Icons from '../Icons';

import Numbers from '../utils/Numbers';

import './user.css';

export default ({ user, stat, field }) => {
  return (
    <Tag className={`user-${stat.type}`} color={stat.type}>
      <Icons type={field} />
      {' '}
      <Numbers number={user[field]} pad={stat.pad} />
    </Tag>
  );
};
