import React  from 'react';
import { Columns } from 'react-bulma-components';

import { stats } from '../../constants/app.constant';

import UserStats from './UserStats';

import './user.css';

export default ({ user }) => {
  return (
    <Columns className='is-mobile user-point has-background-dark'>
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 8, offset: 2 }}
        desktop={{ size: 6, offset: 3 }}
        className='is-mobile'
      >
        <Columns className='is-mobile  user-point' >
          {
            Object.keys(stats).map(stat => (
              <Columns.Column key={stat} className='has-text-centered'>
                <UserStats user={user} stat={stats[stat]} field={stat} />
              </Columns.Column>
            ))
          }
        </Columns>
      </Columns.Column>
    </Columns>
  );
};
