import React  from 'react';
import { Columns } from 'react-bulma-components';

import { stats } from '../../constants/app.constant';

import UserStats from './UserStats';

import './user.css';

export default ({ user }) => {
  return (
    <Columns className='is-mobile  user-point has-background-dark'>
      {
        Object.keys(stats).map(stat => (
          <Columns.Column key={stat} className='has-text-centered'>
            <UserStats user={user} stat={stats[stat]} field={stat} />
          </Columns.Column>
        ))
      }
    </Columns>
  );
};
