import React  from 'react';
import { Columns } from 'react-bulma-components';

import { stats } from '../../constants/app.constant';

import UserStats from './UserStats';

import './user.css';

export default ({ user }) => {
  return (
    <Columns className='is-mobile  user-point has-background-dark'>
      {
        stats.map(stat => (
          <Columns.Column key={stat.name} className='has-text-centered'>
            <UserStats  key={stat.name} user={user} stat={stat} />
          </Columns.Column>
        ))
      }
    </Columns>
  );
};
